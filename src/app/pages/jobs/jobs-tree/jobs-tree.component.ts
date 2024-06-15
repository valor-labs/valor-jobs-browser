import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTreeModule } from '@angular/material/tree';
import { SharedService } from '../../../services/shared.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CommonModule } from '@angular/common';

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
    CommonModule, // Import CommonModule
    MatIconModule,
    MatButtonModule,
    MatTreeModule
  ],
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

  private destroy$ = new Subject<void>();
  selectedNode: ExampleFlatNode | null = null;

  constructor(private sharedService: SharedService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.sharedService.yamlContent$
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        if (data && data.list) {
          this.dataSource.data = this.parseJobsData(data.list);
          this.route.params.pipe(takeUntil(this.destroy$)).subscribe(params => {
            const track = params['track'];
            const title = params['title'];
            const seniority = params['seniority'];
            if (track && title && seniority) {
              this.expandTreeToNode(track, title, seniority);
            }
          });
        }
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;

  onNodeClick(node: ExampleFlatNode): void {
    if (!node.expandable) {
      const job = node.jobObject;
      this.selectedNode = node; // Track the selected node before navigating
      this.router.navigate(['/jobs', job.track, job.title, job.seniority]);
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

  private expandTreeToNode(track: string, title: string, seniority: string): void {
    this.treeControl.dataNodes.forEach(node => {
      if (node.level === 0 && node.name === track) {
        this.treeControl.expand(node);
      }
      if (node.level === 1 && node.name === title) {
        this.treeControl.expand(node);
      }
      if (node.level === 2 && node.jobObject.seniority === seniority) {
        this.treeControl.expand(node);
        this.treeControl.expandDescendants(node);
      }

      if (node.jobObject?.track === track && node.jobObject?.title === title && node.jobObject?.seniority === seniority) {
        this.selectedNode = node; // Track the selected node
      }
    });
  }
}
