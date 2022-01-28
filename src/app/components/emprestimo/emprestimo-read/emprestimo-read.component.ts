import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Emprestimo } from 'src/app/models/emprestimo';
import { EmprestimoService } from 'src/app/services/emprestimo.service';

@Component({
  selector: 'app-emprestimo-read',
  templateUrl: './emprestimo-read.component.html',
  styleUrls: ['./emprestimo-read.component.css']
})
export class EmprestimoReadComponent implements OnInit {

  emprestimo: Emprestimo = {
    status: '',
    cliente: '',
    livro: '',
    nomeCliente: '',
    nomeLivro: '',
  }

  constructor(
    private emprestimoService: EmprestimoService,
    private toastService: ToastrService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.emprestimo.id = this.route.snapshot.paramMap.get('id');
    this.findById();
  }

  findById(): void {
    this.emprestimoService.findById(this.emprestimo.id).subscribe(resposta => {
      this.emprestimo = resposta;
    }, ex => {
      this.toastService.error(ex.error.error);
    })
  }

  retornaStatus(status: any): String {
    if(status == '0') {
      return 'EMPRESTADO'
    } else if(status == '1') {
      return 'DEVOLVIDO'
    } else {
      return 'ATRASADO'
    }
   }

}
