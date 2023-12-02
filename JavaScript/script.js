let quantidadeCartas = 0
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

let cartas
let cartasViradas
let tipoCartas
let rodadas
let cronometro

function quantasCartas() {
    quantidadeCartas = prompt("Quantas cartas irá jogar? OBS: Número entre 4 e 14")
    if (quantidadeCartas % 2 !== 0 || quantidadeCartas > 14 || quantidadeCartas < 4) {
        quantasCartas()
    } else {
        cartas = []
        cartasViradas = 0
        tipoCartas = []
        rodadas = 0
        disporCartas()
    }
} quantasCartas()

function disporCartas() {
    let jogo = document.querySelector(".jogo")
    jogo.innerHTML = "";
    for (let i = 0; i < (quantidadeCartas / 2); i++) {
        cartas.push(`
            <div class="carta" data-identifier="card" onclick="virar(this)">
                <img src="Imagens/front.png" data-identifier="back-face" alt="">
                <img src="Imagens/${imagens[i]}" class="esconder" data-identifier="front-face" alt="">
            </div>`)
        cartas.push(`
            <div class="carta" data-identifier="card" onclick="virar(this)">
                <img src="Imagens/front.png" data-identifier="back-face" alt="">
                <img src="Imagens/${imagens[i]}" class="esconder" data-identifier="front-face" alt="">
            </div>`)
        cartas.sort(embaralhar)    
    }
    cartas.sort(embaralhar)
    for (let i = 0; i < cartas.length; i++) {
        jogo.innerHTML += `${cartas[i]}`
    }

    iniciarTempo();
}

function iniciarTempo(){
    tempoTotalSegundos = 0;
    let tempo = document.querySelector(".tempo");

    cronometro = setInterval(() => {
        tempoTotalSegundos++;
        const minutos = Math.floor(tempoTotalSegundos / 60);
        const segundos = tempoTotalSegundos % 60;

        const formatoMinutos = minutos < 10 ? `0${minutos}` : minutos;
        const formatoSegundos = segundos < 10 ? `0${segundos}` : segundos;

        tempo.innerHTML = `${formatoMinutos}:${formatoSegundos}`;
    }, 1000)
}

function virar(carta) {
    if (cartasViradas == 2){
        return
    }

    let capa = carta.children[0]
    capa.classList.add("esconder")
    let gif = carta.children[1]
    gif.classList.remove("esconder")
    
    tipoCartas.push(gif)
    
    cartasViradas += 1
    if (cartasViradas === 1) {
        carta.removeAttribute("onclick")
    } else if (cartasViradas === 2) {
        let pai = tipoCartas[0].parentNode
        pai.setAttribute("onclick", "virar(this)")
        console.log(pai)
        verificarPar()
    }
}

let pai
let filho
let pontos = 0

function verificarPar() {
    rodadas += 1

    if (tipoCartas[0].src === tipoCartas[1].src) {
        cartasViradas = 0
        tipoCartas = []
        pontos += 1

        setTimeout(verificarVitoria, 100)
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
        let tempo = document.querySelector(".tempo");
        let mensagem = `Parabéns, você ganhou em ${rodadas} rodadas e seu tempo foi de: ${tempo.innerHTML}`
        alert(mensagem)

        clearInterval(cronometro)
        reiniciarJogo()    
    }
}

function reiniciarJogo(){
    let reiniciar = prompt("Você deseja jogar novamente? Clique em OK")
    console.log(reiniciar)
    if (reiniciar !== null){
        quantasCartas()
    }
}