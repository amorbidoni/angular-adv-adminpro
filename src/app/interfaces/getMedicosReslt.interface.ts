import { Medico } from '../models/medico.model';
export interface MedicosResult {
    ok:boolean,
    medicos:Medico[],
    total:number
}