import { Component, Input } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedService } from '../../../services/shared.service';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-jobs-qualifications',
  templateUrl: './jobs-qualifications.component.html',
  styleUrls: ['./jobs-qualifications.component.scss'],
  standalone: true,
  imports: [
    NgFor,
    NgIf,
    FormsModule,
    RouterModule,
    MatCardModule
  ]
})
export class JobsQualificationsComponent {
  @Input() selectedJob: any;
  @Input() editMode: boolean = false;

  constructor(private sharedService: SharedService) {}

  addQualification(): void {
    if (this.selectedJob) {
      if (!this.selectedJob.jobObject.qualifications_criteria) {
        this.selectedJob.jobObject.qualifications_criteria = [];
      }
      this.selectedJob.jobObject.qualifications_criteria.push({ name: '', level: '' });
      this.updateJobContent();
    }
  }

  removeQualification(index: number): void {
    if (this.selectedJob) {
      this.selectedJob.jobObject.qualifications_criteria.splice(index, 1);
      this.updateJobContent();
    }
  }

  // updateQualification(content: any, index: number, field: string): void {
  //   if (this.selectedJob) {
  //     this.selectedJob.jobObject.qualifications_criteria[index][field] = content;
  //     this.updateJobContent();
  //   }
  // }

  private updateJobContent(): void {
    // Retrieve the current job list from the service
    const currentJobs = this.sharedService.getCurrentJobsContent();
    // Update the job in the list
    const updatedJobs = currentJobs.list.map((job: any) => {
      if (job.track === this.selectedJob.jobObject.track &&
          job.title === this.selectedJob.jobObject.title &&
          job.seniority === this.selectedJob.jobObject.seniority) {
        return this.selectedJob.jobObject;
      }
      return job;
    });
    // Update the job list in the service
    this.sharedService.updateJobsContent({ list: updatedJobs });
  }
}
