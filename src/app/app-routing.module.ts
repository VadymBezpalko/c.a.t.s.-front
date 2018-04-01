import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

const routes: Routes = [
    { path: '', redirectTo: '/charts', pathMatch: 'full'},
    { path: 'charts', loadChildren: './charts/charts.module#ChartsModule' },
    { path: 'ner', loadChildren: './ner/ner.module#NerModule' },
    { path: '**', redirectTo: '/charts' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
