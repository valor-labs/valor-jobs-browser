import { ChangeDetectorRef, Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-qualification-details',
  templateUrl: './qualification-details.component.html',
  styleUrls: ['./qualification-details.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule
  ]
})
export class QualificationDetailsComponent {
  @Input() selectedQualification: any;
  @Input() editMode: boolean = false;
  @Output() qualificationChanged = new EventEmitter<any>();

  constructor(private cdr: ChangeDetectorRef) {}

  onFieldChange(fieldName: string, newValue: string) {
    this.selectedQualification.qualificationObject[fieldName] = newValue;
    this.qualificationChanged.emit(this.selectedQualification);
    this.cdr.detectChanges();
  }

}
