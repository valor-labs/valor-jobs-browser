import { ContenteditableDirective } from './contenteditable.directive';
import { Component, ElementRef, Renderer2 } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

// @Component({
//   template: `<div [appContenteditable]="editable" (contentChange)="onContentChange($event)"></div>`,
//   standalone: true,
// })
// class TestComponent {
//   editable = false;
//   content = '';

//   onContentChange(newContent: string) {
//     this.content = newContent;
//   }
// }

// describe('ContenteditableDirective', () => {
//   let component: TestComponent;
//   let fixture: ComponentFixture<TestComponent>;

//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       imports: [ContenteditableDirective, TestComponent]
//     });

//     fixture = TestBed.createComponent(TestComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create an instance of the directive', () => {
//     const renderer: Renderer2 = fixture.componentRef.injector.get(Renderer2);
//     const directive = new ContenteditableDirective(new ElementRef(null), renderer);
//     expect(directive).toBeTruthy();
//   });

// });


// import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { ContenteditableDirective } from './contenteditable.directive';
// import { Component } from '@angular/core';

@Component({
  template: `<div appContenteditable></div>`
})
class TestComponent {}

describe('ContenteditableDirective', () => {
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ContenteditableDirective],
      declarations: [TestComponent]
    });
    fixture = TestBed.createComponent(TestComponent);
  });

  it('should create an instance of the directive', () => {
    const directive = fixture.debugElement.query(By.directive(ContenteditableDirective));
    expect(directive).toBeTruthy();
  });
});
