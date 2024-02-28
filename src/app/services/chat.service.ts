import { Injectable } from '@angular/core';
import { Observable, firstValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { ChatResponse } from '../models/chat.response';

@Injectable({
  providedIn: 'root'
})

export class ChatService {
 
  private apiUrl = environment.apiUrl;
  private context: string | undefined;
  
  constructor(
    private http: HttpClient,
  ) { }

  public async chat(question: string): Promise<string> {
    const payload = {
      "query": question
    } as any;
    if (this.context) {
      payload["context"] = this.context;
    }
    const resp = await firstValueFrom(this.http.post<ChatResponse>(`${this.apiUrl}/query`, payload)).catch(e => {
      return {
        response: "Ugh...something went wrong.. :/",
        context: undefined,
      }
    });
    this.context = resp.context;
    return resp.response
  }
}
