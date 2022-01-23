import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Livro } from 'src/app/models/livro';
import { LivroService } from 'src/app/services/livro.service';


@Component({
  selector: 'app-livro-delete',
  templateUrl: './livro-delete.component.html',
  styleUrls: ['./livro-delete.component.css']
})
export class LivroDeleteComponent implements OnInit {

  livro: Livro = {
    id: '',
    titulo: '',
    autor: '',
    editora: '', 
    assunto: '',
    anoLancamento: '',
    qtd: '',
    dataCadastro: ''
  }

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

  delete(): void {
    this.service.delete(this.livro.id).subscribe( () => {
      this.toast.success('Livro deletado com sucesso!', 'Deletado');
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

}
