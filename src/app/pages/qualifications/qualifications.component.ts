import { Component, OnInit, OnDestroy } from '@angular/core';
import { SharedService } from '../../services/shared.service';
import { Subscription } from 'rxjs';
import { NgIf } from '@angular/common';
import { ChangeDetectorRef } from '@angular/core';
import { QualificationsTreeComponent } from './qualifications-tree/qualifications-tree.component';
import { QualificationsKnowledgeComponent } from './qualifications-knowledge/qualifications-knowledge.component';
import { QualificationsDependencyComponent } from './qualifications-dependency/qualifications-dependency.component';
import { QualificationsMaterialsComponent } from './qualifications-materials/qualifications-materials.component';

@Component({
  selector: 'app-qualifications',
  templateUrl: './qualifications.component.html',
  styleUrls: ['./qualifications.component.scss'],
  standalone: true,
  imports: [
    QualificationsTreeComponent,
    QualificationsKnowledgeComponent,
    QualificationsDependencyComponent,
    QualificationsMaterialsComponent,
    NgIf
  ],
})
export class QualificationsComponent implements OnInit, OnDestroy {
  selectedQualification: any = null;
  editMode: boolean = false;

  editModeSub?: Subscription;
  qualificationsSub?: Subscription;

  constructor(private sharedService: SharedService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.editModeSub = this.sharedService.editMode$.subscribe((data: boolean) => {
      this.editMode = data;
      this.cdr.detectChanges();
    });

    this.qualificationsSub = this.sharedService.qualificationsContent$.subscribe((data: any) => {
      this.selectedQualification = data.list[0]; // Initial selection
      this.cdr.detectChanges();
    });
  }

  ngOnDestroy(): void {
    this.editModeSub?.unsubscribe();
    this.qualificationsSub?.unsubscribe();
  }

  onQualificationSelected(qualification: any): void {
    this.selectedQualification = qualification;
  }
}
