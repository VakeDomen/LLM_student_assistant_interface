import { Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { ChatService } from 'src/app/services/chat.service';
import { Message } from '../message/message.component';



@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.sass']
})
export class ChatComponent implements OnInit {
  public messageContent: string = '';
  public messages: Message[] = [];
  @ViewChild('chat') private messenger!: ElementRef;
  public waiting: boolean = false;

  constructor(
    private chatService: ChatService
  ) { }

  ngOnInit(): void {
  }

  async sendMessage(): Promise<void> {
    if (this.waiting) return;
    else this.waiting = true;

    const userMsg = {
      content: this.messageContent, 
      type: 'user'
    } as Message;
    this.messages.push(userMsg);
    setTimeout(() => this.scrollToBottom(), 10);
    this.messageContent = ''; // Clear input after sending
    const response = await this.chatService.chat(userMsg.content);
    

    const botMsg = {
      content: response, 
      type: 'bot'
    } as Message;
    this.messages.push(botMsg);

    setTimeout(() => this.scrollToBottom(), 10)
    this.waiting = false;
  }

  scrollToBottom(): void {
    try {
        this.messenger.nativeElement.scrollTop = this.messenger.nativeElement.scrollHeight;
    } catch(err) { }                 
}
}
