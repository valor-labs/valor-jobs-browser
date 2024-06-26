import { Component, OnInit, OnDestroy, Output, EventEmitter, Input, SimpleChanges } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTreeModule } from '@angular/material/tree';
import { Subject } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';

interface QualificationNode {
  name: string;
  children?: QualificationNode[];
  qualificationObject?: any;
}

interface ExampleFlatNode extends QualificationNode {
  expandable: boolean;
  level: number;
}

@Component({
  selector: 'app-qualifications-tree',
  templateUrl: './qualifications-tree.component.html',
  styleUrls: ['./qualifications-tree.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatTreeModule,
    MatCardModule
  ],
})
export class QualificationsTreeComponent implements OnInit, OnDestroy {
  private _transformer = (node: QualificationNode, level: number): ExampleFlatNode => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      level: level,
      qualificationObject: node.qualificationObject,
      children: node.children
    };
  };

  treeControl = new FlatTreeControl<ExampleFlatNode>(
    node => node.level,
    node => node.expandable,
  );

  treeFlattener = new MatTreeFlattener(
    this._transformer,
    node => node.level,
    node => node.expandable,
    node => node.children,
  );

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  @Input() qualificationsList: any[] = []
  @Input() editMode: boolean = false;
  @Input() selectedQualification: any;
  @Output() qualificationSelected = new EventEmitter<any>();

  private destroy$ = new Subject<void>();

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    

    // this.route.params
    //   .pipe(takeUntil(this.destroy$))
    //   .subscribe(params => {
    //     const category = params['category'];
    //     const title = params['title'];
    //     const level = params['level'];
    //     if (category && title && level) {
    //       this.expandTreeToNode(category, title, level);
    //     }
    //   });
  }

  
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['qualificationsList']) {
      this.updateTreeData();
    }

    if (changes['selectedQualification'] && changes['selectedQualification'].currentValue) {
      const qualification = changes['selectedQualification'].currentValue;
      this.expandTreeToNode(qualification.category, qualification.title, qualification.level)
      this.router.navigate(['/qualifications', qualification.category, qualification.title, qualification.level]);
    }

  }

  private updateTreeData(): void {
    this.dataSource.data = this.parseQualificationsData(this.qualificationsList);

    const params = this.route.snapshot.params;
    const category = params['category'];
    const title = params['title'];
    const level = params['level'];
    if (category && title && level) {
      this.expandTreeToNode(category, title, level);
    }
  }

  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;

  onNodeClick(node: ExampleFlatNode): void {
    if (!node.expandable) {
      const qualification = node.qualificationObject;
      this.router.navigate(['/qualifications', qualification.category, qualification.title, qualification.level]);
      this.qualificationSelected.emit(node);
    }
  }



  addNew(): void {
    const newQ = {
        title: 'New Title',  
        category: this.selectedQualification?.category ?? "New Category",
        level: 1,
    };

    this.qualificationsList.push(newQ);
    this.dataSource.data = this.parseQualificationsData(this.qualificationsList);

    this.qualificationSelected.emit(newQ);
    this.router.navigate(['/qualifications', newQ.category, newQ.title, newQ.level]);
  }


  private parseQualificationsData(data: any[]): QualificationNode[] {
    const categories: { [key: string]: QualificationNode } = {};

    data.forEach(item => {
      const title = item.title;
      const category = item.category;
      const levelTitle = `${item.title}, Level: ${item.level}`;
      
      // root
      if (!categories[category]) {
        categories[category] = {
          name: category, children: []
        };
      }

      let levelNode = categories[category].children?.find(child => child.name === title);
      if (!levelNode) {
        levelNode = { name: title, children: [] };
        categories[category].children?.push(levelNode);
      }

      levelNode.children?.push({
        name: levelTitle,
        qualificationObject: item
      });
    });

    return Object.values(categories);
  }

  private expandTreeToNode(category: string, title: string, level: string): void {
    this.treeControl.dataNodes.forEach(node => {
      if (node.level === 0 && node.name === category) {
        this.treeControl.expand(node);
      }
      if (node.level === 1 && node.name === title) {
        this.treeControl.expand(node);
      }
      // if (node.level === 2 && node.qualificationObject.level == level) {
      //   this.treeControl.expand(node);
      //   this.treeControl.expandDescendants(node);
      // }

      if (node.qualificationObject?.category === category && node.qualificationObject?.title === title && node.qualificationObject?.level == level) {
        this.selectedQualification = node.qualificationObject;
      }
    });
  }
}
