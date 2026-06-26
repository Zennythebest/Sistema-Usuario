import { Component, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { CadastroModel } from '../models/cadastro.model';
import { AuthService } from '../services/auth.service';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [CommonModule,
          FormsModule,
          ReactiveFormsModule, RouterLink],
  templateUrl: './cadastro.html',
  styleUrl: './cadastro.css',
})
export class Cadastro {
  private authService = inject(AuthService);
  private router = inject(Router);

  //construindo um formulário
  form = new FormGroup({
    nome : new FormControl('', [Validators.required]), //campo 'nome'
    email : new FormControl('', [Validators.required]), //campo 'email'
    senha : new FormControl('', [Validators.required]), //campo 'senha'
  });

  async onSubmit() {
    if (this.form.valid) {

      const request: CadastroModel = {
        nome: this.form.get('nome')?.value ?? '',
        email: this.form.get('email')?.value ?? '',
        senha: this.form.get('senha')?.value ?? ''
      };

      await this.authService.post(request);
      alert("Usuário cadastrado com sucesso.");
      this.router.navigate(['']);
    } else {
      alert("Formulário Inválido.");
    }
  }
}
