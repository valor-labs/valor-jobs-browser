import { ComponentFixture, TestBed } from '@angular/core/testing';
import { QualificationsComponent } from './qualifications.component';
import { ActivatedRoute } from '@angular/router';
import { SharedService } from '../../services/shared.service';
import { ChangeDetectorRef } from '@angular/core';
import { of } from 'rxjs';

// Mock services
class MockActivatedRoute {
  params = of({});
  snapshot = { params: {} };
}

class MockSharedService {
  editMode$ = of(false);
  qualificationsContent$ = of({ list: [] });
}

describe('QualificationsComponent', () => {
  let component: QualificationsComponent;
  let fixture: ComponentFixture<QualificationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QualificationsComponent],
      providers: [
        { provide: ActivatedRoute, useClass: MockActivatedRoute },
        { provide: SharedService, useClass: MockSharedService },
        ChangeDetectorRef
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(QualificationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
