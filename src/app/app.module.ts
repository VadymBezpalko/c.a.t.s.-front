import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { ApiService } from './shared/api/api.service';
import { ValidationService } from './shared/validation/validation.service';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
        BrowserModule,
        SharedModule,
        AppRoutingModule
    ],
    exports: [
        AppRoutingModule
    ],
    providers: [
        ApiService,
        ValidationService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
