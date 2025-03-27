
export const formatarParaBRL = (numero) => {
    return Number(numero).toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    })

}
 
