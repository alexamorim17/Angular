import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Postagem } from '../model/Postagem';
import { Tema } from '../model/Tema';
import { Usuario } from '../model/Usuario';
import { AuthService } from '../service/auth.service';
import { PostagemService } from '../service/postagem.service';
import { TemaService } from '../service/tema.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {
  
  tema:Tema = new Tema
  listaTemas:Tema[]
  postagem:Postagem = new Postagem
  listaPostagem:Postagem[]
  
  idTema: number
  idUser = environment.id
  user:Usuario = new Usuario()

  constructor(private router: Router,
    private postagemService: PostagemService,
    private temaService:TemaService,
    private authService:AuthService) { }

  ngOnInit(){
    window.scroll(0,0)
    if(environment.token == ''){
      
      alert('Sua seção expirou,faça o login novamente')
      this.router.navigate(['/entrar'])
      
    }
    this.getAllTemas()
    this.getAllPostagens()
  }

  findByIdUser(){
    this.authService.getByIdUser(this.idUser).subscribe((resp:Usuario)=>
    {
      this.user = resp
    })
  }


  getAllPostagens(){

    this.postagemService.getAllPostagem().subscribe((resp:Postagem[])=>{
      this.listaPostagem = resp
    })
  }
  getAllTemas(){

    this.temaService.getAllTema().subscribe((resp:Tema[]) =>{
        this.listaTemas = resp
    })
    


  }

  findByIdTema(){

    this.temaService.getByIdTema(this.idTema).subscribe((resp:Tema)=>{
      this.tema = resp
    })

  }
  publicar(){

    this.tema.id = this.idTema
    this.postagem.tema = this.tema

    this.user.id = this.idUser
    this.postagem.usuario = this.user

    this.postagemService.postPostagem(this.postagem).subscribe((resp:Postagem) =>{
    this.postagem = resp
    alert('Postagem realizada com sucesso!')})

    this.getAllPostagens()
    
  }

}
