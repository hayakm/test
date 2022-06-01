import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { DbService } from 'src/app/service/db.service';
import { IUsuario } from 'src/interfaces/interfaces';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  @Input() Login = false;
  @Input() Cadastro = true;

  formCadastro = this._fb.group({
    nome: ['', Validators.required],
    cPF: ['', Validators.required],
    dataNasc: ['', Validators.required],
    endereco: ['', Validators.required],
    genero: ['', Validators.required],
    senha: ['', Validators.required],
    email: ['', Validators.required],
    telefone: ['']
  })

  formLogin = this._fb.group({
    nome: ['', Validators.required],
    senha: ['', Validators.required],
  })

  constructor(
    private _fb: FormBuilder,
    private _service: DbService,
    private _toastr: ToastrService
  ) { }

  ngOnInit(): void {
  }

  limparCampos() {
    this.formCadastro.reset();
  }

  login(data: IUsuario) {
    this._service.buscarUsuarios().subscribe(usuarios => {

      var ok = usuarios.find(x => x.nome == data.nome && x.senha == data.senha)

      debugger
      if (ok) {
        this.Cadastro = !this.Cadastro
        this.Login = !this.Login
        return this._toastr.success(`Bem vindo - ${data.nome}!`)
      }
      return this._toastr.error(`Oops, dados incorretos!`)
    })
  }

  public async Cadastrar(data: IUsuario) {
    try {
      this._service.cadastrarUsuario(data).subscribe(success => {
        this._toastr.success('Cadastrado com sucesso!')
        this.limparCampos()
      })
    } catch (err) {
      this._toastr.error('Erro ao cadastrar usuario')
    }

    await this._service.buscarUsuarios().subscribe(usuarios => { console.log(usuarios, 'usuarios') });
  }
}