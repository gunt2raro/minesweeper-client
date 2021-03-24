import { Subscription } from "rxjs";
import { AuthService } from "src/app/services/auth.service";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
    selector: 'appHeader',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

    public user: any

    private userSub: Subscription

    constructor(
        private router: Router,
        private authService: AuthService
    ) { }

    ngOnInit() {
        this.userSub = this.authService
            .currentUser
            .subscribe(cu => {
                this.user = cu
            })
    }

    logIn() {
        this.router
            .navigate([
                'auth',
                'login'
            ])
    }

    logOut() { 
        localStorage.clear()
        this.authService
            .changeCurrentUser(null)
    }

    signIn() {
        this.router
            .navigate([
                'auth',
                'signin'
            ])
    }

    goToScores() {
        this.router
            .navigate([
                'minesweeper',
                'scores'
            ])
    }

    ngOnDestroy() { }
}