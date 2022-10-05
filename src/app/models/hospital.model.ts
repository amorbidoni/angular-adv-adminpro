import { environment } from '../../environments/environment.prod';
const baseUrl = environment.base_url;
interface _hospitalUser{
    _id:string,
    nombre:string,
    imagen:string,
}
export class Hospital{
    constructor(
            public nombre: string,
            public _id?: string,
            public usuario?: _hospitalUser,
            public img?: string
    ){}
}

