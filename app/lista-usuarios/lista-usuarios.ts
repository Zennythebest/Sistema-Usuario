import { DatePipe } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioModel } from '../models/usuario.model';
import { UsuarioService } from '../services/usuario.service';

@Component({
  selector: 'app-lista-usuarios',
  imports: [DatePipe],
  templateUrl: './lista-usuarios.html',
  styleUrl: './lista-usuarios.css',
})
export class ListaUsuarios implements OnInit {
  private usuarioService = inject(UsuarioService);
  private router = inject(Router);

  usuarios: UsuarioModel[] = [];

  ngOnInit(): void {
    this.carregarUsuarios();
  }

  carregarUsuarios(): void {
    this.usuarioService.get().subscribe({
      next: (usuarios) => {
        this.usuarios = usuarios;
      },
      error: (erro) => {
        console.log("Erro ao buscar usuários: " + erro);
        alert("Erro ao buscar usuários");
      }
    });
  }

  editar(id: number): void {
    this.router.navigate(['/usuarios/editar', id]);
  }

  excluir(id: number): void {
    const confirmado = confirm("Tem certeza que deseja excluir este usuário?");
    if (!confirmado) return;

    this.usuarioService.delete(id).subscribe({
      next: () => {
        this.carregarUsuarios();
      },
      error: (erro) => {
        console.log("Erro ao excluir usuário: " + erro);
        alert("Erro ao excluir usuário.");
      }
    });
  }
}
