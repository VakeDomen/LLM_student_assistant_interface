import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatPanelComponent } from './pages/chat-panel/chat-panel.component';

const routes: Routes = [
  {
    path: "**",
    component: ChatPanelComponent 
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
