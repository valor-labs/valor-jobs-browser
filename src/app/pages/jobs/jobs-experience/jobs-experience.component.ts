import { Component, Input } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedService } from '../../../services/shared.service';

@Component({
  selector: 'app-jobs-experience',
  templateUrl: './jobs-experience.component.html',
  styleUrls: ['./jobs-experience.component.scss'],
  standalone: true,
  imports: [
    NgFor,
    NgIf,
    FormsModule
  ],
  providers: [SharedService]
})
export class JobsExperienceComponent {
  @Input() selectedJob: any;
  @Input() editMode: boolean = false;

  constructor(private sharedService: SharedService) {}

  addExperience(): void {
    if (this.selectedJob) {
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

  private updateJobContent(): void {
    this.sharedService.updateJobContent(this.selectedJob);
  }
}
