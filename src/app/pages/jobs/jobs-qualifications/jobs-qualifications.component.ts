import { Component, Input } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
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

  constructor() {}

  addQualification(): void {
    if (this.selectedJob) {
      if (!this.selectedJob.qualifications_criteria) {
        this.selectedJob.qualifications_criteria = [];
      }
      this.selectedJob.qualifications_criteria.push({ name: '', level: '' });
    }
  }

  removeQualification(index: number): void {
    if (this.selectedJob) {
      this.selectedJob.qualifications_criteria.splice(index, 1);
    }
  }

}
