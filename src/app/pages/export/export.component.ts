import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { SharedService } from '../../services/shared.service';
import * as yaml from 'js-yaml';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-export',
  standalone: true,
  imports: [FormsModule, MatCardModule],
  templateUrl: './export.component.html',
  styleUrl: './export.component.scss',
})
export class ExportComponent {

  jobsYaml: string = '';
  qualificationsYaml: string = '';

  yamlJobsContentSub?: Subscription;
  yamlQualificationsContentSub?: Subscription;

  constructor(private sharedService: SharedService) {}


  ngOnInit() {
    this.yamlJobsContentSub = this.sharedService.jobsContent$.subscribe((data:any) => {
      this.jobsYaml = yaml.dump(data);
    });
    this.yamlQualificationsContentSub = this.sharedService.qualificationsContent$.subscribe((data:any) => {
      this.qualificationsYaml = yaml.dump(data);
    });

    this.sharedService.setChangesIndicator(false);
  }

  ngOnDestroy() {
    this.yamlJobsContentSub?.unsubscribe()
    this.yamlQualificationsContentSub?.unsubscribe()
  }



}
