import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QualificationsRedirectComponent } from './qualifications-redirect.component';

describe('QualificationsRedirectComponent', () => {
  let component: QualificationsRedirectComponent;
  let fixture: ComponentFixture<QualificationsRedirectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QualificationsRedirectComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QualificationsRedirectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
