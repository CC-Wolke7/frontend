import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SearchRequestPage } from './search-request.page';

const routes: Routes = [
  {
    path: '',
    component: SearchRequestPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SearchRequestPageRoutingModule {}
