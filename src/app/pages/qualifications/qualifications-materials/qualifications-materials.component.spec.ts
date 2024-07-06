import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QualificationsMaterialsComponent } from './qualifications-materials.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

describe('QualificationsMaterialsComponent', () => {
  let component: QualificationsMaterialsComponent;
  let fixture: ComponentFixture<QualificationsMaterialsComponent>;

  beforeEach(async () => {

    await TestBed.configureTestingModule({
      imports: [QualificationsMaterialsComponent, RouterTestingModule],
    })
    .compileComponents();

    fixture = TestBed.createComponent(QualificationsMaterialsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
