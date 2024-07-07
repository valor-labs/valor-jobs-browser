import { Component } from '@angular/core';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-settings-dialog',
  templateUrl: './settings-dialog.component.html',
  styleUrls: ['./settings-dialog.component.scss'],
  standalone: true,
  imports: [MatButtonModule, MatInputModule, MatDialogModule, ReactiveFormsModule]
})
export class SettingsDialogComponent {

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<SettingsDialogComponent>,
  ) {

  }

  onSave(): void {

  }

  

  onCancel(): void {
    this.dialogRef.close();
  }
}
