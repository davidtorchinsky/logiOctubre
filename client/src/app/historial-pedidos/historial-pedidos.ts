import { Pedido } from "../pedido/pedido";
import { Paciente } from "../paciente/paciente";
import { Medicamento } from "../medicamento/medicamento";

export class HistorialPedidos{

    _id: string;
    estadoNuevo: string;
    hora: Date;
    horaCambioString:string;
    pedidoViejo: Pedido;
    pacApe:String;
    pacDire:String;
    repaApe:String;
    medicaNom:String;

    pac:Paciente;
    medica:Medicamento;



}