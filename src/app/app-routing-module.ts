// app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MilkCollectionFormComponent } from './milk-collection-form/milk-collection-form.component'; // Import your component

const routes: Routes = [
  { path: 'milk-collection', component: MilkCollectionFormComponent }, // Define a route for your form
  { path: '', redirectTo: 'milk-collection', pathMatch: 'full' },  // Default route
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }