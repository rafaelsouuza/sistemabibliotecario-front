import { Component, ModuleWithComponentFactories, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Livro } from 'src/app/models/livro';
import { LivroService } from 'src/app/services/livro.service';

@Component({
  selector: 'app-livro-create',
  templateUrl: './livro-create.component.html',
  styleUrls: ['./livro-create.component.css']
})
export class LivroCreateComponent implements OnInit {

  livro: Livro = {
    id: '',
    titulo: '',
    autor: '',
    editora: '',
    assunto: '',
    anoLancamento: new Date(),
    qtd: '',
    dataCadastro: ''
  }

  titulo: FormControl = new FormControl(null, Validators.minLength(5));
  autor: FormControl = new FormControl(null, Validators.minLength(5));
  editora: FormControl = new FormControl(null, Validators.minLength(5));
  //anoLancamento: FormControl = new FormControl(null, Validators.required);
  qtd: FormControl = new FormControl(null, Validators.minLength(1));

  constructor(
    private service: LivroService,
    private toast: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void { }

  create(): void {
    this.formataData();
    this.service.create(this.livro).subscribe(() => {
      this.toast.success('Livro cadastrado com sucesso!', 'Cadastro');
      this.router.navigate(['livros'])
    }, ex => {
      if (ex.error.errors) {
        ex.error.errors.forEach(element => {
          this.toast.error(element.message);
        });
      } else {
        this.toast.error(ex.error.message);
      }
    })
  }

  validarCampos(): boolean {
    return this.titulo.valid && this.autor.valid
      && this.editora.valid && this.qtd.valid
      
  }

  formataData(): void {
    let data = new Date(),
      dia = data.getDate().toString(),
      diaF = (dia.length == 1) ? '0' + dia : dia,
      mes = (data.getMonth() + 1).toString(), //+1 pois no getMonth Janeiro começa com zero.
      mesF = (mes.length == 1) ? '0' + mes : mes,
      anoF = data.getFullYear();
    this.livro.anoLancamento = diaF + "/" + mesF + "/" + anoF;
  }
}
