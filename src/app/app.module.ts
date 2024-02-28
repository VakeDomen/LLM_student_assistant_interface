import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms'; // Add this for ngModel binding

import { AppComponent } from './app.component';
import { ChatComponent } from './components/chat/chat.component';
import { AppRoutingModule } from './app-routing.module';
import { ChatPanelComponent } from './pages/chat-panel/chat-panel.component';

@NgModule({
  declarations: [
    AppComponent,
    ChatComponent,
    ChatPanelComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule // Add this for ngModel binding
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }