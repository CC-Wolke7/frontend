import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SearchPreviewPage } from './search-preview.page';

const routes: Routes = [
  {
    path: '',
    component: SearchPreviewPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SearchPreviewPageRoutingModule {}
