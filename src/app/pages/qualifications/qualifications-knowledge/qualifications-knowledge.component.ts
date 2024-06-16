import { Component, Input } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedService } from '../../../services/shared.service';

@Component({
  selector: 'app-qualifications-knowledge',
  templateUrl: './qualifications-knowledge.component.html',
  styleUrls: ['./qualifications-knowledge.component.scss'],
  standalone: true,
  imports: [
    NgFor,
    NgIf,
    FormsModule
  ]
})
export class QualificationsKnowledgeComponent {
  @Input() selectedQualification: any;
  @Input() editMode: boolean = false;

  constructor(private sharedService: SharedService) {}

  ngOnInit() {
    console.log("on itin");
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
