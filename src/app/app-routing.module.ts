import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { ClienteCreateComponent } from './components/cliente/cliente-create/cliente-create.component';
import { ClienteDeleteComponent } from './components/cliente/cliente-delete/cliente-delete.component';
import { ClienteListComponent } from './components/cliente/cliente-list/cliente-list.component';
import { ClienteUpdateComponent } from './components/cliente/cliente-update/cliente-update.component';
import { EmprestimoCreateComponent } from './components/emprestimo/emprestimo-create/emprestimo-create.component';
import { EmprestimoListComponent } from './components/emprestimo/emprestimo-list/emprestimo-list.component';
import { EmprestimoReadComponent } from './components/emprestimo/emprestimo-read/emprestimo-read.component';
import { EmprestimoUpdateComponent } from './components/emprestimo/emprestimo-update/emprestimo-update.component';
import { HomeComponent } from './components/home/home.component';
import { LivroCreateComponent } from './components/livro/livro-create/livro-create.component';
import { LivroDeleteComponent } from './components/livro/livro-delete/livro-delete.component';
import { LivroListComponent } from './components/livro/livro-list/livro-list.component';
import { LivroUpdateComponent } from './components/livro/livro-update/livro-update.component';
import { LoginComponent } from './components/login/login.component';
import { NavComponent } from './components/nav/nav.component';
import { UsuarioCreateComponent } from './components/usuario/usuario-create/usuario-create.component';
import { UsuarioDeleteComponent } from './components/usuario/usuario-delete/usuario-delete.component';
import { UsuarioListComponent } from './components/usuario/usuario-list/usuario-list.component';
import { UsuarioUpdateComponent } from './components/usuario/usuario-update/usuario-update.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {
    path: '', component: NavComponent, canActivate: [AuthGuard], children: [
      { path: 'home', component: HomeComponent },

      { path: 'usuarios', component: UsuarioListComponent },
      { path: 'usuarios/create', component: UsuarioCreateComponent },
      { path: 'usuarios/update/:id', component: UsuarioUpdateComponent },
      { path: 'usuarios/delete/:id', component: UsuarioDeleteComponent },

      { path: 'clientes', component: ClienteListComponent },
      { path: 'clientes/create', component: ClienteCreateComponent },
      { path: 'clientes/update/:id', component: ClienteUpdateComponent },
      { path: 'clientes/delete/:id', component: ClienteDeleteComponent },

      { path: 'livros', component: LivroListComponent },
      { path: 'livros/create', component: LivroCreateComponent },
      { path: 'livros/update/:id', component: LivroUpdateComponent },
      { path: 'livros/delete/:id', component: LivroDeleteComponent },

      { path: 'emprestimos', component: EmprestimoListComponent },
      { path: 'emprestimos/create', component: EmprestimoCreateComponent },
      { path: 'emprestimos/update/:id', component: EmprestimoUpdateComponent },
      { path: 'emprestimos/read/:id', component: EmprestimoReadComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
