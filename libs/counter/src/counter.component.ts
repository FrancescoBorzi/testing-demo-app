import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'testing-demo-app-counter',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule],
  templateUrl: './counter.component.html',
  styleUrl: './counter.component.scss',
})
export class CounterComponent {
  protected count = 0;

  protected increase(): void {
    this.count++;
  }

  protected decrease(): void {
    if (this.count > 0) {
      this.count--;
    }
  }

  protected reset(): void {
    this.count = 0;
  }
}
