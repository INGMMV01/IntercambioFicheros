export class PropiedadesEstado {
    private static clavesDeEstados: string[] = ['estado1', 'estado2', 'estado3'];

    static getClavesDeEstados(): string[] {
        return PropiedadesEstado.clavesDeEstados;
    }
}
