import { Injectable, inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environments";
import { CadastroModel } from "../models/cadastro.model";
import { firstValueFrom, Observable } from "rxjs";
import { LoginModel, LoginResponseModel } from "../models/login.model";

@Injectable({ providedIn: 'root' })
export class AuthService{
    private http = inject(HttpClient);
    private url = environment.apiContatos;

    async post(cadastro: CadastroModel){
        const urlPost = this.url + "auth/register";
        const res = await firstValueFrom(this.http.post(urlPost, cadastro, { observe: 'response'}));
        const status = res.status;

        if(status != 200 && status != 201)
            throw new Error("Falha ao criar usuario.");
    }

    login(dadosLogin: LoginModel): Observable<LoginResponseModel>{
        return this.http.post<LoginResponseModel>(`${this.url}auth/login`, dadosLogin);
    }

    salvarTokenLocalStorage(token: string): void{
        localStorage.setItem('acess_token', token);
    }

    salvarTokenSessionStorage(token: string): void {
        sessionStorage.setItem('acess_token', token);
    }

    salvarTokenCookie(token: string): void{
        document.cookie = `acess_token=${token}; path=/`;
    }

    buscarToken(): string | null {
        const tokenLocalStorage = localStorage.getItem('acess_token');
        if(tokenLocalStorage){
            return tokenLocalStorage;
        }

        const tokenSessionStorage = sessionStorage.getItem('acess_token');
        if(tokenSessionStorage)
            return tokenSessionStorage;

        const cookies = document.cookie.split(';')
        for(const cookie of cookies){
            const [nome, valor] = cookie.trim().split('=');

            if(nome === 'acess_token'){
                return valor;
            }
        }

        return null;
    }

    usuarioEstaLogado(): boolean{
        return this.buscarToken() !== null;
    }

    logout(): void{
        localStorage.removeItem('acess_token');
        sessionStorage.removeItem('acess_token');
        document.cookie = 'acess_token=; Max-Age=0; path=/';
    }
}
