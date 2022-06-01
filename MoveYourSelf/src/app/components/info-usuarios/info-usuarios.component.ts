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



  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
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
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
  { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
  { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
  { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
  { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
  { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
];
