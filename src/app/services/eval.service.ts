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

  
}
