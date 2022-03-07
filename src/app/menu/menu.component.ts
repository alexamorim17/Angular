import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  id = environment.id
  nome = environment.nome
  foto = environment.foto
  token = environment.token
  constructor(
    private router:Router,
    private route: ActivatedRoute,
    
    
  ) { }

  ngOnInit(){
    
  }

  sair(){
    this.router.navigate(['/entrar'])
    environment.token = ''
    environment.foto = ''
    environment.nome = ''
    environment.id = 0
  }

}
