import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Usuario } from '../model/Usuario';
import { UsuarioLogin } from '../model/UsuarioLogin';



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient
  ) { }

  entrar(usuarioLogin:UsuarioLogin): Observable<UsuarioLogin>{

    return this.http.post<UsuarioLogin>('http://localhost:8080/usuarios/logar',usuarioLogin)

  }
  cadastrar(usuarioCadastrar:Usuario):Observable<Usuario>{

    return this.http.post<Usuario>('http://localhost:8080/usuarios/cadastrar',usuarioCadastrar)

  }

  atualizar(user:Usuario):Observable<Usuario>{
      return this.http.put<Usuario>('http://localhost:8080/usuarios/atualizar',user)
  }

  getByIdUser(id:number):Observable<Usuario>{
    return this.http.get<Usuario>(`http://localhost:8080/usuarios/${id}`)
  }
  logado(){
    let ok: boolean= false

    if(environment.token != ''){
      ok = true
    }
    return ok
    
  }
}
