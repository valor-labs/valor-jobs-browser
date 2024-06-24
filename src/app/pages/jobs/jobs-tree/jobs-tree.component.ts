import { Component, OnInit, OnDestroy, Output, EventEmitter, Input, SimpleChanges } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatTreeFlatDataSource, MatTreeFlattener, MatTreeNestedDataSource } from '@angular/material/tree';
import { FlatTreeControl, NestedTreeControl } from '@angular/cdk/tree';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTreeModule } from '@angular/material/tree';
import { SharedService } from '../../../services/shared.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';

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
    MatTreeModule,
    MatCardModule
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

  @Input() jobsList: any[] = [];
  @Input() editMode: boolean = false;
  @Input() selectedJob: any;
  @Output() jobSelected = new EventEmitter<any>();

  private destroy$ = new Subject<void>();
  selectedNode: ExampleFlatNode | null = null;

  constructor(private sharedService: SharedService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params
      .pipe(takeUntil(this.destroy$))
      .subscribe(params => {
        const track = params['track'];
        const position = params['position'];
        const seniority = params['seniority'];
        if (track && position && seniority) {
          this.expandTreeToNode(track, position, seniority);
        }
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['jobsList']) {
      this.updateTreeData();
    }

    if (changes['selectedJob'] && changes['selectedJob'].currentValue) {
      this.router.navigate(['/jobs', changes['selectedJob'].currentValue.track, changes['selectedJob'].currentValue.position, changes['selectedJob'].currentValue.seniority]);
    }
  }

  private updateTreeData(): void {
    this.dataSource.data = this.parseJobsData(this.jobsList);

    const params = this.route.snapshot.params;
    const track = params['track'];
    const position = params['position'];
    const seniority = params['seniority'];
    if (track && position && seniority) {
      this.expandTreeToNode(track, position, seniority);
    }
  }

  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;

  onNodeClick(node: ExampleFlatNode): void {
    if (!node.expandable) {
      const job = node.jobObject;
      this.selectedNode = node; // Track the selected node before navigating
      this.router.navigate(['/jobs', job.track, job.position, job.seniority]);
      this.jobSelected.emit(job);
    }
  }

  addNew(): void {

    const newJob = {
        title: 'New Title',  
        track: this.selectedNode?.jobObject?.track ?? "New Track",
        category: this.selectedNode?.jobObject?.category ?? "New Category",
        position: this.selectedNode?.jobObject?.position ?? "New Position",
        seniority: 'New Seniority',
        criteria: [],
        experience: [],
        qualifications_criteria: []
    };

    this.jobsList.push(newJob);
    this.dataSource.data = this.parseJobsData(this.jobsList);

    // Select and open the newly created job entry
    this.selectedNode = {
      name: `${newJob.seniority} ${newJob.title}`,
      level: 2,
      expandable: false,
      jobObject: newJob
    };


    this.jobSelected.emit(newJob);
    this.router.navigate(['/jobs', newJob.track, newJob.position, newJob.seniority]);
  }

  private parseJobsData(data: any[]): JobNode[] {
    const tracks: { [key: string]: JobNode } = {};

    data.forEach(item => {
      const track = item.track;
      const position = item.position;
      const seniorityTitle = `${item.seniority} ${item.position}`;

      if (!tracks[track]) {
        tracks[track] = {
          name: track, children: []
        };
      }

      let titleNode = tracks[track].children?.find(child => child.name === position);
      if (!titleNode) {
        titleNode = { name: position, children: [] };
        tracks[track].children?.push(titleNode);
      }

      titleNode.children?.push({
        name: seniorityTitle,
        jobObject: item
       });
    });

    return Object.values(tracks);
  }

  private expandTreeToNode(track: string, position: string, seniority: string): void {
    this.treeControl.dataNodes.forEach(node => {
      if (node.level === 0 && node.name === track) {
        this.treeControl.expand(node);
      }
      if (node.level === 1 && node.name === position) {
        this.treeControl.expand(node);
      }

      if (node.jobObject?.track === track && node.jobObject?.position === position && node.jobObject?.seniority === seniority) {
        this.selectedNode = node;
      }
    });
  }
}
