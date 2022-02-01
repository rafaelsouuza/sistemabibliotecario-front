import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Livro } from 'src/app/models/livro';
import { LivroService } from 'src/app/services/livro.service';

@Component({
  selector: 'app-livro-update',
  templateUrl: './livro-update.component.html',
  styleUrls: ['./livro-update.component.css']
})
export class LivroUpdateComponent implements OnInit {

  livro: Livro = {
    id: '',
    titulo: '',
    autor: '',
    isbn: '',
    editora: '',
    assunto: '',
    anoLancamento: ''
  }

  titulo: FormControl = new FormControl(null, Validators.minLength(5));
  autor: FormControl = new FormControl(null, Validators.minLength(5));
  isbn: FormControl = new FormControl(null, Validators.required);
  editora: FormControl = new FormControl(null, Validators.minLength(5));
  anoLancamento: FormControl = new FormControl(null, Validators.maxLength(4));

  constructor(
    private service: LivroService,
    private toast: ToastrService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.livro.id = this.route.snapshot.paramMap.get('id');
    this.findById();
   }

   findById(): void {
     this.service.findById(this.livro.id).subscribe(resposta => {
      this.livro = resposta;
     })
   }

  update(): void {
    this.service.update(this.livro).subscribe( () => {
      this.toast.success('Livro atualizado com sucesso!', 'Atualizado');
      this.router.navigate(['livros'])
    }, ex => {
      if(ex.error.errors) {
        ex.error.errors.forEach(element => {
          this.toast.error(element.message);
        });
      } else {
        this.toast.error(ex.error.message);
      }
    })
  }

  validarCampos(): boolean {
    return this.titulo.valid && this.autor.valid && this.editora.valid 
           && this.anoLancamento.valid && this.isbn.valid 
  }

}
