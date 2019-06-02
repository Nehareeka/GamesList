import { Injectable } from '@angular/core';
import { IGame } from 'src/app/models/game';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { GamesService } from './games.service';

@Injectable({
    providedIn: 'root'
})
export class GamesResolver implements Resolve<any> {
    constructor(private _gameService: GamesService) {}
    csvData: any[] = [];
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
        return this._gameService.getGames();
    }

}
