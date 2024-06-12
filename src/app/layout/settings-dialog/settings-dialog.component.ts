import { Component, Inject, Output, EventEmitter } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { SharedService } from '../../services/shared.service';

@Component({
  selector: 'app-settings-dialog',
  templateUrl: './settings-dialog.component.html',
  styleUrls: ['./settings-dialog.component.scss'],
  standalone: true,
  imports: [MatButtonModule, MatInputModule, MatDialogModule, ReactiveFormsModule]
})
export class SettingsDialogComponent {
  form: FormGroup;
  // @Output() urlChanged = new EventEmitter<string>();

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<SettingsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { yamlUrl: string },
    private sharedStateService: SharedService
  ) {
    this.form = this.fb.group({
      yamlUrl: [data.yamlUrl]
    });
  }

  onSave(): void {
    const yamlUrl = this.form.value.yamlUrl;
    localStorage.setItem('yamlUrl', yamlUrl);
    this.sharedStateService.setYamlUrl(yamlUrl);
    // this.urlChanged.emit(yamlUrl);
    this.dialogRef.close(yamlUrl);
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
