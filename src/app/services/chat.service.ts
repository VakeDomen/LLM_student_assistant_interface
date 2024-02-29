import { Injectable } from '@angular/core';
import { Observable, firstValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { ChatResponse } from '../models/chat.response';


export type Language = 'SLO' | 'EN';

@Injectable({
  providedIn: 'root'
})

export class ChatService {
 
  private apiUrl = environment.apiUrl;
  private context: string | undefined;
  private lang: Language = 'SLO';
  
  constructor(
    private http: HttpClient,
  ) { }

  public async chat(question: string): Promise<string> {
    const payload = {
      "query": `${this.getLangPrefix()} ${question}`
    } as any;
    if (this.context) {
      payload["context"] = this.context;
    }
    const resp = await firstValueFrom(this.http.post<ChatResponse>(`${this.apiUrl}/chat`, payload)).catch(e => {
      console.error(e)
      return {
        response: "Ugh...something went wrong.. :/",
        context: undefined,
      }
    });
    this.context = resp.context;
    return resp.response
  }

  public async query(question: string): Promise<string> {
    const payload = {
      "query": `${this.getLangPrefix()} ${question}`
    } as any;
    
    const resp = await firstValueFrom(this.http.post<ChatResponse>(`${this.apiUrl}/query`, payload)).catch(e => {
      console.error(e)
      return {
        response: "Ugh...something went wrong.. :/",
      }
    });
    return resp.response
  }
  
  
  getLangPrefix() {
    if (this.lang == 'SLO') return "Sem študent. Ti si zaposlen v študentskem referatu. Odgovori na moje vporašanje v slovenščini: "
    return "I am a student. You work in the student's office. Answer my question: "
  }


}

