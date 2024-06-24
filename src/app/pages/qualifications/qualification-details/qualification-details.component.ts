import { ChangeDetectorRef, Component, Input } from '@angular/core';
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

  constructor(private cdr: ChangeDetectorRef) {}

  onFieldChange(fieldName: string, newValue: string) {
    this.selectedQualification.qualificationObject[fieldName] = newValue;
    this.cdr.detectChanges();
  }

}
