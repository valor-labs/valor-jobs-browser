import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedService } from '../../../services/shared.service';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-qualifications-knowledge',
  templateUrl: './qualifications-knowledge.component.html',
  styleUrls: ['./qualifications-knowledge.component.scss'],
  standalone: true,
  imports: [
    NgFor,
    NgIf,
    FormsModule,
    MatCardModule
  ]
})
export class QualificationsKnowledgeComponent implements OnChanges {
  @Input() selectedQualification: any;
  @Input() editMode: boolean = false;

  constructor(private sharedService: SharedService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['selectedQualification'] && this.selectedQualification) {
      // this.knowledge = this.selectedQualification.qualificationObject.knowledge || [];
      console.log("this.selectedQualification", this.selectedQualification);
    }
  }

  addKnowledge(): void {
    if (this.selectedQualification) {
      this.selectedQualification.knowledge.push('');
      this.updateQualificationsContent();
    }
  }

  removeKnowledge(index: number): void {
    if (this.selectedQualification) {
      this.selectedQualification.knowledge.splice(index, 1);
      this.updateQualificationsContent();
    }
  }

  onContentEditableInput(event: Event, index: number): void {
    const target = event.target as HTMLElement;
    this.selectedQualification.knowledge[index] = target.innerText;
    this.updateQualificationsContent();
  }

  private updateQualificationsContent(): void {
    this.sharedService.updateQualificationsContent(this.selectedQualification);
  }
}
