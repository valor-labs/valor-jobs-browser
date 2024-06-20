import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { SharedService } from '../../../services/shared.service';

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

  constructor(private sharedService: SharedService) {}

  onFieldChange(fieldName: string, newValue: string) {
    this.selectedQualification[fieldName] = newValue;
    this.updateQualificationContent();
  }

  private updateQualificationContent(): void {
    const currentQualifications = this.sharedService.getCurrentQualificationsContent();
    const updatedQualifications = currentQualifications.list.map((qualification: any) => {
      if (qualification.category === this.selectedQualification.category &&
          qualification.title === this.selectedQualification.title &&
          qualification.level == this.selectedQualification.level) {
        return this.selectedQualification;
      }
      return qualification;
    });
    this.sharedService.updateQualificationsContent({ list: updatedQualifications });
  }
}
