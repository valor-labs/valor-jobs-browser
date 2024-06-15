import { Component, Input } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedService } from '../../../services/shared.service';

@Component({
  selector: 'app-qualifications-materials',
  templateUrl: './qualifications-materials.component.html',
  styleUrls: ['./qualifications-materials.component.scss'],
  standalone: true,
  imports: [
    NgFor,
    NgIf,
    FormsModule
  ],
})
export class QualificationsMaterialsComponent {
  @Input() selectedQualification: any;
  @Input() editMode: boolean = false;

  constructor(private sharedService: SharedService) {}

  addMaterial(): void {
    if (this.selectedQualification) {
      this.selectedQualification.materials_and_topics.push('');
      this.updateQualificationsContent();
    }
  }

  removeMaterial(index: number): void {
    if (this.selectedQualification) {
      this.selectedQualification.materials_and_topics.splice(index, 1);
      this.updateQualificationsContent();
    }
  }

  onContentEditableInput(event: Event, index: number): void {
    const target = event.target as HTMLElement;
    this.selectedQualification.materials_and_topics[index] = target.innerText;
    this.updateQualificationsContent();
  }

  private updateQualificationsContent(): void {
    this.sharedService.updateQualificationsContent(this.selectedQualification);
  }
}