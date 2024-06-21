import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SharedService } from '../../services/shared.service';
import { Subject, Subscription, takeUntil } from 'rxjs';
import { ChangeDetectorRef } from '@angular/core';
import { QualificationsTreeComponent } from './qualifications-tree/qualifications-tree.component';
import { QualificationsKnowledgeComponent } from './qualifications-knowledge/qualifications-knowledge.component';
import { QualificationsDependencyComponent } from './qualifications-dependency/qualifications-dependency.component';
import { QualificationsMaterialsComponent } from './qualifications-materials/qualifications-materials.component';
import { QualificationDetailsComponent } from './qualification-details/qualification-details.component';
import { NgIf } from '@angular/common';

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
    QualificationDetailsComponent,
    NgIf
  ],
})
export class QualificationsComponent implements OnInit, OnDestroy {
  selectedQualification: any = null;
  editMode: boolean = false;

  private destroy$ = new Subject<void>();

  

  public list: any[] = [];

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

    this.sharedService.qualificationsContent$
    .pipe(takeUntil(this.destroy$))
    .subscribe((data: any) => {
      if (data && data.list) {
        this.list = data.list;
      }

      console.log("QualificationsComponent, qualificationsContent event");
      const params = this.route.snapshot.params;
      const category = params['category'];
      const title = params['title'];
      const level = params['level'];
      if (category && title && level) {
        this.loadQualification(category, title, level);
      }

    });

  }


  loadQualification(category: string, title: string, level: string|number) {
    const qualification = this.list.find((item: any) => 
      item.category === category && 
      item.title === title && 
      item.level == level
    );
            
    if (qualification) {
      this.selectedQualification = qualification;
      this.cdr.detectChanges();
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onQualificationSelected(qualification: any): void {
    this.selectedQualification = qualification;
  }

}
