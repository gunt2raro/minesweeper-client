import { NgModule } from "@angular/core";
import { MatButtonToggleModule } from "@angular/material";
import { MatDialogModule } from "@angular/material/dialog";

@NgModule({
    imports: [MatDialogModule, MatButtonToggleModule],
    exports: [MatDialogModule, MatButtonToggleModule]
})
export class MaterialModule { }