import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { QueryObject } from '../models/evaluation.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EvalService {
  
  private apiUrl = environment.evalApiUrl;
  
  constructor(
    private http: HttpClient,
  ) { }

  public getNext(): Observable<QueryObject> {
    return this.http.get<QueryObject>(`${this.apiUrl}/next`);
  }

  public submit(id: string, good_hits: number, good_answer: boolean) {
    const payload = {
      id: id,
      good_hits: good_hits,
      good_answer: good_answer,
    } as any;
    return this.http.post<any>(`${this.apiUrl}/submit`, payload);
  }
}
