import { Component } from '@angular/core';
import { Subject, Subscription, takeUntil } from 'rxjs';
import { SharedService } from '../../services/shared.service';
import * as yaml from 'js-yaml';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import {MatExpansionModule} from '@angular/material/expansion';
import {ClipboardModule} from '@angular/cdk/clipboard';
import { CommonModule } from '@angular/common';
import { ChangesService, DifferenceType, IDifference } from '../../services/changes.service';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-export',
  standalone: true,
  imports: [FormsModule, MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule, ClipboardModule, CommonModule, MatIconModule, MatExpansionModule],
  templateUrl: './export.component.html',
  styleUrl: './export.component.scss',
})
export class ExportComponent {

  jobsDifferences: IDifference[] = [];
  qualificationsDifferences: IDifference[] = [];

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


  
  private differencesToText(type: "jobs"|"qualifications", list: IDifference[]): string[] {
    return list.map((difference: IDifference) => {
      return this.differenceRenderer(type, difference);
    })
  }


  private _shorter(propertyString?: string) {
    return (propertyString && propertyString.length>20) ? propertyString.substring(0, 20)+"..." : propertyString;
  }

  public differenceRenderer(type: "jobs"|"qualifications", difference: IDifference): string {
    let itemName = "Unknown item";
    switch (type) {
      case "jobs": 
        itemName = `${difference.item?.category} | ${difference.item?.title} | ${difference.item?.seniority}`
        break;
      case "qualifications":
        itemName = `${difference.item?.category} | ${difference.item?.title} | ${difference.item?.level}`
        break;
    }


    switch (difference.type) {
      case DifferenceType.MainAdded: {
        return `"${itemName}"`
      }
      case DifferenceType.MainDeleted: {
        return `"${itemName}"`
      }
      case DifferenceType.ElementAdded: {
        return `${difference.property} "${this._shorter(difference.value)}" to ${itemName}`
      }
      case DifferenceType.ElementDeleted: {
        return `${difference.property} "${this._shorter(difference.value)}" from ${itemName}`
      }
      case DifferenceType.MainChanged: {
        return `"${itemName}"`
      }
      default: {
        console.error(`${difference.type} - Not implemented`)
        return "Some difference";
      }
    }
  }

}
