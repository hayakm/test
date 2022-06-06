import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IUsuario } from 'src/interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class DbService {
  private readonly _base = 'https://move-your-self-server.herokuapp.com';
  constructor(private httpClient: HttpClient) { }

  public cadastrarUsuario(usuario: IUsuario): Observable<IUsuario> {
    return this.httpClient.post<IUsuario>(`${this._base}/Usuarios`, usuario);
  }

  public buscarUsuarios(): Observable<IUsuario[]> {
    return this.httpClient.get<IUsuario[]>(`${this._base}/Usuarios`);
  }
}
