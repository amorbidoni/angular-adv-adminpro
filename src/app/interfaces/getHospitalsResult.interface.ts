import { Hospital } from '../models/hospital.model';
export interface HospitalResult {
    ok: boolean;
    total: number;
    hospitales: Hospital[];
  }
  