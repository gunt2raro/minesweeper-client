import { timer } from 'rxjs';
import * as moment from 'moment'
import { Cel } from "src/app/models/cel.model";
import { Component, OnInit } from "@angular/core";
import { MatDialog } from '@angular/material/dialog';
import { Dimensions } from 'src/app/models/dimensions.model';
import { MinesweeperService } from "src/app/services/minesweeper.service";
import { SettingsComponent } from 'src/app/components/minesweeper/settings/settings.component';

@Component({
    templateUrl: './minesweeper.component.html',
    styleUrls: ['./minesweeper.component.scss']
})
export class MinesweeperComponent implements OnInit {

    public game: Cel[][]
    public dateToShow: Date
    public time: moment.Moment
    public title = 'Minesweeper';

    public dimensions: Dimensions

    public winner: boolean = false
    public showTime: boolean = true
    public gameOver: boolean = false
    public flagging: boolean = false
    public gameStared: boolean = false

    constructor(
        private dialog: MatDialog,
        private service: MinesweeperService
    ) { }

    ngOnInit() {
        this.resetDate()
        if(this.dimensions) {
            this.getGame()
        } else {
            this.openSettingsDialog()
        }
        timer(
            0,
            1000
        ).subscribe(_ => {
            if(
                this.gameStared && 
                !this.gameOver && 
                !this.winner
            ) {
                this.dateToShow = null
                this.time.add(1, "seconds")
                this.dateToShow = this.time.toDate()
            }
        })
    }
    
    openSettingsDialog() {
        const dialogRef = this.dialog
            .open(
                SettingsComponent,
                {
                    data: null
                }
            )
        dialogRef
            .afterClosed()
            .subscribe(res => {
                if(res) {
                    this.dimensions = res
                    this.winner = false
                    this.gameOver = false
                    this.flagging = false
                    this.gameStared = false
                    this.resetDate()
                    this.getGame()
                }
            })
    }

    resetDate() {
        this.time = moment()
        this.time.set({
            hours: 0,
            minute: 0,
            second: 0,
            millisecond: 0
        })
        this.dateToShow = this.time.toDate()
    }

    getGame() {
        this.service
            .getGame(
                this.dimensions.width,
                this.dimensions.height
            )
            .then((res: any) => {
                this.game = res.data
            })
    }

    enableFlagging() {
        if (this.gameStared) {
            this.flagging = !this.flagging
        }
    }

    clickOnCell(cel: Cel) {
        if (
            !this.gameStared &&
            !this.gameOver &&
            !cel.flag
        ) {
            this.service
                .fillWithMines(
                    this.game,
                    this.dimensions.mines,
                    cel
                )
                .then((res: any) => {
                    this.game = res.data
                    return this.service
                        .clickOnCel(
                            this.game,
                            cel
                        )
                })
                .then((res: any) => {
                    this.gameStared = true
                    this.game = res.data
                })
        } else if (
            this.flagging &&
            !this.gameOver &&
            !cel.flag
        ) {
            cel.flag = !cel.flag
        } else if (
            cel.mine &&
            !this.gameOver &&
            !cel.flag
        ) {
            this.gameOver = true
        } else if (!cel.open) {
            this.service
                .clickOnCel(
                    this.game,
                    cel
                )
                .then((res: any) => {
                    this.game = res.data
                    this.winner = res.winner
                })
        }
    }

    restart() {
        this.winner = false
        this.gameOver = false
        this.flagging = false
        this.gameStared = false
        this.getGame()
    }
}