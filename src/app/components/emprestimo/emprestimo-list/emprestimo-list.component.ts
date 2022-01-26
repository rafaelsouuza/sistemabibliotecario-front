import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Emprestimo } from 'src/app/models/emprestimo';
import { EmprestimoService } from 'src/app/services/emprestimo.service';

@Component({
  selector: 'app-emprestimo-list',
  templateUrl: './emprestimo-list.component.html',
  styleUrls: ['./emprestimo-list.component.css']
})
export class EmprestimoListComponent implements OnInit {

  ELEMENT_DATA: Emprestimo[] = []
  FILTERED_DATA: Emprestimo[] = []

  displayedColumns: string[] = ['id', 'qtd', 'cliente', 'livro', 'dataEmprestimo', 'dataDevolucao', 'status', 'acoes'];
  dataSource = new MatTableDataSource<Emprestimo>(this.ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private service: EmprestimoService
  ) { }

  ngOnInit(): void {
    this.findAll();
  }

  findAll(): void {
    this.service.findAll().subscribe(resposta => {
      this.ELEMENT_DATA = resposta;
      this.dataSource = new MatTableDataSource<Emprestimo>(resposta);
     this.dataSource.paginator = this.paginator;
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
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

   orderByStatus(status: any): void {
     let list: Emprestimo[] = []
     this.ELEMENT_DATA.forEach(element => {
       if(element.status == status) {
         list.push(element)
       }
     });
     this.FILTERED_DATA = list;
     this.dataSource = new MatTableDataSource<Emprestimo>(list);
     this.dataSource.paginator = this.paginator;
   }
}
