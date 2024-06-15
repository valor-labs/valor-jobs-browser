import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTreeModule } from '@angular/material/tree';
import { SharedService } from '../../../services/shared.service';
import { Subscription } from 'rxjs';
import { NgFor, NgIf } from '@angular/common';

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
    MatIconModule,
    MatButtonModule,
    MatTreeModule,
    NgFor,
    NgIf
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

  @Output() qualificationSelected = new EventEmitter<ExampleFlatNode>();

  qualificationsContentSub?: Subscription;

  constructor(private sharedService: SharedService) {}

  ngOnInit(): void {
    this.qualificationsContentSub = this.sharedService.qualificationsContent$.subscribe((data: any) => {
      if (data && data.list) {
        this.dataSource.data = this.parseQualificationsData(data.list);
      }
    });
  }

  ngOnDestroy(): void {
    this.qualificationsContentSub?.unsubscribe();
  }

  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;

  onNodeClick(node: ExampleFlatNode): void {
    if (!node.expandable) {
      this.qualificationSelected.emit(node);
    }
  }

  private parseQualificationsData(data: any[]): QualificationNode[] {
    const tracks: { [key: string]: QualificationNode } = {};

    data.forEach(item => {
      const title = item.title;
      const levelTitle = `${item.title}: ${item.level}`;

      if (!tracks[title]) {
        tracks[title] = {
          name: title, children: []
        };
      }

      let levelNode = tracks[title].children?.find(child => child.name === levelTitle);
      if (!levelNode) {
        levelNode = { name: levelTitle, children: [] };
        tracks[title].children?.push(levelNode);
      }

      levelNode.children?.push({
        name: levelTitle,
        qualificationObject: item
      });
    });

    return Object.values(tracks);
  }
}
