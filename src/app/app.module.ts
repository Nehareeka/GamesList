import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { GamesListComponent } from './games-list/games-list.component';
import { HttpClientModule } from '@angular/common/http';
import { SortDirective } from './shared/sort.directive';
import { FilterDirective } from './shared/filter.directive';
import { RouterModule } from '@angular/router';
import { GamesResolver } from './services/games-resolver.service';
import { GamesService } from './services/games.service';
import { GameDetailComponent } from './game-detail/game-detail.component';
import { PagerService } from './services/pager.service';

@NgModule({
  declarations: [
    AppComponent,
    GamesListComponent,
    GameDetailComponent,
    SortDirective,
    FilterDirective
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot([
      { path: 'games', component: GamesListComponent, resolve: { initData: GamesResolver } },
      { path: 'detail/:rank', component: GameDetailComponent },
      { path: '', redirectTo: 'games', pathMatch: 'full' },
      { path: '**', redirectTo: 'games', pathMatch: 'full' }
    ])
  ],
  providers: [GamesService,
    PagerService
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }

