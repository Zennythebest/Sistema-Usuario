import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UsuarioService } from '../services/usuario.service';
import { UsuarioModel } from '../models/usuario.model';

@Component({
  selector: 'app-editar-usuario',
  imports: [ReactiveFormsModule],
  templateUrl: './editar-usuario.html',
  styleUrl: './editar-usuario.css',
})
export class EditarUsuario implements OnInit {

  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private usuarioService = inject(UsuarioService);

  usuario!: UsuarioModel;
  salvando = false;

  form = new FormGroup({
    nome: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    senha: new FormControl('', Validators.required),
    dataNascimento: new FormControl('', Validators.required),
    rg: new FormControl('', Validators.required),
    cpf: new FormControl('', Validators.required),
  });

  ngOnInit(): void {

    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.usuarioService.getById(id).subscribe({
      next: (usuario) => {

        this.usuario = usuario;

        this.form.patchValue({
          nome: usuario.nome,
          email: usuario.email,
          senha: '',
          dataNascimento: usuario.dataNascimento ?? '',
          rg: usuario.rg,
          cpf: usuario.cpf
        });

      },
      error: (erro) => {
        console.error(erro);
        alert('Erro ao carregar usuário.');
      }
    });

  }

  salvar(): void {

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.salvando = true;

    const atualizado = {
      nome: this.form.value.nome ?? '',
      email: this.form.value.email ?? '',
      senha: this.form.value.senha ?? '',
      dataNascimento: this.form.value.dataNascimento ?? '',
      rg: this.form.value.rg ?? '',
      cpf: this.form.value.cpf ?? ''
    };

    console.log(atualizado);

    this.usuarioService.update(this.usuario.id, atualizado as any).subscribe({
      next: () => {
        alert('Usuário atualizado com sucesso.');
        this.router.navigate(['/lista-usuarios']);
      },
      error: (erro) => {
        console.error(erro);
        alert('Erro ao salvar alterações.');
        this.salvando = false;
      }
    });

  }

  voltar(): void {
    this.router.navigate(['/lista-usuarios']);
  }

}