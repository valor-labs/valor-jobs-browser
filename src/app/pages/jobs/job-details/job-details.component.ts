import { ChangeDetectorRef, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';


@Component({
  selector: 'app-job-details',
  templateUrl: './job-details.component.html',
  styleUrls: ['./job-details.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule
  ]
})
export class JobDetailsComponent {
  @Input() selectedJob: any;
  @Input() editMode: boolean = false;
  @Output() jobChanged = new EventEmitter<any>();

  constructor(private cdr: ChangeDetectorRef) {}


  onFieldChange(fieldName: string, newValue: string) {
    this.selectedJob[fieldName] = newValue;
    this.jobChanged.emit(this.selectedJob);
    this.cdr.detectChanges();
  }

}
