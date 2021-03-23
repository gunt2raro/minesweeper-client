import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { GlobalModule } from "./global.module";
import { MaterialModule } from "./material.module";
import { MinesweeperRoutes } from '../routes/minesweeper.routes';
import { MinesweeperComponent } from "../pages/minesweeper/minesweeper.component";
import { SettingsComponent } from "../components/minesweeper/settings/settings.component";

@NgModule({
    declarations: [
        SettingsComponent,
        MinesweeperComponent,
    ],
    imports: [
        GlobalModule,
        MaterialModule,
        RouterModule.forChild(MinesweeperRoutes)
    ],
    providers: [
    ],
    entryComponents: [
        SettingsComponent
    ]
})
export class MinesweeperModule { }