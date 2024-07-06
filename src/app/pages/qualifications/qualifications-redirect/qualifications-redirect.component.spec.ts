import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QualificationRedirectComponent } from './qualifications-redirect.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { SharedService } from '../../../services/shared.service';
import { RouterTestingModule } from '@angular/router/testing';

describe('QualificationRedirectComponent', () => {
  let component: QualificationRedirectComponent;
  let fixture: ComponentFixture<QualificationRedirectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QualificationRedirectComponent, HttpClientTestingModule, RouterTestingModule],
      providers: [SharedService]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QualificationRedirectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
