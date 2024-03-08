import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatPanelComponent } from './pages/chat-panel/chat-panel.component';
import { EvalComponent } from './pages/eval/eval.component';

const routes: Routes = [
  {
    path: "eval",
    component: EvalComponent, 
  },
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
