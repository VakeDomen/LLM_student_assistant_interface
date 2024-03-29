import { Injectable } from '@angular/core';
import { Observable, firstValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { ChatResponse } from '../models/chat.response';


export type Language = 'sl' | 'en';

@Injectable({
  providedIn: 'root'
})

export class ChatService {
 
  private apiUrl = environment.apiUrl;
  private context: string | undefined;
  public lang: Language = 'en';
  
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
      "query": `${this.getLangPrefix()} ${question}`,
      "lang": this.lang,
    } as any;
    
    const resp = await firstValueFrom(this.http.post<ChatResponse>(`${this.apiUrl}/query`, payload)).catch(e => {
      console.error(e)
      return {
        response: "Ugh...something went wrong.. :/",
      }
    });
    return resp.response
  }

  public async query_hyde(question: string): Promise<string> {
    const payload = {
      "query": `${this.getLangPrefix()} ${question}`,
      "lang": this.lang,
    } as any;
    
    const resp = await firstValueFrom(this.http.post<ChatResponse>(`${this.apiUrl}/hyde`, payload)).catch(e => {
      console.error(e)
      return {
        response: "Ugh...something went wrong.. :/",
      }
    });
    return resp.response
  }


  public queryStream(query: string) {
    const headers = { 'Content-Type': 'application/json' };
    const body = JSON.stringify({ query });
    return this.http.post(`${this.apiUrl}/stream`, body, { headers, responseType: 'text', observe: 'body' });
  }
  
  public streamData(query: string): Observable<string> {
    return new Observable(observer => {
      const eventSource = new EventSource(`${this.apiUrl}/stream`);
      eventSource.onmessage = event => {
        observer.next(event.data);
      };
      eventSource.onerror = error => {
        observer.error(error);
        eventSource.close();
      };
      return () => eventSource.close();
    });
  }
  
  getLangPrefix() {
    if (this.lang == 'sl') return "Sem študent. Ti si zaposlen v študentskem referatu. Odgovori na moje vporašanje v slovenščini: "
    return "I am a student. You work in the student's office. Answer my question and don't make stuff up: "
  }


}

