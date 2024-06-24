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
    ContenteditableDirective
  ],
})
export class JobsExperienceComponent {
  @Input() selectedJob: any;
  @Input() editMode: boolean = false;

  constructor() {}

  addExperience(): void {
    if (this.selectedJob) {
      if (!this.selectedJob.experience) {
        this.selectedJob.experience = [];
      }
      this.selectedJob.experience.push('');
    }
  }

  removeExperience(index: number): void {
    if (this.selectedJob) {
      this.selectedJob.experience.splice(index, 1);
    }
  }

  updateExperience(content: string, index: number): void {
    if (this.selectedJob) {
      this.selectedJob.experience[index] = content;
    }
  }

}
