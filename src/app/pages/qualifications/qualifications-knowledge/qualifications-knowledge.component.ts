import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedService } from '../../../services/shared.service';
import { MatCardModule } from '@angular/material/card';
import { ContenteditableDirective } from '../../../directives/contenteditable.directive';

@Component({
  selector: 'app-qualifications-knowledge',
  templateUrl: './qualifications-knowledge.component.html',
  styleUrls: ['./qualifications-knowledge.component.scss'],
  standalone: true,
  imports: [
    FormsModule,
    MatCardModule,
    CommonModule,
    ContenteditableDirective
  ]
})
export class QualificationsKnowledgeComponent {
  @Input() selectedQualification: any;
  @Input() editMode: boolean = false;

  constructor() {}

  addKnowledge(): void {
    if (this.selectedQualification) {
      if (!this.selectedQualification.knowledge) {
        this.selectedQualification.knowledge = [];
      }
      this.selectedQualification.knowledge.push('');
    }
  }

  removeKnowledge(index: number): void {
    if (this.selectedQualification) {
      this.selectedQualification.knowledge.splice(index, 1);
    }
  }

  updateKnowledge(content: string, index: number): void {
    if (this.selectedQualification) {
      this.selectedQualification.knowledge[index] = content;
    }
  }

  onContentEditableInput(event: Event, index: number): void {
    const target = event.target as HTMLElement;
    this.selectedQualification.knowledge[index] = target.innerText;
  }
}
