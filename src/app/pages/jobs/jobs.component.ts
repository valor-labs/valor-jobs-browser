import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SharedService } from '../../services/shared.service';
import { Subscription } from 'rxjs';
import { ChangeDetectorRef } from '@angular/core';
import { JobsTreeComponent } from './jobs-tree/jobs-tree.component';
import { JobsExperienceComponent } from './jobs-experience/jobs-experience.component';
import { JobsQualificationsComponent } from './jobs-qualifications/jobs-qualifications.component';
import { JobDetailsComponent } from './job-details/job-details.component';
import { MatCardModule } from '@angular/material/card';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.scss'],
  standalone: true,
  imports: [
    MatCardModule,
    JobsTreeComponent,
    JobsExperienceComponent,
    JobsQualificationsComponent,
    JobDetailsComponent,
    NgIf
  ],
})
export class JobsComponent implements OnInit, OnDestroy {
  selectedJob: any = null;
  editMode: boolean = false;

  private subscriptions: Subscription[] = [];
  public list: any[] = []

  constructor(
    private route: ActivatedRoute,
    private sharedService: SharedService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.subscriptions.push(
      this.sharedService.editMode$.subscribe((data: any) => {
        this.editMode = data;
        this.cdr.detectChanges();
      })
    );


    this.subscriptions.push(
      this.sharedService.jobsContent$.subscribe((data: any) => {
        if (data) {
          this.list = data.list;
          console.log("JobsComponent, jobsContent event");
          const params = this.route.snapshot.params;
          const track = params['track'];
          const title = params['title'];
          const seniority = params['seniority'];
          if (track && title && seniority) {
            this.loadJob(track, title, seniority);
          }
        }
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  onJobSelected(job: any): void {
    this.selectedJob = job;
  }

  private loadJob(track: string, title: string, seniority: string): void {
    const job = this.list.find((item: any) => 
      item.track === track && 
      item.title === title && 
      item.seniority === seniority
    );

    if (job) {
      this.selectedJob = { jobObject: job };
      this.cdr.detectChanges();
    }
  }

}
