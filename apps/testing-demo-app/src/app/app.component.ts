import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CounterComponent } from '@testing-demo-app/counter';

@Component({
  standalone: true,
  imports: [CounterComponent, RouterModule],
  selector: 'testing-demo-app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'testing-demo-app';
}
