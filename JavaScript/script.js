let quantidadeCartas
let imagens = [
    "bobrossparrot.gif",
    "explodyparrot.gif",
    "fiestaparrot.gif",
    "metalparrot.gif",
    "revertitparrot.gif",
    "tripletsparrot.gif",
    "unicornparrot.gif"]
imagens.sort(embaralhar)
let cartas = []

function quantasCartas() {
    quantidadeCartas = prompt("Quantas cartas irá jogar?")
    if (quantidadeCartas % 2 !== 0 || quantidadeCartas > 14 || quantidadeCartas < 4) {
        quantasCartas()
    } else {
        disporCartas()
    }
} quantasCartas()

function disporCartas() {
    let jogo = document.querySelector(".jogo")
    for (let i = 0; i < (quantidadeCartas / 2); i++) {
        cartas.push(`
            <div class="carta" onclick="virar(this)">
                <img src="Imagens/front.png" alt="">
                <img src="Imagens/${imagens[i]}" class="verso" alt="">
            </div>`)
        cartas.push(`
            <div class="carta" onclick="virar(this)">
                <img src="Imagens/front.png" alt="">
                <img src="Imagens/${imagens[i]}" class="verso" alt="">
            </div>`)
        cartas.sort(embaralhar)    
    }
    cartas.sort(embaralhar)
    for (let i = 0; i < cartas.length; i++) {
        jogo.innerHTML += `${cartas[i]}`
    }
}

function embaralhar() {
    return Math.random() - 0.5;
  }