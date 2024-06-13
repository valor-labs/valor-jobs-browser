import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTreeModule } from '@angular/material/tree';
import { SharedService } from '../../../services/shared.service';
import { Subscription } from 'rxjs';
import { NgFor, NgIf } from '@angular/common';

interface JobNode {
  name: string;
  children?: JobNode[];
  jobObject?: any;
}

interface ExampleFlatNode extends JobNode {
  expandable: boolean;
  level: number;
}

@Component({
  selector: 'app-jobs-tree',
  templateUrl: './jobs-tree.component.html',
  styleUrls: ['./jobs-tree.component.scss'],
  standalone: true,
  imports: [
    MatIconModule,
    MatButtonModule,
    MatTreeModule,
    NgFor,
    NgIf
  ],
  providers: [SharedService]
})
export class JobsTreeComponent implements OnInit, OnDestroy {
  private _transformer = (node: JobNode, level: number): ExampleFlatNode => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      level: level,
      jobObject: node.jobObject,
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

  @Output() jobSelected = new EventEmitter<ExampleFlatNode>();

  yamlContentSub?: Subscription;

  constructor(private sharedService: SharedService) {}

  ngOnInit(): void {
    this.yamlContentSub = this.sharedService.yamlContent$.subscribe((data: any) => {
      if (data && data.list) {
        this.dataSource.data = this.parseJobsData(data.list);
      }
    });
  }

  ngOnDestroy(): void {
    this.yamlContentSub?.unsubscribe();
  }

  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;

  onNodeClick(node: ExampleFlatNode): void {
    if (!node.expandable) {
      this.jobSelected.emit(node);
    }
  }

  private parseJobsData(data: any[]): JobNode[] {
    const tracks: { [key: string]: JobNode } = {};

    data.forEach(item => {
      const track = item.track;
      const title = item.title;
      const seniorityTitle = `${item.seniority} ${item.position}`;

      if (!tracks[track]) {
        tracks[track] = {
          name: track, children: []
        };
      }

      let titleNode = tracks[track].children?.find(child => child.name === title);
      if (!titleNode) {
        titleNode = { name: title, children: [] };
        tracks[track].children?.push(titleNode);
      }

      titleNode.children?.push({
        name: seniorityTitle,
        jobObject: item
       });
    });

    return Object.values(tracks);
  }
}
