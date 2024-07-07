import { Component, Output, EventEmitter } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSlideToggleChange, MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonModule, MatMiniFabButton } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { SettingsDialogComponent } from '../settings-dialog/settings-dialog.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { SharedService } from '../../services/shared.service';
import { MatDividerModule } from '@angular/material/divider';
import { MatBadgeModule } from '@angular/material/badge';
import {MatMenuModule} from '@angular/material/menu';
import { Router, RouterModule } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';


@Component({
  selector: 'app-top-navigation',
  templateUrl: './top-navigation.component.html',
  styleUrls: ['./top-navigation.component.scss'],
  standalone: true,
  imports: [MatDialogModule, MatSlideToggleModule, MatButtonModule, MatIconModule, MatToolbarModule, MatDividerModule, RouterModule, MatBadgeModule, MatMenuModule]
})
export class TopNavigationComponent {

  @Output() menuToggled = new EventEmitter();
  noChanges: boolean = true;

  jobsUrl: string = "";
  qualificationsUrl: string = "";

  private destroy$ = new Subject<void>();

  constructor(public dialog: MatDialog, private sharedService: SharedService, private router: Router) {}

  toggleMenu(event: any) {
    this.menuToggled.emit();
  }

  ngOnInit() {
    this.sharedService.changesIndicator$
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        this.noChanges = !data;
      })

    this.sharedService.jobsYamlUrl$
    .pipe(takeUntil(this.destroy$))
    .subscribe((data) => {
      this.jobsUrl = data;
    })

  this.sharedService.qualificationsYamlUrl$
    .pipe(takeUntil(this.destroy$))
    .subscribe((data) => {
      this.qualificationsUrl = data;
    })

  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }


  toggleEditMode(event: MatSlideToggleChange): void {
    this.sharedService.setEditMode(event.checked);
  }

  openSettingsDialog(): void {
    // const dialogRef = 
    
      this.dialog.open(SettingsDialogComponent, {
        width: '50%'
      });

  }


  openExport() {
    this.router.navigate(['/export']);
  }

  // openExportDialog(): void {
  //   const dialogRef = this.dialog.open(ExportDialogComponent, {
  //     width: '50%'
  //   });

  //   dialogRef.afterClosed().subscribe(result => {
  //     if (result) {
  //       // Handle export data here
  //       console.log('Export Data:', result);
  //     }
  //   });
  // }
}
