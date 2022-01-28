import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Cliente } from 'src/app/models/cliente';
import { Emprestimo } from 'src/app/models/emprestimo';
import { Livro } from 'src/app/models/livro';
import { ClienteService } from 'src/app/services/cliente.service';
import { EmprestimoService } from 'src/app/services/emprestimo.service';
import { LivroService } from 'src/app/services/livro.service';

@Component({
  selector: 'app-emprestimo-update',
  templateUrl: './emprestimo-update.component.html',
  styleUrls: ['./emprestimo-update.component.css']
})
export class EmprestimoUpdateComponent implements OnInit {

  emprestimo: Emprestimo = {
    status: '',
    cliente: '',
    livro: '',
    nomeCliente: '',
    nomeLivro: '',
  }

  clientes: Cliente[] = []
  livros: Livro[] = []

  status: FormControl = new FormControl(null, [Validators.required]);
  cliente: FormControl = new FormControl(null, [Validators.required]);
  livro: FormControl = new FormControl(null, [Validators.required]);

  constructor(
    private emprestimoService: EmprestimoService,
    private clienteService: ClienteService,
    private livroService: LivroService,
    private toastService: ToastrService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.findAllClientes();
    this.findAllLivros();
  }

  create(): void {
    this.emprestimoService.create(this.emprestimo).subscribe(resposta => {
      this.toastService.success('Empréstimo criado com sucesso', 'Novo Empréstimo');
      this.router.navigate(['emprestimos']);
    }, ex => {
      this.toastService.error(ex.error.error);
    })
  }

  findAllClientes(): void {
    this.clienteService.findall().subscribe(resposta => {
      this.clientes = resposta;
    })
  }

  findAllLivros(): void {
    this.livroService.findall().subscribe(resposta => {
      this.livros = resposta;
    })
  }

  validarCampos(): boolean {
    return this.status.valid && this.cliente.valid && this.livro.valid
  }

}
