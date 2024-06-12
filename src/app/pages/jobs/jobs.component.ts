import { Component, OnInit } from '@angular/core';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTreeModule } from '@angular/material/tree';
import { NgFor, NgIf } from '@angular/common';
// import { JobsService } from '../../services/jobs.service';
import { SharedService } from '../../services/shared.service';

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
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.scss'],
  standalone: true,
  imports: [
    MatIconModule,
    MatButtonModule,
    MatTreeModule,
    NgFor,
    NgIf
  ],
  providers: [
    // JobsService,
    SharedService
  ]
})
export class JobsComponent implements OnInit {
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

  selectedJob: ExampleFlatNode | null = null;

  constructor(
    // private jobsService: JobsService,
    private sharedStateService: SharedService
  ) {}

  ngOnInit(): void {
    this.loadJobs()
  }

  loadJobs(): void {
    this.sharedStateService.yamlContent$.subscribe((data:any) => {
      if (data && data.list) {
        this.dataSource.data = this.parseJobsData(data.list);
      }
    });
  }


  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;

  onNodeClick(node: ExampleFlatNode): void {
    if (!node.expandable) {
      console.log("Clicked node", node);
      this.selectedJob = node;
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
