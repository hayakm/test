import { Component, Input, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DbService } from 'src/app/service/db.service';
import { IUsuario } from 'src/interfaces/interfaces';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {
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
    private _toastr: ToastrService,
    private _activatedRoute: ActivatedRoute,
    private _router: Router

  ) { }

  ngOnInit(): void {
    this._activatedRoute.params.subscribe(res => {console.log(res)});
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

  public returnToLogin(){
    this._router.navigateByUrl(`/login`);
  }
}
