import { Component, OnInit, OnDestroy } from '@angular/core';
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
  providers: [SharedService]
})
export class JobsComponent implements OnInit, OnDestroy {
  selectedJob: any = null;
  editMode: boolean = false;

  editModeSub?: Subscription;

  constructor(private sharedService: SharedService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    console.log("Setting up edit mode subscription");
    this.editModeSub = this.sharedService.editMode$.subscribe((data: any) => {
      console.log("Getting editMode", data);
      this.editMode = data;
      this.cdr.detectChanges();
    });
  }

  ngOnDestroy(): void {
    this.editModeSub?.unsubscribe();
  }

  onJobSelected(job: any): void {
    this.selectedJob = job;
  }
}
