import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DbService } from 'src/app/service/db.service';

@Component({
  selector: 'app-info-usuarios',
  templateUrl: './info-usuarios.component.html',
  styleUrls: ['./info-usuarios.component.css']
})
export class InfoUsuariosComponent implements OnInit {
  pagamento: FormGroup;
  formasPagamento: FormGroup;
  id: any;
  usuarioLogado: any;

  constructor(
    private _fb: FormBuilder,
    private _service: DbService,
    private _activatedRoute: ActivatedRoute,
    private _router: Router

  ) {
    this.pagamento = this._fb.group({
      pgDia: false,
      pgAtraso: false,
    });

    this.formasPagamento = this._fb.group({
      dinheiro: false,
      pix: false,
      cartao: false,
    });
  }



  displayedColumns: string[] = ['info', 'bio', 'ideal', 'meta'];
  dataSource = ELEMENT_DATA;

  ngOnInit(): void {
    this._activatedRoute.params.subscribe(res => this.id = res['id']);
    this.getUsuarios(this.id);
  }


  public async getUsuarios(id: any) {
    await this._service.buscarUsuarios().subscribe(x => {
      this.usuarioLogado = x.find(u => u.id == id);
    })
  }

  public returnToLogin(){
    this._router.navigateByUrl(`/login`);
  }
}

export interface PeriodicElement {
  info: string;
  bio: string;
  ideal: string;
  meta: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { info: "Peso", bio: "Em Kg", ideal: "Em Kg", meta: "Em Kg" },
  { info: "Gordura", bio: "Em %", ideal: "Em %", meta: "Em %" },
  { info: "Massa Adiposa", bio: "Em Kg", ideal: "Em Kg", meta: "Em Kg" },
  { info: "FFM", bio: "Em Kg", ideal: "Em Kg", meta: "Em Kg" },
  { info: "Massa Muscular", bio: "Em Kg", ideal: "Em Kg", meta: "Em Kg" },
  { info: "IMC", bio: "Em IMC", ideal: "Em IMC", meta: "Em IMC" },
  { info: "Idade Metabólica", bio: "Em Anos", ideal: "Em Anos", meta: "Em Anos" }
];
