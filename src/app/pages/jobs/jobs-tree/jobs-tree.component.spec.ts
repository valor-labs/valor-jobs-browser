import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobsTreeComponent } from './jobs-tree.component';

describe('JobsTreeComponent', () => {
  let component: JobsTreeComponent;
  let fixture: ComponentFixture<JobsTreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JobsTreeComponent]
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
