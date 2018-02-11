import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

const routes: Routes = [
    { path: '', redirectTo: '/charts/stock', pathMatch: 'full'},
    { path: 'charts', loadChildren: './charts/charts.module#ChartsModule' },
    { path: '**', redirectTo: '/charts/stock' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
