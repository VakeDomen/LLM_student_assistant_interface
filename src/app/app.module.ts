import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms'; // Add this for ngModel binding

import { AppComponent } from './app.component';
import { ChatComponent } from './components/chat/chat.component';
import { AppRoutingModule } from './app-routing.module';
import { ChatPanelComponent } from './pages/chat-panel/chat-panel.component';
import { MessageComponent } from './components/message/message.component';
import { DEFAULT_TIMEOUT, TimeoutInterceptor } from './services/timeout.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    ChatComponent,
    ChatPanelComponent,
    MessageComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule, // Add this for ngModel binding
  ],
  providers: [
    [{ provide: HTTP_INTERCEPTORS, useClass: TimeoutInterceptor, multi: true }],
    [{ provide: DEFAULT_TIMEOUT, useValue: 300000 }]
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }