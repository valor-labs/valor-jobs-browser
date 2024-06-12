import { Component } from '@angular/core';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-export-dialog',
  templateUrl: './export-dialog.component.html',
  styleUrls: ['./export-dialog.component.scss'],
  standalone: true,
  imports: [MatButtonModule, MatInputModule, MatDialogModule, FormsModule]
})
export class ExportDialogComponent {
  exportData: string = '';

  constructor(public dialogRef: MatDialogRef<ExportDialogComponent>) {}

  onExport(): void {
    // Handle export logic here
    this.dialogRef.close(this.exportData);
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
