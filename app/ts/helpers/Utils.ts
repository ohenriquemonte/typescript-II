export function imprime(...objetos: any[]) {
    objetos.forEach(objeto => objeto.paraTexto());
}