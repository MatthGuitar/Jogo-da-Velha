const classeX = 'x'
const classeCirculo = 'circulo'
const vitoria =[
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [0, 4, 8]
]
let turnoCirculo
const tabuleiro = document.getElementById('tabuleiro')
const campoElement = document.querySelectorAll('[data-campo]')
const fimElement = document.querySelector('.fim')
const mensagemDeVitoria = document.querySelector('[data-fim]')
const reiniciar = document.getElementById('reiniciar')

console.log(fimElement)
comecarJogo()

reiniciar.addEventListener('click', comecarJogo)
function comecarJogo(){
    turnoCirculo = false
    campoElement.forEach(campo => {
        campo.classList.remove(classeX)
        campo.classList.remove(classeCirculo)
        campo.removeEventListener('click', handleClick)
        campo.addEventListener('click', handleClick, {once: true})
    })
    definirTabuleiroHoverClass()
    fimElement.classList.remove('exibir')
}


function handleClick(e) {
    const campo = e.target
    const classeAtual = turnoCirculo ? classeCirculo : classeX
    colocarMarca(campo, classeAtual)
    if(verificarVitoria(classeAtual)) {
        terminarJogo(false)
    } else if (foiEmpate()) {
        terminarJogo(true)
    } else {
        trocarTurnos()
        definirTabuleiroHoverClass()
    }
}

function terminarJogo(empate){
    if (empate){
        mensagemDeVitoria.innerText = 'Empate!!'
    }else {
        mensagemDeVitoria.innerText = `${turnoCirculo ? 'O': 'X'} Venceu!!`
    }
    fimElement.classList.add('exibir')
}

function foiEmpate(){
    return [...campoElement].every( campo => {
        return campo.classList.contains(classeX) || campo.classList.contains(classeCirculo)
    })
}

function colocarMarca( campo, classeAtual){
    campo.classList.add(classeAtual)
}

function trocarTurnos(){
    turnoCirculo = !turnoCirculo
}
 function definirTabuleiroHoverClass() {
     tabuleiro.classList.remove(classeX)
     tabuleiro.classList.remove(classeCirculo)
     if(turnoCirculo){
         tabuleiro.classList.add(classeCirculo)
     } else{
         tabuleiro.classList.add(classeX)
     }

 }
 function verificarVitoria(classeAtual){
     return vitoria.some(combinacoes =>{
         return combinacoes.every(index => {
             return campoElement[index].classList.contains(classeAtual)
         })
     })
 }