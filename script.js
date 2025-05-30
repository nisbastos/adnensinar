document.addEventListener("DOMContentLoaded", () => {
    const imagens = document.querySelectorAll('.carrossel img');
    const anteriorBtn = document.querySelector('.carrossel-controle.anterior');
    const seguinteBtn = document.querySelector('.carrossel-controle.seguinte');
    let indexAtual = 0;

    function mostrarImagem(index) {
        imagens.forEach((img, i) => {
            img.classList.remove('active');
            if (i === index) {
                img.classList.add('active');
            }
        });
    }

    function proximaImagem() {
        indexAtual = (indexAtual + 1) % imagens.length;
        mostrarImagem(indexAtual);
    }

    function imagemAnterior() {
        indexAtual = (indexAtual - 1 + imagens.length) % imagens.length;
        mostrarImagem(indexAtual);
    }

    anteriorBtn.addEventListener('click', imagemAnterior);
    seguinteBtn.addEventListener('click', proximaImagem);

    mostrarImagem(indexAtual);
    setInterval(proximaImagem, 4000);
});
// Função para fechar o alerta
function fecharAlerta() {
    document.getElementById("alerta").style.display = "none";
}

// Função para contar o tempo até o dia 30/06
const deadline = new Date("2025-06-30T23:59:59").getTime();
const contadorElemento = document.getElementById("contador");

function atualizarContagem() {
    const agora = new Date().getTime();
    const restante = deadline - agora;

    if (restante <= 0) {
        clearInterval(intervalo);
        contadorElemento.textContent = "O tempo acabou!";
    } else {
        const dias = Math.floor(restante / (1000 * 60 * 60 * 24));
        const horas = Math.floor((restante % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutos = Math.floor((restante % (1000 * 60 * 60)) / (1000 * 60));
        const segundos = Math.floor((restante % (1000 * 60)) / 1000);

        contadorElemento.textContent = `${dias}d ${horas}h ${minutos}m ${segundos}s`;
    }
}

const intervalo = setInterval(atualizarContagem, 1000);
function fecharBolinha() {
    var bolinha = document.getElementById("bolinhaAlerta");
    bolinha.style.display = "none";
}