import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SharedService } from '../../services/shared.service';
import { Subscription } from 'rxjs';
import { ChangeDetectorRef } from '@angular/core';
import { JobsTreeComponent } from './jobs-tree/jobs-tree.component';
import { JobsExperienceComponent } from './jobs-experience/jobs-experience.component';
import { JobsQualificationsComponent } from './jobs-qualifications/jobs-qualifications.component';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.scss'],
  standalone: true,
  imports: [
    JobsTreeComponent,
    JobsExperienceComponent,
    JobsQualificationsComponent,
    NgIf
  ],
})
export class JobsComponent implements OnInit, OnDestroy {
  selectedJob: any = null;
  editMode: boolean = false;

  editModeSub?: Subscription;
  routeSub?: Subscription;

  constructor(
    private route: ActivatedRoute,
    private sharedService: SharedService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.editModeSub = this.sharedService.editMode$.subscribe((data: any) => {
      this.editMode = data;
      this.cdr.detectChanges();
    });

    this.routeSub = this.route.params.subscribe(params => {
      const track = params['track'];
      const title = params['title'];
      const seniority = params['seniority'];

      if (track && title && seniority) {
        this.loadJob(track, title, seniority);
      }
    });
  }

  ngOnDestroy(): void {
    this.editModeSub?.unsubscribe();
    this.routeSub?.unsubscribe();
  }

  onJobSelected(job: any): void {
    this.selectedJob = job;
  }



  /**
   * 
   * @todo Leaking subs!!!!
   * 
   * @param track 
   * @param title 
   * @param seniority 
   */
  private loadJob(track: string, title: string, seniority: string): void {
    this.sharedService.yamlContent$.subscribe((data: any) => {
      if (data && data.list) {
        const job = data.list.find((item: any) => 
          item.track === track && 
          item.title === title && 
          item.seniority === seniority
        );

        if (job) {
          this.selectedJob = { jobObject: job };
          this.cdr.detectChanges();
        }
      }
    });
  }
}
