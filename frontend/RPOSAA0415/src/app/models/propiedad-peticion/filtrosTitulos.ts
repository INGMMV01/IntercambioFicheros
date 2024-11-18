import { IFiltros } from './Filtros';

export const filtrosTitulos: { [key in keyof IFiltros]: string } = {
    clave: 'Clave',
    nombre: 'Nombre',
    valor: 'Valor',
    fechaDeModificacion: 'Fecha de Modificación'
};
