import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MilkCollectionFormComponent } from "./milk-collection-form/milk-collection-form.component";
import { TitleComponent } from "./title/title.component";

@Component({
  selector: 'app-root',
  imports: [MilkCollectionFormComponent, TitleComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'milk-collection-app';
}
