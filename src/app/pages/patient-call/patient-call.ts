import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VideoCallService } from '../../shared/services/video-call-service';
import { SafeUrlPipe } from '../../pipes/safe-url-pipe';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-patient-call',
  imports: [SafeUrlPipe, CommonModule],
  templateUrl: './patient-call.html',
  styleUrl: './patient-call.css'
})
export class PatientCall {
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
}
