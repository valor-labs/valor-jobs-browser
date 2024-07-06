import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QualificationDetailsComponent } from './qualification-details.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('QualificationDetailsComponent', () => {
  let component: QualificationDetailsComponent;
  let fixture: ComponentFixture<QualificationDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QualificationDetailsComponent, HttpClientTestingModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QualificationDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
