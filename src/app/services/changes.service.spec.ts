import { TestBed } from '@angular/core/testing';
import { ChangesService } from './changes.service';

describe('ChangesService', () => {
  let service: ChangesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChangesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });


  // - title: Business Analysis
  //   category: General
  //   status: Input required
  //   level: 1
  //   knowledge:
  //     - SDLC Methodologies
  //     - Needs assessment
  //     - Stakeholders classification
  //     - Business Case
  //   materials_and_topics:
  //     - title: Become a Business Analyst

  it('should detect differences between two YAML strings', () => {
    const yaml1 = `
list:
  - title: General Knowledge
    category: General
    status: Ready to use
    level: 1
    knowledge:
      - General networking understanding
      - Basic HTTP
      - Cookies
      - API explanation
      - General Git
      - Knowledge of two popular web server implementations
      - Command-line terminal, Linux or Windows
      - Text Encoding
    materials_and_topics:
      - title: The Clean Coder
        subjects:
          - Time Management
          - Meaning of estimate
          - Test subject
          - Methodic of estimation by Program Evaluation and Review Technique (PERT)
          - Principles of Work Ethic
          - Handling Pressure
    `;

    const yaml2 = `
list:
  - title: Business Analysis
    category: General
    status: Input required
    level: 3
    knowledge:
      - Value proposition
      - USP
      - ICP
      - Value flow
      - Kanban
      - Product vision
      - SWOT analysis
      - MoSCoW prioritization
  - title: General Knowledge
    category: General
    status: Ready to use
    level: 1
    knowledge:
      - General networking understanding
      - Basic HTTP
      - Cookies
      - API explanation
      - General Git
      - Knowledge of two popular web server implementations
      - Command-line terminal, Linux or Windows
      - Text Encoding
      - OOP principles
    materials_and_topics:
      - title: The Clean Coder
        subjects:
          - Time Management
          - Meaning of estimate
          - Methodic of estimation by Program Evaluation and Review Technique (PERT)
          - Principles of Work Ethic
          - Handling Pressure
    `;

    const expectedDifferences = [
      `Update: knowledge "OOP principles" added to "General | General Knowledge | 1"`,
      `Added item "General | Business Analysis | 3"`,
    ];

    const differences = service.compareYaml(yaml1, yaml2);

    console.log("differences", differences);

    expect(differences).toEqual(expectedDifferences);
  });
});
