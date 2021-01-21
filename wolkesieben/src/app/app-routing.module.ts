import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'profile',
    loadChildren: () => import('./profile/profile.module').then( m => m.ProfilePageModule)
  },
  {
    path: 'search-request',
    loadChildren: () => import('./search-request/search-request.module').then( m => m.SearchRequestPageModule)
  },
  {
    path: 'search-preview',
    loadChildren: () => import('./search-preview/search-preview.module').then( m => m.SearchPreviewPageModule)
  },
  {
    path: 'offer/:id',
    loadChildren: () => import('./offer/offer.module').then( m => m.OfferPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
