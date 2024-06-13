import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobsQualificationsComponent } from './jobs-qualifications.component';

describe('JobsQualificationsComponent', () => {
  let component: JobsQualificationsComponent;
  let fixture: ComponentFixture<JobsQualificationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JobsQualificationsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JobsQualificationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
