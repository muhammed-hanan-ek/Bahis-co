import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoaderComponent } from './loader/component/loader/loader.component';
import { ConfirmComponent } from './confirmation/confirm/confirm.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, LoaderComponent, ConfirmComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'Bahis & co';
}
