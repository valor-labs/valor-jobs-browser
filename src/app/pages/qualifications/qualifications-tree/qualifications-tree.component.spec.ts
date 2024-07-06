import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QualificationsTreeComponent } from './qualifications-tree.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('QualificationsTreeComponent', () => {
  let component: QualificationsTreeComponent;
  let fixture: ComponentFixture<QualificationsTreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QualificationsTreeComponent, RouterTestingModule]
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
