import { Pedido } from "../pedido/pedido";

export class HistorialPedidos{

    _id: string;
    estadoNuevo: string;
    horaCambio: Date;
    horaCambioString:string;
    pedidoViejo: Pedido;

}