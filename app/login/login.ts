import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { LoginModel } from '../models/login.model';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  private formBuilder = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  formularioLogin = this.formBuilder.group({
    email: ['', Validators.required],
    senha: ['', Validators.required]
  });

  mensagemErro = '';

  realizarLogin(): void {
    if(this.formularioLogin.invalid){
      this.mensagemErro = 'Preencha todos os campos.';
    }

    const dadosLogin = this.formularioLogin.value as LoginModel;

    this.authService.login(dadosLogin).subscribe({
      next: (resposta) => {
        const token = resposta.token;
        this.authService.salvarTokenCookie(token);
        this.router.navigate(['/lista-usuarios']);
      },
      error: (erro) => {
        console.error(erro);
        this.mensagemErro = 'Email ou senha inválidos.';
      }
    });
  }
}
