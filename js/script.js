function irParaQuestionario() {
    window.location.href = "questionario.html";
}

function voltarHome() {
    window.location.href = "index.html";
}

// ===============================
// BARRA DE PROGRESSO DO QUESTIONÁRIO
// ===============================
const perguntas = document.querySelectorAll(".pergunta");
const barra = document.getElementById("resultado");

if (perguntas.length && barra) {
    perguntas.forEach(pergunta => {
        const radios = pergunta.querySelectorAll("input[type='radio']");
        radios.forEach(radio => {
            radio.addEventListener("change", atualizarBarra);
        });
    });
}

function atualizarBarra() {
    let respondidas = 0;

    perguntas.forEach(pergunta => {
        if (pergunta.querySelector("input[type='radio']:checked")) {
            respondidas++;
        }
    });

    const porcentagem = (respondidas / perguntas.length) * 100;
    barra.style.width = porcentagem + "%";
}

// ===============================
// SUBMIT → SALVA PONTUAÇÃO
// ===============================
const form = document.getElementById("questionario");

if (form) {
    form.addEventListener("submit", function (event) {
        event.preventDefault();

        let totalPontos = 0;
        let totalMaximo = 0;

        perguntas.forEach(pergunta => {
            const selecionado = pergunta.querySelector("input[type='radio']:checked");
            if (selecionado) {
                totalPontos += parseFloat(selecionado.value);
            }

            const radios = pergunta.querySelectorAll("input[type='radio']");
            let maiorPeso = 0;

            radios.forEach(radio => {
                const valor = parseFloat(radio.value);
                if (valor > maiorPeso) maiorPeso = valor;
            });

            totalMaximo += maiorPeso;
        });

        const percentual = Math.round((totalPontos / totalMaximo) * 100);

        localStorage.setItem("percentual", percentual);

        window.location.href = "resultado.html";
    });
}
