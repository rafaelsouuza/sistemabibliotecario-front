import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Cliente } from 'src/app/models/cliente';
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-cliente-update',
  templateUrl: './cliente-update.component.html',
  styleUrls: ['./cliente-update.component.css']
})
export class ClienteUpdateComponent implements OnInit {

  cliente: Cliente = {
    id: '',
    nome: '',
    cpf: '',
    email: '', 
    telefone: '',
    endereco: '',
    cidade: ''
  }

  nome: FormControl = new FormControl(null, Validators.minLength(3));
  cpf: FormControl = new FormControl(null, Validators.required);
  email: FormControl = new FormControl(null, Validators.email);
  telefone: FormControl = new FormControl(null, Validators.required);
  endereco: FormControl = new FormControl(null, Validators.minLength(5));
  cidade: FormControl = new FormControl(null, Validators.minLength(3));

  constructor(
    private service: ClienteService,
    private toast: ToastrService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.cliente.id = this.route.snapshot.paramMap.get('id');
    this.findById();
   }

   findById(): void {
     this.service.findById(this.cliente.id).subscribe(resposta => {
      this.cliente = resposta;
     })
   }

  update(): void {
    this.service.update(this.cliente).subscribe( () => {
      this.toast.success('Cliente atualizado com sucesso!', 'Atualizado');
      this.router.navigate(['clientes'])
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
    return this.nome.valid && this.cpf.valid 
    && this.email.valid && this.telefone.valid
    && this.endereco.valid && this.cidade.valid
  }

}
