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

@Component({
  selector: 'app-export',
  standalone: true,
  imports: [FormsModule, MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule, ClipboardModule],
  templateUrl: './export.component.html',
  styleUrl: './export.component.scss',
})
export class ExportComponent {

  differences: string = "";

  jobsYaml: string = '';
  qualificationsYaml: string = '';

  jobsUrl: string = "";
  qualificationsUrl: string = "";

  private destroy$ = new Subject<void>();

  yamlJobsContentSub?: Subscription;
  yamlQualificationsContentSub?: Subscription;

  constructor(private sharedService: SharedService) {}


  ngOnInit() {
    this.sharedService.jobsContent$
      .pipe(takeUntil(this.destroy$))
      .subscribe((data:any) => {
        this.jobsYaml = yaml.dump(data);
      });

    this.sharedService.qualificationsContent$
      .pipe(takeUntil(this.destroy$))
      .subscribe((data:any) => {
        this.qualificationsYaml = yaml.dump(data);
      });

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
