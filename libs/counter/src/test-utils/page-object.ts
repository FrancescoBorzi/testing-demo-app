/* istanbul ignore file */

import { ComponentFixture } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

export abstract class PageObject<ComponentType> {
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
