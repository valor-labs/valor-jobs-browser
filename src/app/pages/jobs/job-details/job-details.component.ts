import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { SharedService } from '../../../services/shared.service';

@Component({
  selector: 'app-job-details',
  templateUrl: './job-details.component.html',
  styleUrls: ['./job-details.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule
  ]
})
export class JobDetailsComponent {
  @Input() selectedJob: any;
  @Input() editMode: boolean = false;

  constructor(private sharedService: SharedService) {}

  onFieldChange(fieldName: string, newValue: string) {
    this.selectedJob.jobObject[fieldName] = newValue;
    this.updateJobContent();
  }

  private updateJobContent(): void {
    const currentJobs = this.sharedService.getCurrentJobsContent();
    const updatedJobs = currentJobs.list.map((job: any) => {
      if (job.track === this.selectedJob.jobObject.track &&
          job.title === this.selectedJob.jobObject.title &&
          job.seniority === this.selectedJob.jobObject.seniority) {
        return this.selectedJob.jobObject;
      }
      return job;
    });
    this.sharedService.updateJobsContent({ list: updatedJobs });
  }
}
