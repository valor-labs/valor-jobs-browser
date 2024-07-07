import { Component } from '@angular/core';
import { Subject, Subscription, takeUntil } from 'rxjs';
import { SharedService } from '../../services/shared.service';
import * as yaml from 'js-yaml';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import {ClipboardModule} from '@angular/cdk/clipboard';
import { CommonModule } from '@angular/common';
import { ChangesService } from '../../services/changes.service';

@Component({
  selector: 'app-export',
  standalone: true,
  imports: [FormsModule, MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule, ClipboardModule, CommonModule],
  templateUrl: './export.component.html',
  styleUrl: './export.component.scss',
})
export class ExportComponent {

  jobsDifferences: string[] = [];
  qualificationsDifferences: string[] = [];

  jobsYamlText: string = '';
  qualificationsYamlText: string = '';

  jobsUrl: string = "";
  qualificationsUrl: string = "";

  private destroy$ = new Subject<void>();

  yamlJobsContentSub?: Subscription;
  yamlQualificationsContentSub?: Subscription;

  constructor(private sharedService: SharedService, private changesService: ChangesService) {}


  ngOnInit() {
    this.sharedService.jobsContent$
      .pipe(takeUntil(this.destroy$))
      .subscribe((receivedJobsObject:any) => {
        this.jobsYamlText = yaml.dump(receivedJobsObject);

        this.jobsDifferences = receivedJobsObject ? 
          this.changesService.compareYAMLObjects("jobs", this.sharedService.getJobsOriginalYAML(), receivedJobsObject) :
          [];
        
      });

    this.sharedService.qualificationsContent$
      .pipe(takeUntil(this.destroy$))
      .subscribe((receivedQualificationsObject:any) => {
        this.qualificationsYamlText = yaml.dump(receivedQualificationsObject);

        this.qualificationsDifferences = receivedQualificationsObject ?
          this.changesService.compareYAMLObjects("qualifications", this.sharedService.getQualificationsOriginalYAML(), receivedQualificationsObject) :
          [];

      });

    this.sharedService.jobsYamlUrl$
      .pipe(takeUntil(this.destroy$))
      .subscribe((url: string) => {
        this.jobsUrl = url;
      })

    this.sharedService.qualificationsYamlUrl$
      .pipe(takeUntil(this.destroy$))
      .subscribe((url: string) => {
        this.qualificationsUrl = url;
      })

    this.sharedService.setChangesIndicator(false);
  }

  

  createPL(url: string) {
    window.open(url.replace('/blob/', '/edit/'), "_blank");
  }


  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }



}
