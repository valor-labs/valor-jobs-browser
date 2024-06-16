import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SharedService } from '../../services/shared.service';
import { Subscription } from 'rxjs';
import { ChangeDetectorRef } from '@angular/core';
import { QualificationsTreeComponent } from './qualifications-tree/qualifications-tree.component';
import { QualificationsKnowledgeComponent } from './qualifications-knowledge/qualifications-knowledge.component';
import { QualificationsDependencyComponent } from './qualifications-dependency/qualifications-dependency.component';
import { QualificationsMaterialsComponent } from './qualifications-materials/qualifications-materials.component';
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
    NgIf
  ],
})
export class QualificationsComponent implements OnInit, OnDestroy {
  selectedQualification: any = null;
  editMode: boolean = false;

  private subscriptions = new Subscription();
  private list: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private sharedService: SharedService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.subscriptions.add(
      this.sharedService.editMode$.subscribe((data: boolean) => {
        this.editMode = data;
        this.cdr.detectChanges();
      })
    );

    this.subscriptions.add(
      this.route.params.subscribe(params => {
        const category = params['category'];
        const title = params['title'];
        const level = params['level'];

        if (category && title && level) {
          this.loadQualification(this.list, category, title, level);
        }
      })
    );

    this.subscriptions.add(
      this.sharedService.qualificationsContent$.subscribe((data: any) => {
        if (data && data.list) {
          this.list = data.list;
        }
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  onQualificationSelected(qualification: any): void {
    console.log("qualifications onQualificationSelected", qualification);
    this.selectedQualification = qualification;
  }

  private loadQualification(list: any[], category: string, title: string, level: string): void {
    const qualification = list.find((item: any) => 
      item.category === category && 
      item.title === title && 
      item.level == level
    );

    if (qualification) {
      this.selectedQualification = { qualificationObject: qualification };
      this.cdr.detectChanges();
    }
  }
}
