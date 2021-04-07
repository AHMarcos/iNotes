import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Tab1Page } from './tab1.page';
import { AddPageModule } from '../add/add.module';

const routes: Routes = [
  {
    path: '',
    component: Tab1Page,
  },
  {
    path: 'add/:listaId',
    loadChildren: () => import('../add/add.module').then( m => m.AddPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Tab1PageRoutingModule {}
