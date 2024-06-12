import { Component } from '@angular/core';
import { MatList, MatListItem, MatNavList } from '@angular/material/list';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-left-menu',
  standalone: true,
  imports: [MatNavList, MatListItem, MatList, RouterModule],
  templateUrl: './left-menu.component.html',
  styleUrl: './left-menu.component.scss'
})
export class LeftMenuComponent {

}
