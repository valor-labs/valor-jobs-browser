import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedService } from '../../../services/shared.service';
import { ContenteditableDirective } from '../../../directives/contenteditable.directive';

@Component({
  selector: 'app-jobs-experience',
  templateUrl: './jobs-experience.component.html',
  styleUrls: ['./jobs-experience.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ContenteditableDirective // Import the standalone directive
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

  updateExperience(content: string, index: number): void {
    if (this.selectedJob) {
      this.selectedJob.jobObject.experience[index] = content;
      this.updateJobContent();
    }
  }

  private updateJobContent(): void {
    this.sharedService.updateJobContent(this.selectedJob);
  }
}