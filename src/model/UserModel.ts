import bcrypt from 'bcrypt';
import validator from 'validator';
import db from '../database/connection';

interface Params {
  name?: string;
  lastname?: string;
  email?: string;
  password?: string;
}


class UserModel {
  public errors: string[];

  constructor() {
    this.errors = [];
  }

  async register(args: Params): Promise<string | void> {
    try {

      this.errors = [];
      
      const { email, lastname, name, password } = args;
    
      this.emailIsValide(email);
      this.nameIsValide(name);
      this.lastIsValide(lastname);
      this.validateIsPassword(password);

      if (this.errors.length > 0) return;


      const hashPassword = await this.encriptyPassword(password);

      await db('users').insert({
        email,
        name,
        lastname,
        password: hashPassword,

      });

    } catch (e) {
      if (e.constraint === 'users_email_unique') {
        this.errors.push('O e-mail informado já existe');
        return;
      }

      this.errors.push('Não foi possível realizar o cadastro :(');
    }
    
  }

  nameIsValide(name: string = ''): void {
    if (!name) {
      this.errors.push('O campo nome não pode estar vazio');
      return;
    } 

    if (name.length > 20 || name.length < 3) this.errors.push('O campo nome precisa ter 20 e 3 caracteres');
  } 

  lastIsValide(lastname: string = ''): void {
    if (!lastname) {
      this.errors.push('O campo sobrenome não pode estar vazio')
      return;
    }

    if (lastname.length > 20 || lastname.length < 3) this.errors.push('O campo sobrenome precisa ter 20 e 3 caracteres');
  }
  
  emailIsValide(email: string | undefined): void {
    if (!validator.isEmail(email || '')) this.errors.push('E-mail inválido'); 
  }

  validateIsPassword(password: string = ''): void {
    if (!password) {
      this.errors.push('O campo senha não pode estar vazio');
      return;
    }

    if (password.length > 15 || password.length < 6) this.errors.push('Sua senha precisa ter entre 15 e 6 cacactéres');
  }

  async encriptyPassword(password: string = ''): Promise<string> {

    const hash = await bcrypt.hash(password, 8);

    if(!hash) this.errors.push('Erro ao fazer o hash da senha');

    return hash;
  }
}

export default new UserModel();