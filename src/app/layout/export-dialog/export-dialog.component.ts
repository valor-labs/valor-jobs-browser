import { Component } from '@angular/core';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { SharedService } from '../../services/shared.service';
import { Subscription } from 'rxjs';
import * as yaml from 'js-yaml';

@Component({
  selector: 'app-export-dialog',
  templateUrl: './export-dialog.component.html',
  styleUrls: ['./export-dialog.component.scss'],
  standalone: true,
  imports: [MatButtonModule, MatInputModule, MatDialogModule, FormsModule]
})
export class ExportDialogComponent {
  exportData: string = '';
  yamlContentSub?: Subscription;

  constructor(public dialogRef: MatDialogRef<ExportDialogComponent>, private sharedService: SharedService) {}


  ngOnInit() {
    this.yamlContentSub = this.sharedService.yamlContent$.subscribe((data:any) => {
      this.exportData = yaml.dump(data);
    });
  }

  ngOnDestroy() {
    this.yamlContentSub?.unsubscribe()
  }

  onExport(): void {
    // Handle export logic here
    this.dialogRef.close(this.exportData);
  }

  onCopy(): void {
    alert("Not implemented");
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
