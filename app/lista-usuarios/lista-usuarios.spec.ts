import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { ListaUsuarios } from './lista-usuarios';
import { UsuarioService } from '../services/usuario.service';

describe('ListaUsuarios', () => {
  let component: ListaUsuarios;
  let fixture: ComponentFixture<ListaUsuarios>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaUsuarios],
      providers: [
        {
          provide: UsuarioService,
          useValue: {
            get: () => of([])
          }
        }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaUsuarios);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
