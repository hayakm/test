import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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
  @Input() Login = true;
  @Input() Cadastro = false;

  public usuarios: IUsuario[] = [];
  public usuarioLogado: any;

  formCadastro = this._fb.group({
    nome: ['', Validators.required],
    cpf: ['', Validators.required],
    dataNasc: ['', Validators.required],
    endereco: ['', Validators.required],
    genero: ['', Validators.required],
    senha: ['', Validators.required],
    email: ['', Validators.required],
    telefone: [''],
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
    this.buscarUsuarios();
  }

  public buscarUsuarios() {
    this._service.buscarUsuarios().subscribe(usuarios => {
      this.usuarios = usuarios
      // need review
      // if(this.usuarioLogado)
      // this.usuarioLogado = usuarios.find(x => x.nome == this.usuarioLogado.nome && x.senha == this.usuarioLogado.senha)
    })
  }

  limparCampos() {
    this.formCadastro.reset();
  }

  login(data: IUsuario) {
    this._service.buscarUsuarios().subscribe(usuarios => {

      this.usuarioLogado = usuarios.find(x => x.nome == data.nome && x.senha == data.senha)

      if (this.usuarioLogado) {
        this.Cadastro = !this.Cadastro
        this.Login = !this.Login

        return this._toastr.success(`Bem vindo - ${data.nome}!`)
      }
      return this._toastr.error(`Oops, dados incorretos!`)
    })
  }

  public async Cadastrar(data: IUsuario) {
    data.role = 'User';

    try {
      this._service.cadastrarUsuario(data).subscribe(success => {
        this._toastr.success('Cadastrado com sucesso!')
        this.limparCampos()
      })
    } catch (err) {
      this._toastr.error('Erro ao cadastrar usuario')
    }

    await this._service.buscarUsuarios().subscribe(x => { this.usuarios = x });
  }

  public setCadastroView() {
    this.Cadastro = !this.Cadastro
    this.Login = !this.Login
  }
}