import { Component, Input } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedService } from '../../../services/shared.service';
import { MatCardModule } from '@angular/material/card';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-qualifications-dependency',
  templateUrl: './qualifications-dependency.component.html',
  styleUrls: ['./qualifications-dependency.component.scss'],
  standalone: true,
  imports: [
    NgFor,
    NgIf,
    FormsModule,
    MatCardModule,
    RouterModule
  ]
})
export class QualificationsDependencyComponent {
  @Input() selectedQualification: any;
  @Input() editMode: boolean = false;

  constructor(private sharedService: SharedService) {}

  addDependency(): void {
    if (this.selectedQualification) {
      if (!this.selectedQualification.dependency) {
        this.selectedQualification.dependency = [];
      }
      this.selectedQualification.dependency.push({ title: '', level: '' });
      this.updateQualificationsContent();
    }
  }

  removeDependency(index: number): void {
    if (this.selectedQualification) {
      this.selectedQualification.dependency.splice(index, 1);
      this.updateQualificationsContent();
    }
  }

  onContentEditableInput(event: Event, index: number, field: string): void {
    const target = event.target as HTMLElement;
    this.selectedQualification.dependency[index][field] = target.innerText;
    this.updateQualificationsContent();
  }


  private updateQualificationsContent(): void {
    this.sharedService.updateQualificationsContent(this.selectedQualification);
  }
}
