import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable, Inject } from '@angular/core';
import { share } from 'rxjs/operators';

@Injectable()
export class StudentService {
  public endpoint = '/api/v1/alumno';
  public baseURL =  '';
  constructor(protected http: HttpClient, @Inject('BASE_API_URL') protected _baseURL: string) {
    this.baseURL = _baseURL;
  }
  get(): Observable<any> {
    return this.http.get( this.baseURL + this.endpoint ).pipe(share());
  }
  post(payload: any): Observable<any> {
    return this.http.post(this.baseURL + this.endpoint , payload).pipe(share());
  }
  put(payload: any): Observable<any> {
    return this.http.put(this.baseURL + this.endpoint , payload ).pipe(share());
  }
  delete(id: string): Observable<any> {
    return this.http.delete(this.baseURL + this.endpoint + '/' + id).pipe(share());
  }
}