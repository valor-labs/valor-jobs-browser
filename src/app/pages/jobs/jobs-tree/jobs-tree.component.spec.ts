import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobsTreeComponent } from './jobs-tree.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('JobsTreeComponent', () => {
  let component: JobsTreeComponent;
  let fixture: ComponentFixture<JobsTreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JobsTreeComponent, RouterTestingModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JobsTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
