import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedService } from '../../../services/shared.service';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-qualification-redirect',
  templateUrl: './qualifications-redirect.component.html',
  standalone: true,
  imports: [CommonModule]
})
export class QualificationRedirectComponent implements OnInit {
  private subscriptions: Subscription = new Subscription();

  qualificationNotFound: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private sharedService: SharedService
  ) {}

  ngOnInit(): void {
    const title = this.route.snapshot.paramMap.get('title');
    const level = this.route.snapshot.paramMap.get('level');
    
    console.log("Redirect controller", title, level);

    if (title && level) {
      this.subscriptions.add(
        this.sharedService.qualificationsContent$.subscribe((data: any) => {
          if (data && data.list) {
            const qualification = data.list.find((item: any) => 
              item.title === title && 
              item.level == level
            );

            if (qualification) {
              const category = qualification.category;
              this.router.navigate(['/qualifications', category, title, level]);
            } else {
              // Handle case where qualification is not found
              console.error('Qualification not found');
              this.qualificationNotFound = true;
            }
          }
        })
      );
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
