import { Component, Input } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedService } from '../../../services/shared.service';

@Component({
  selector: 'app-jobs-qualifications',
  templateUrl: './jobs-qualifications.component.html',
  styleUrls: ['./jobs-qualifications.component.scss'],
  standalone: true,
  imports: [
    NgFor,
    NgIf,
    FormsModule
  ],
  providers: [SharedService]
})
export class JobsQualificationsComponent {
  @Input() selectedJob: any;
  @Input() editMode: boolean = false;

  constructor(private sharedService: SharedService) {}

  addQualification(): void {
    if (this.selectedJob) {
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

  private updateJobContent(): void {
    this.sharedService.updateJobContent(this.selectedJob);
  }
}
