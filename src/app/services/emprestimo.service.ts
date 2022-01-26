import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_CONFIG } from '../config/api.config';
import { Emprestimo } from '../models/emprestimo';

@Injectable({
  providedIn: 'root'
})
export class EmprestimoService {

  constructor(private http: HttpClient) { }

  findAll(): Observable<Emprestimo[]> {
    return this.http.get<Emprestimo[]>(`${API_CONFIG.baseUrl}/emprestimos`);
  }

}


