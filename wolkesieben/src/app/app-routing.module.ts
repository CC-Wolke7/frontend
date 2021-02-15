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
    path: 'offer/:uuid',
    loadChildren: () => import('./offer/offer.module').then( m => m.OfferPageModule)
  },
  {
    path: 'chat',
    loadChildren: () => import('./chat/chat.module').then( m => m.ChatPageModule)
  },
  {
    path: 'favorites',
    loadChildren: () => import('./favorites/favorites.module').then( m => m.FavoritesPageModule)
  },
  {
    path: 'new-offer',
    loadChildren: () => import('./new-offer/new-offer.module').then( m => m.NewOfferPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules, useHash: true })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
