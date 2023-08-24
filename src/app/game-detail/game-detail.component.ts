import { Component, OnInit } from "@angular/core";
import { GamesService } from "../services/games.service";
import { ActivatedRoute, Router } from '@angular/router';
import { IGame } from "../models/game";

@Component({
    selector: "app-game-detail",
    templateUrl: "game-detail.component.html",
    styleUrls: ['./game-detail.component.scss']

})
export class GameDetailComponent implements OnInit {
    rank: string;
    game: IGame;
    constructor(private data: GamesService, private _route: ActivatedRoute, private _router: Router) {
    }
    ngOnInit(): void {
        this._route.params.subscribe(params => {
            this.rank = params['rank'];
            var gameList = this.data.getGamesList();
        this.game = gameList.filter(i => i.Rank === this.rank)[0];
        });
    }

    onBack(): void {
        this._router.navigate(['/game']);
    }
}
