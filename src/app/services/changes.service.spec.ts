import { TestBed } from '@angular/core/testing';
import { ChangesService } from './changes.service';
import * as yaml from 'js-yaml';

describe('ChangesService', () => {
  let service: ChangesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChangesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });


  it('should detect no differences between two Qualification YAMLs', () => {
    const qualificationsYaml1 = `
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
      - Old element
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

    const qualificationsYaml2 = `
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
      - Old element
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

    const expectedDifferences: any[] = [];

    const originalObject = yaml.load(qualificationsYaml1);
    const changedObject = yaml.load(qualificationsYaml2);

    const differences = service.compareYAMLObjects("qualifications", originalObject as Object, changedObject as Object);

    expect(differences).toEqual(expectedDifferences);
  })

  it('should detect differences between two Qualification YAMLs', () => {
    const qualificationsYaml1 = `
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
      - Old element
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

    const qualificationsYaml2 = `
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
      - title: The Clean Coder2
        subjects:
          - Time Management
          - Meaning of estimate
          - Methodic of estimation by Program Evaluation and Review Technique (PERT)
          - Principles of Work Ethic
          - Handling Pressure
    `;

    const expectedDifferences = [
      `Update: knowledge "Old element" removed from "General | General Knowledge | 1"`,
      `Update: knowledge "OOP principles" added to "General | General Knowledge | 1"`,
      `Update: materials_and_topics "The Clean Coder" removed from "General | General Knowledge | 1"`,
      `Update: materials_and_topics "The Clean Coder2" added to "General | General Knowledge | 1"`,
      `Added item "General | Business Analysis | 3"`,
    ];

    const originalObject = yaml.load(qualificationsYaml1);
    const changedObject = yaml.load(qualificationsYaml2);

    const differences = service.compareYAMLObjects("qualifications", originalObject as Object, changedObject as Object);

    expect(differences).toEqual(expectedDifferences);
  });



  
  it('should detect differences between two Job YAMLs', () => {
    const jobsYaml1 = `
list:
  - title: Account Manager
    track: Delivery track
    position: Account Manager
    category: Account Management
    seniority: Senior
    experience:
      - >-
        5+ years of experience in account management or client relationship
        management in an outsourcing environment
      - >-
        Extensive track record of managing client relationships and handling
        high-level escalations
    qualifications_criteria:
      - name: General Knowledge
        level: 4
      - name: Business Analysis
        level: 3
    criteria:
      - Exceptional communication and interpersonal skills
      - Strong client-facing and negotiation skills at the executive level
      - Ability to work under pressure and meet tight deadlines
      - Advanced English level
  - title: Delivery Director
    track: Delivery track
    position: Delivery Director
    category: Project Management
    seniority: Director
    experience:
      - >-
        10+ years of experience in delivery management or similar senior roles
        in an IT environment
      - >-
        Extensive track record of successfully overseeing and delivering
        multiple large-scale projects
      - >-
        Strong experience with stakeholder management, executive reporting, and
        client relationship management
    qualifications_criteria:
      - name: General Knowledge
        level: 4
      - name: General Management
        level: 5
      - name: Project Management
        level: 4
    criteria:
      - Exceptional organizational and strategic planning skills
      - Strong leadership and executive management capabilities
      - >-
        Outstanding communication, negotiation, and interpersonal skills at the
        executive level
    `;

    const jobsYaml2 = `
list:
  - title: Account Manager
    track: Delivery track
    position: Account Manager
    category: Account Management
    seniority: Middle
    experience:
      - >-
        3+ years of experience in account management or client relationship
        management in an outsourcing environment
      - >-
        Proven track record of managing client relationships and handling
        escalations
      - Basic understanding of project management principles
    qualifications_criteria:
      - name: General Knowledge
        level: 3
      - name: Business Analysis
        level: 2
    criteria:
      - Excellent communication and interpersonal skills
      - Ability to understand client needs and provide appropriate solutions
  - title: Account Manager
    track: Delivery track
    position: Account Manager
    category: Account Management
    seniority: Senior
    experience:
      - >-
        5+ years of experience in account management or client relationship
        management in an outsourcing environment
      - >-
        Extensive track record of managing client relationships and handling
        high-level escalations
    qualifications_criteria:
      - name: General Knowledge
        level: 4
      - name: Business Analysis
        level: 3
    criteria:
      - Exceptional communication and interpersonal skills
      - Strong client-facing and negotiation skills at the executive level
      - Ability to work under pressure and meet tight deadlines
      - Advanced English level
  - title: Delivery Director
    track: Delivery track
    position: Delivery Director
    category: Project Management
    seniority: Director
    experience:
      - >-
        10+ years of experience in delivery management or similar senior roles
        in an IT environment
      - >-
        Strong experience with stakeholder management, executive reporting, and
        client relationship management
    qualifications_criteria:
      - name: General Knowledge
        level: 4
      - name: General Management
        level: 5
      - name: Project Management
        level: 4
    criteria:
      - Exceptional organizational and strategic planning skills
      - Strong leadership and executive management capabilities
      - >-
        Outstanding communication, negotiation, and interpersonal skills at the
        executive level
    `;

    const expectedDifferences: any[] = [
      `Update: experience "Extensive track reco..." removed from "Project Management | Delivery Director | Director"`,
      `Added item "Account Management | Account Manager | Middle"`
    ];

    const originalObject = yaml.load(jobsYaml1);
    const changedObject = yaml.load(jobsYaml2);

    const differences = service.compareYAMLObjects("jobs", originalObject as Object, changedObject as Object);

    expect(differences).toEqual(expectedDifferences);
  });
});
