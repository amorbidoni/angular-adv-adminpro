export interface RegisterForm {
  nombre: string;
  email: string;
  password: string;
  password2: string;
  terms: boolean;
}
export interface LoginForm {
  email: string;
  password: string;
  rememberme: boolean;
}
