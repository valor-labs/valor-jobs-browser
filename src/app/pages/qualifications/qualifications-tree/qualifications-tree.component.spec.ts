import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QualificationsTreeComponent } from './qualifications-tree.component';

describe('QualificationsTreeComponent', () => {
  let component: QualificationsTreeComponent;
  let fixture: ComponentFixture<QualificationsTreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QualificationsTreeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QualificationsTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
