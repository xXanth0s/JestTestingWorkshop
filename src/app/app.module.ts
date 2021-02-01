import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './comonents/nav-bar/nav-bar.component';
import { NavBarTileComponent } from './comonents/nav-bar-tile/nav-bar-tile.component';
import { StartPageModule } from './modules/start-page/start-page.module';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    NavBarTileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StartPageModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
