import { Paciente } from "../paciente/paciente";
import { Medicamento } from "../medicamento/medicamento";
import { Repartidor } from "../repartidor/repartidor";

export class Pedido {
    _id: string;
    numero: Number;
    estado: string;
    hora: Date;
    cadenaFrio: string;
    horaString:string;
    
    pac:Paciente;    
    medica: Medicamento;
    repartidor:Repartidor;
    repaApe:string;

    pacApe:string;
    pacDir:string;
    medicaNom:string;

   
}
