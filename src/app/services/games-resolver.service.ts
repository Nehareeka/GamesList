import { inject } from '@angular/core';
import { ResolveFn, ActivatedRouteSnapshot } from '@angular/router';
import { GamesService } from './games.service';
import { IGame } from '../models/game';

export const GamesResolver : ResolveFn<IGame[]> = (route: ActivatedRouteSnapshot) => {
    const cs = inject(GamesService);
    return cs.getGames();
}
