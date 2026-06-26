import { UsuarioModel } from "../models/usuario.model";
import { Injectable, inject } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "../../environments/environments";
import { Observable } from "rxjs";
import { AuthService } from "./auth.service";

@Injectable({ providedIn: 'root' })
export class UsuarioService {
    private http = inject(HttpClient);
    private url = environment.apiContatos;
    private authService = inject(AuthService);

    private getHeaders(): HttpHeaders {
        const token = this.authService.buscarToken();
        return new HttpHeaders({ Authorization: "Bearer " + token });
    }

    get(): Observable<UsuarioModel[]> {
        return this.http.get<UsuarioModel[]>(this.url + "usuarios", { headers: this.getHeaders() });
    }

    getById(id: number): Observable<UsuarioModel> {
        return this.http.get<UsuarioModel>(this.url + "usuarios/" + id, { headers: this.getHeaders() });
    }

    update(id: number, usuario: UsuarioModel): Observable<UsuarioModel> {
        return this.http.put<UsuarioModel>(this.url + "usuarios/" + id, usuario, { headers: this.getHeaders() });
    }

    delete(id: number): Observable<void> {
        return this.http.delete<void>(this.url + "usuarios/" + id, { headers: this.getHeaders() });
    }
}
