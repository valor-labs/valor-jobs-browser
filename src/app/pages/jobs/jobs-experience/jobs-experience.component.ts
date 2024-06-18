import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedService } from '../../../services/shared.service';
import { ContenteditableDirective } from '../../../directives/contenteditable.directive';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-jobs-experience',
  templateUrl: './jobs-experience.component.html',
  styleUrls: ['./jobs-experience.component.scss'],
  standalone: true,
  imports: [
    MatCardModule,
    CommonModule,
    ContenteditableDirective // Import the standalone directive
  ],
})
export class JobsExperienceComponent {
  @Input() selectedJob: any;
  @Input() editMode: boolean = false;

  constructor(private sharedService: SharedService) {}

  addExperience(): void {
    if (this.selectedJob) {
      if (!this.selectedJob.jobObject.experience) {
        this.selectedJob.jobObject.experience = [];
      }
      this.selectedJob.jobObject.experience.push('');
      this.updateJobContent();
    }
  }

  removeExperience(index: number): void {
    if (this.selectedJob) {
      this.selectedJob.jobObject.experience.splice(index, 1);
      this.updateJobContent();
    }
  }

  updateExperience(content: string, index: number): void {
    if (this.selectedJob) {
      this.selectedJob.jobObject.experience[index] = content;
      this.updateJobContent();
    }
  }

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
