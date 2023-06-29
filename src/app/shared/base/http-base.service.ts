import { HttpClient } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpBaseService {

  public readonly httpClient!: HttpClient;

  private apiBase = 'http://localhost:3000/';

  constructor(protected readonly injector: Injector) {
    if(injector == null || injector == undefined){
      throw new Error('Injector não pode ser nulo');
    }

    this.httpClient = injector.get(HttpClient);
  }

  public httpGet(endpoint: string): Observable<any>{
    return this.httpClient.get(`${this.apiBase}${endpoint}`);
  }

  public httpPost(endpoint: string, dados: any): Observable<any>{
    return this.httpClient.post(`${this.apiBase}${endpoint}`, dados);
  }

  public httpPut(endpoint: string, dados: any): Observable<any>{
    return this.httpClient.put(`${this.apiBase}${endpoint}`, dados);
  }

  public httpDelete(endpoint: string): Observable<any>{
    return this.httpClient.delete(`${this.apiBase}${endpoint}`);
  }
}