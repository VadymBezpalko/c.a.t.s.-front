import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ControlPanelComponent } from './control-panel/control-panel.component';


export const routes: Routes = [
    { path: '', component: ControlPanelComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: []
})
export class NerRoutingModule {}
