import { Component, inject, OnInit, Pipe } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VideoCallService } from '../../shared/services/video-call-service';
import { SafeUrlPipe } from '../../pipes/safe-url-pipe';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-doctor-call',
  imports: [CommonModule, FormsModule ,SafeUrlPipe],
  templateUrl: './doctor-call.html',
  styleUrl: './doctor-call.css'
})
export class DoctorCall implements OnInit{
  jitsiUrl: string = '';
  appointmentId!: number;
  notes: string = '';


  route = inject(ActivatedRoute);
  videoCallService = inject(VideoCallService);

  ngOnInit(): void {
    this.appointmentId = +this.route.snapshot.paramMap.get('id')!;
    this.videoCallService.joinRoom(this.appointmentId).subscribe({
      next: (res) => {
        this.jitsiUrl = res.url;
      },
      error: (err) => alert('❌ Failed to create room')
    });
  }

  submitNotes() {
    this.videoCallService.AddDoctorNotes(this.appointmentId, this.notes).subscribe({
      next: () => alert('✅ Notes saved'),
      error: () => alert('❌ Failed to save notes')
    });
  }
}
