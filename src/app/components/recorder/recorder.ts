import { Component } from '@angular/core';
import * as RecordRTC from 'recordrtc';
import { CommonModule } from '@angular/common';
import { AidoctorService } from '../../shared/services/Ai/aidoctor-service';
//import {  RagResponse } from '../../models/iairesponse';
import { Idoctorcard } from '../../models/idoctorcard';
import { DoctorResult } from '../../models/iairesponse';
import { HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recorder',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './recorder.html',
  styleUrls: ['./recorder.css']
})
export class RecorderComponent {
  recorder: RecordRTC.StereoAudioRecorder | null = null;
  stream!: MediaStream;
  isRecording = false;
  isUploading = false;
  audioUrl: string | null = null;
  transcription:number  = 0;
  parms = new HttpParams()


  constructor(private aidoctorService: AidoctorService, private router: Router) {}

  async startRecording() {
    this.audioUrl = null;
    this.transcription = 0;

    try {
      this.stream = await navigator.mediaDevices.getUserMedia({ audio: true });

      this.recorder = new RecordRTC.StereoAudioRecorder(this.stream, {
        type: 'audio',
        mimeType: 'audio/wav' // or fallback to 'audio/webm' if needed
      });

      this.recorder.record();
      this.isRecording = true;
    } catch (err) {
      console.error('🎤 Microphone access denied:', err);
    }
  }

  stopRecording() {
    if (!this.recorder || !this.isRecording) return;

    this.recorder.stop((blob: Blob) => {
      this.audioUrl = URL.createObjectURL(blob);
      this.isRecording = false;

      // Stop microphone stream
      this.stream.getTracks().forEach(track => track.stop());

      this.uploadAudio(blob);
    });
  }

  uploadAudio(blob: Blob) {
    const formData = new FormData();
    formData.append('file', blob, 'recording.wav');
    console.log('Uploading WAV audio...');

    this.isUploading = true;

    this.aidoctorService.getDoctorDatasuggest(formData).subscribe({
      next: (response:DoctorResult[]) => {
        console.log(' Upload successful:', response);
        const doctorIds =  response.map(id => id.doctorId);
        console.log('Doctor IDs:', doctorIds);
        this.router.navigate(['/all-doctors'], { queryParams: {doctorId:doctorIds} });
      
        this.isUploading = false;
      },
      error: (error) => {
        console.error(' Upload error:', error);
        this.isUploading = false;
      }
    });
  }

//   trackByDoctorId(index: number, doctor: Doctor): number {
//   return doctor.DoctorId;
// }

}
