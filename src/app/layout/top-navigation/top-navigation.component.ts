import { Component } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSlideToggleChange, MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonModule, MatMiniFabButton } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { SettingsDialogComponent } from '../settings-dialog/settings-dialog.component';
import { ExportDialogComponent } from '../export-dialog/export-dialog.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { JobsComponent } from '../../pages/jobs/jobs.component';
import { SharedService } from '../../services/shared.service';
import { MatDividerModule } from '@angular/material/divider';


@Component({
  selector: 'app-top-navigation',
  templateUrl: './top-navigation.component.html',
  styleUrls: ['./top-navigation.component.scss'],
  standalone: true,
  imports: [MatDialogModule, MatSlideToggleModule, MatButtonModule, MatIconModule, MatToolbarModule, MatDividerModule]
})
export class TopNavigationComponent {
  editMode = false;

  constructor(public dialog: MatDialog, private sharedService: SharedService) {}

  toggleEditMode(event: MatSlideToggleChange): void {
    this.editMode = event.checked;
    this.sharedService.setEditMode(this.editMode);
  }

  openSettingsDialog(): void {
    // const dialogRef = 
      this.dialog.open(SettingsDialogComponent, {
        width: '50%',
        data: { yamlUrl: 'https://github.com/valor-labs/valor-jobs/blob/dev/data_compiled/all_positions.yaml' }
      });

    // dialogRef.componentInstance.urlChanged.subscribe((newUrl: string) => {
    //   // jobsComponent.loadJobs();
    // });

    // dialogRef.afterClosed().subscribe(result => {
    //   if (result) {
    //     // The YAML URL has been updated in the shared service
    //   }
    // });
  }

  openExportDialog(): void {
    const dialogRef = this.dialog.open(ExportDialogComponent, {
      width: '50%'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Handle export data here
        console.log('Export Data:', result);
      }
    });
  }
}
