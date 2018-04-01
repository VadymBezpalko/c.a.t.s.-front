import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NerComponent } from './ner/ner.component';


export const routes: Routes = [
    { path: '', component: NerComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: []
})
export class NerRoutingModule {}
