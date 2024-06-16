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

  private subscriptions: Subscription[] = [];

  constructor(
    private route: ActivatedRoute,
    private sharedService: SharedService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.subscriptions.push(
      this.sharedService.editMode$.subscribe((data: any) => {
        this.editMode = data;
        this.cdr.detectChanges();
      })
    );

    this.subscriptions.push(
      this.route.params.subscribe(params => {
        const category = params['category'];
        const title = params['title'];
        const level = params['level'];

        if (category && title && level) {
          this.subscriptions.push( this.sharedService.qualificationsContent$.subscribe((data: any) => {
            if (data && data.list) {
              const qualification = data.list.find((item: any) => 
                item.category === category && 
                item.title === title && 
                item.level == level
              );
          
              if (qualification) {
                console.log("QualificationComponent, route event + content event")
                this.selectedQualification = qualification;
                this.cdr.detectChanges();
              }
            }
          }));
        }
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  onQualificationSelected(qualification: any): void {
    this.selectedQualification = qualification;
  }

}
