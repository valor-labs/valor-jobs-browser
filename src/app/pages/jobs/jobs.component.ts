import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SharedService } from '../../services/shared.service';
import { Subject, Subscription, takeUntil } from 'rxjs';
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

  private destroy$ = new Subject<void>();

  public list: any[] = []

  constructor(
    private route: ActivatedRoute,
    private sharedService: SharedService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {

    this.sharedService.editMode$
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        this.editMode = data;
        this.cdr.detectChanges();
      })

    this.sharedService.jobsContent$
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        if (data && data.list) {
          this.list = data.list;
        }

        const params = this.route.snapshot.params;
        this.loadJob(params);
      })

    this.route.params
      .pipe(takeUntil(this.destroy$))
      .subscribe(params => {
        this.loadJob(params);
      });
  }

  
  private loadJob(params: any): void {
    const track = params['track'];
    const position = params['position'];
    const seniority = params['seniority'];

    const job = this.list.find((item: any) => 
      item.track === track && 
      item.position === position && 
      item.seniority === seniority
    );

    if (job) {
      this.selectedJob = job;
      this.cdr.detectChanges();
    }
  }


  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onJobSelected(job: any): void {
    this.selectedJob = job;
  }

  onJobChanged(updatedJob: any): void {
    let jobIdx = this.list.findIndex(item => item === updatedJob);
    if (jobIdx!==-1) {
      let newJob = {...updatedJob}
      this.list[jobIdx] = newJob;
      this.list = [...this.list];
      this.selectedJob = newJob;
    }
  }

}
