let quantidadeCartas

function quantasCartas() {
    quantidadeCartas = prompt("Quantas cartas irá jogar?")
    validarJogo()
}
quantasCartas()

function validarJogo() {
    if (quantidadeCartas % 2 !== 0 || quantidadeCartas > 14) {
        quantasCartas()
    }
}