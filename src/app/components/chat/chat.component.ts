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
  public waiting: boolean = false;
  public chatConversation: boolean = false;
  
  private stream: boolean = false;

  @ViewChild('chat') private messenger!: ElementRef;

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
      type: 'user',
      loader: false,
    } as Message;
    this.messages.push(userMsg);
    setTimeout(() => this.scrollToBottom(), 10);
    this.messageContent = ''; // Clear input after sending

    const botMsg = {
      content: "",
      type: 'bot',
      loader: true,
    } as Message;
    this.messages.push(botMsg);
    setTimeout(() => this.scrollToBottom(), 10)

    if (this.stream) {
        this.chatService.streamData(userMsg.content).subscribe({
          next: (data: string) => {
            console.log("D", data);
            botMsg.loader = false;
            botMsg.content += data;
          },
          error: (error: any) => console.error(error),
        });
    } else if (this.chatConversation) {
      botMsg.content = await this.chatService.chat(userMsg.content);
    } else {
      botMsg.content = await this.chatService.query(userMsg.content);
      // botMsg.content = await this.chatService.query_hyde(userMsg.content);
    }
    botMsg.loader = false;



    setTimeout(() => this.scrollToBottom(), 10)
    this.waiting = false;
  }

  scrollToBottom(): void {
    try {
      this.messenger.nativeElement.scrollTop = this.messenger.nativeElement.scrollHeight;
    } catch (err) { }
  }
}
