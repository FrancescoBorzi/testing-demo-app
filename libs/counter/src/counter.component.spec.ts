import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CounterComponent } from './counter.component';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

abstract class PageObject<ComponentType> {
  constructor(protected fixture: ComponentFixture<ComponentType>) {}

  detectChanges(): void {
    this.fixture.detectChanges();
  }

  getDebugElementByCss(cssSelector: string, assert = true): DebugElement {
    const debugElement = this.fixture.debugElement.query(By.css(cssSelector));

    if (assert) {
      try {
        expect(debugElement).toBeTruthy();
      } catch(e) {
        throw new Error(`Element with selector "${cssSelector}" was not found.`);
      }
    }

    return debugElement;
  }
  getDebugElementByTestId(testId: string, assert = true): DebugElement {
    return this.getDebugElementByCss(`[data-test-id="${testId}"]`, assert);
  }
}


// describe('CounterComponent - Component class testing', () => {
//
//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       imports: [CounterComponent],
//     }).compileComponents();
//   });
//
//   function setup() {
//     const fixture = TestBed.createComponent(CounterComponent);
//     const component = fixture.componentInstance;
//     return { fixture, component };
//   }
//
//   it('should have the counter set to 0 by default', () => {
//     const { component } = setup();
//
//     expect(component.count).toBe(0);
//   });
//
//   it('should increase the counter when clicking on the increase button', () => {
//     const { component } = setup();
//
//     component.increase();
//
//     expect(component.count).toBe(1);
//   });
//
//   it('should decrease the counter if the current value is greater than 0 when clicking on the decrease button', () => {
//     const { component } = setup();
//     component.count = 2;
//
//     component.decrease();
//
//     expect(component.count).toBe(1);
//   });
//
//   it('should NOT decrease the counter if the current value is 0 when clicking on the decrease button', () => {
//     const { component } = setup();
//     component.count = 0;
//
//     component.decrease();
//
//     expect(component.count).toBe(0);
//   });
//
//   it('should reset the counter when clicking the reset button', () => {
//     const { component } = setup();
//     component.count = 123;
//
//     component.reset();
//
//     expect(component.count).toBe(0);
//   });
// });

describe('CounterComponent - Component DOM testing', () => {

  class CounterPage extends PageObject<CounterComponent> {
    // methods to retrieve the elements
    getIncreaseButton(): DebugElement {
      return this.getDebugElementByTestId('increase');
    }
    getDecreaseButton(): DebugElement {
      return this.getDebugElementByTestId('decrease');
    }
    getResetButton(): DebugElement {
      return this.getDebugElementByTestId('reset');
    }
    getCount(): DebugElement {
      return this.getDebugElementByTestId('count');
    }

    // methods to perform actions
    clickIncreaseButton(): void {
      this.getIncreaseButton().nativeElement.click();
    }
    clickDecreaseButton(): void {
      this.getDecreaseButton().nativeElement.click();
    }
    clickResetButton(): void {
      this.getResetButton().nativeElement.click();
    }
    expectCurrentCountToBe(value: number) {
      expect(this.getCount().nativeElement.innerHTML).toEqual(`${value}`);
    }
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CounterComponent],
    }).compileComponents();
  });

  function setup() {
    const fixture = TestBed.createComponent(CounterComponent);
    const component = fixture.componentInstance;
    const page = new CounterPage(fixture);
    return { fixture, component, page };
  }

  it('should have the counter set to 0 by default', () => {
    const { page } = setup();

    page.detectChanges();

    page.expectCurrentCountToBe(0);
  });

  it('should increase the counter when clicking on the increase button', () => {
    const { page } = setup();

    page.clickIncreaseButton();
    page.detectChanges();

    page.expectCurrentCountToBe(1);
  });

  it('should decrease the counter if the current value is greater than 0 when clicking on the decrease button', () => {
    const { page } = setup();
    page.clickIncreaseButton();
    page.clickIncreaseButton();

    page.clickDecreaseButton();
    page.detectChanges();

    page.expectCurrentCountToBe(1);
  });

  it('should NOT decrease the counter if the current value is 0 when clicking on the decrease button', () => {
    const { page } = setup();

    page.clickDecreaseButton();
    page.detectChanges();

    page.expectCurrentCountToBe(0);
  });

  it('should reset the counter when clicking the reset button', () => {
    const { page } = setup();
    page.clickIncreaseButton();
    page.clickIncreaseButton();

    page.clickResetButton();
    page.detectChanges();

    page.expectCurrentCountToBe(0);
  });
});
