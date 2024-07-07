import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ContentComponent } from './layout/content/content.component';
import { TopNavigationComponent } from './layout/top-navigation/top-navigation.component';
import { LeftMenuComponent } from './layout/left-menu/left-menu.component';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AlertsService } from './services/alerts.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    ContentComponent,
    TopNavigationComponent,
    LeftMenuComponent,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    RouterModule,
    CommonModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'valor-growth';
  sidenavOpened: boolean = true;

  constructor(private _snackBar: MatSnackBar, private alertsService: AlertsService) {}

  ngOnInit(): void {
    this.alertsService.alerts$.subscribe((message: any) => {
      this._snackBar.open(message.text, message.cancelBtn, {
        horizontalPosition: 'right',
        verticalPosition: 'top',
        duration: 5000,
      });
    });
  }

  menuToggled() {
    this.sidenavOpened = !this.sidenavOpened;
  }
}
