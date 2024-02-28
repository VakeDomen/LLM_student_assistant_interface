import { Component, OnInit } from '@angular/core';
import { ChatService } from 'src/app/services/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.sass']
})
export class ChatComponent implements OnInit {
  public message: string = '';
  public messages: string[] = [];

  constructor(
    private chatService: ChatService
  ) { }

  ngOnInit(): void {}

  async sendMessage(): Promise<void> {
    const response = await this.chatService.chat(this.message);
    this.messages.push(`You: ${this.message}`);
    this.messages.push(`Bot: ${response}`);
    this.message = ''; // Clear input after sending
  }
}
