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
function embaralhar() {
    return Math.random() - 0.5;
}

let cartas = []

function quantasCartas() {
    quantidadeCartas = prompt("Quantas cartas irá jogar? OBS: Número entre 4 e 14")
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
                <img src="Imagens/${imagens[i]}" class="esconder" alt="">
            </div>`)
        cartas.push(`
            <div class="carta" onclick="virar(this)">
                <img src="Imagens/front.png" alt="">
                <img src="Imagens/${imagens[i]}" class="esconder" alt="">
            </div>`)
        cartas.sort(embaralhar)    
    }
    cartas.sort(embaralhar)
    for (let i = 0; i < cartas.length; i++) {
        jogo.innerHTML += `${cartas[i]}`
    }
}

let cartasViradas = 0
let tipoCartas = []
let rodadas = 0

function virar(carta) {
    rodadas += 1
    let capa = carta.children[0]
    capa.classList.add("esconder")
    let gif = carta.children[1]
    gif.classList.remove("esconder")

    tipoCartas.push(gif)
    
    cartasViradas += 1
    console.log(cartasViradas)
    if (cartasViradas === 2) {
        verificarPar()
    }
}

let pai
let filho
let pontos = 0

function verificarPar() {
    if (tipoCartas[0].src === tipoCartas[1].src) {
        cartasViradas = 0
        tipoCartas = []
        pontos += 1

        verificarVitoria()
    } else {
        setTimeout(naoEhPar, 1000)
    }
}
function naoEhPar() {
    tipoCartas[0].classList.add("esconder")
    pai = tipoCartas[0].parentNode
    filho = pai.children[0]
    filho.classList.remove("esconder")
    tipoCartas[1].classList.add("esconder")
    pai = tipoCartas[1].parentNode
    filho = pai.children[0]
    filho.classList.remove("esconder")
    
    cartasViradas = 0
    tipoCartas = []
}

function verificarVitoria() {
    if (pontos === (quantidadeCartas / 2)) {
        let mensagem = `Parabéns, você ganhou em ${rodadas} rodadas`
        alert(mensagem)
    }
}