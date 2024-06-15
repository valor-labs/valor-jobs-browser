import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QualificationsKnowledgeComponent } from './qualifications-knowledge.component';

describe('QualificationsKnowledgeComponent', () => {
  let component: QualificationsKnowledgeComponent;
  let fixture: ComponentFixture<QualificationsKnowledgeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QualificationsKnowledgeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QualificationsKnowledgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
