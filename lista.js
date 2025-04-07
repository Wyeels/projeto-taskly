const section = document.querySelector('section#guardaritem')
const span = document.querySelector('section > a > span')
section.style.height = 'min-content'
const menu = document.getElementsByTagName('span')[0]
menu.addEventListener('click', abrir)
const tela = document.getElementsByTagName('div')[0]

const novoitem = document.createElement('button')
novoitem.innerText = 'Criar'
section.appendChild(novoitem)
novoitem.addEventListener('click', criar)

function verificarTamanho() {
    const div = document.querySelector('div')
    if (window.innerWidth >= 800) {
        div.style.display = 'block'
    } else {
        div.style.display = 'none'
    }
}



function verificarLogin() {
    const opccompletas = document.querySelectorAll('input.itens')
    let quantcompletas = 0
    
    Array.from(opccompletas).forEach(oc => {
        if (window.getComputedStyle(oc).textDecoration.includes('line-through')) {
            quantcompletas++
        }
    });
    
    if (quantcompletas >= 10) {
        span.style.backgroundImage = 'linear-gradient(to left, red, blue)'
        span.style.backgroundClip = 'text'
    } else {
        span.style.backgroundImage = 'none'
    }

    const usuario = localStorage.getItem('usuario')

    if (usuario) {
        span.innerHTML = quantcompletas
    }
}


verificarLogin()

function criar() {
    const aparecer = [
        { opacity: '0' },
        { opacity: '100' }
    ]

    const tempo = {
        duration: 600,
        iterations: 1
    }

    const paragrafo = document.createElement('p')
    const caixa = document.createElement('input')
    caixa.setAttribute('placeholder', 'Digite sua tarefa aqui...')
    caixa.setAttribute('class', 'itens')
    paragrafo.appendChild(caixa)
    paragrafo.animate(aparecer, tempo)
    novoitem.before(paragrafo)
    atualizar()
}

atualizar()

function atualizar() {
    const item = document.getElementsByClassName('itens')
    const paragrafo = document.querySelectorAll('p')

    for (let contador in item) {

        if (item[contador].nextElementSibling == null) {
            paragrafo[contador].setAttribute('class', `p${contador}`)
            const label = document.createElement('label')
            label.setAttribute('class', contador)
            const botao = document.createElement('button')
            item[contador].setAttribute('id', contador)
            item[contador].after(label)
            label.appendChild(botao)
            botao.innerText = 'Completo'
            botao.style.display = 'inline'
            botao.addEventListener('click', completo)
            botao.value = contador
        }
    }
}

function completo() {
    const escolhido = this.value
    const botesc = this
    const opcoes = document.getElementById(escolhido)
    if (opcoes.style.textDecoration == 'line-through') {
        opcoes.style.textDecoration = 'none'
        botesc.innerText = 'Completo'
        document.getElementById(`b${escolhido}`).remove()
        verificarLogin()
    } else {
        const eliminar = document.createElement('button')
        eliminar.setAttribute('id', `b${escolhido}`)
        eliminar.style.display = 'inline'  
        eliminar.value = escolhido 
        eliminar.innerText = 'Apagar'
        document.getElementsByClassName(escolhido)[0].after(eliminar)
        opcoes.style.textDecoration = 'line-through'
        botesc.innerText = 'Incompleto'
        verificarLogin()
        
        eliminar.addEventListener('click', apagar)
    }
}

function apagar() {
    const escolhido = this.value

    const sumir = [
        { opacity: 100 },
        { opacity: 0 }
    ]

    const tempo = {
        duration: 600,
        iterations: 1
    }

    document.getElementsByClassName(`p${escolhido}`)[0].animate(sumir, tempo)

    setTimeout(() => {
        document.getElementsByClassName(`p${escolhido}`)[0].style.display = 'none'
    }, 500);
    
    
    atualizar()
}

function abrir() {
    const animacaoentrar = [
        { opacity: 0 },
        { opacity: 100 }
    ]
    const animacaosair = [
        { opacity: 100 },
        { opacity: 0 }
    ]

    const tempo = {
        duration: 800,
        iterations: 1
    }

    

    if (tela.style.display == 'block') {
        tela.animate(animacaosair, tempo)
        setTimeout(() => {
            tela.style.display = 'none'
        }, 800);
    } else {
        tela.animate(animacaoentrar, tempo)
        tela.style.display = 'block'
    }

    menu.style.transform = 'scale(0.8)'
    setTimeout(() => {
        menu.style.transform = 'scale(1.0)'
    }, 500);
    menu.style.transition = 'all 1s ease'
    menu.after(tela)
}
