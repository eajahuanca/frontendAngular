import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Plato } from '../app/modelo/plato.model';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
    //private url: string = 'http://localhost:8000/api/plato/plato/';
    private url: string = 'api/plato/plato/';

    constructor(private http: HttpClient) {}

    public getPlatos(): Observable<Plato[]>{
      return this.http.get<Plato[]>(this.url);
    }

    public postPlato(data: Plato): Observable<Plato>{
      return this.http.post<Plato>(this.url, data);
    }

    public putPlato(data: Plato, pk: number): Observable<Plato>{
      return this.http.put<Plato>(`${this.url}${pk}/`, data);
    }

    public deletePlato(pk: number): Observable<Plato>{
      return this.http.delete<Plato>(`${this.url}${pk}/`);
    }
}

