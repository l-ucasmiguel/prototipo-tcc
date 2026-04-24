/**
 * Guia Interativo de Adequação à LGPD
 * Script principal — controla navegação, progresso e envio do questionário
 *
 * Estrutura:
 *  - Página 1 (questionario1.html): Eixos 1 e 2 — perguntas q1 a q15
 *  - Página 2 (questionario2.html): Eixos 3 e 4 — perguntas q16 a q26
 *  - Página 3 (questionario3.html): Eixos 5 e 6 — perguntas q27 a q41
 *
 * Estratégia de persistência:
 *  As respostas de cada página são salvas no localStorage ao avançar,
 *  permitindo que o usuário retorne sem perder o progresso.
 *  Ao final da página 3, todas as respostas são consolidadas e enviadas
 *  ao backend via requisição POST para cálculo da pontuação.
 */

// ================================================================
// UTILITÁRIOS GERAIS
// ================================================================

/**
 * Detecta a página atual com base na URL
 */
function getPaginaAtual() {
    const path = window.location.pathname;
    if (path.includes("questionario1")) return 1;
    if (path.includes("questionario2")) return 2;
    if (path.includes("questionario3")) return 3;
    return null;
}

/**
 * Salva as respostas da página atual no localStorage
 * @param {NodeList} perguntas - lista de elementos .pergunta
 * @param {number} pagina - número da página (1, 2 ou 3)
 */
function salvarRespostasPagina(perguntas, pagina) {
    const respostas = {};
    perguntas.forEach(pergunta => {
        const selecionado = pergunta.querySelector("input[type='radio']:checked");
        if (selecionado) respostas[selecionado.name] = selecionado.value;
    });
    localStorage.setItem(`respostas_p${pagina}`, JSON.stringify(respostas));
}

/**
 * Restaura as respostas salvas no localStorage para a página atual
 * @param {number} pagina - número da página (1, 2 ou 3)
 */
function restaurarRespostasPagina(pagina) {
    const salvas = JSON.parse(localStorage.getItem(`respostas_p${pagina}`) || "{}");
    Object.keys(salvas).forEach(name => {
        const radio = document.querySelector(`input[name="${name}"][value="${salvas[name]}"]`);
        if (radio) radio.checked = true;
    });
}

/**
 * Verifica se todas as perguntas da página foram respondidas
 * @param {NodeList} perguntas - lista de elementos .pergunta
 * @returns {boolean}
 */
function todasRespondidas(perguntas) {
    for (const pergunta of perguntas) {
        if (!pergunta.querySelector("input[type='radio']:checked")) return false;
    }
    return true;
}

// ================================================================
// BARRA DE PROGRESSO
// ================================================================

/**
 * Inicializa a barra de progresso e seus listeners
 * @param {NodeList} perguntas - lista de elementos .pergunta
 */
function inicializarBarraProgresso(perguntas) {
    const barra = document.getElementById("barraProgresso");
    if (!barra) return;

    function atualizar() {
        let respondidas = 0;
        perguntas.forEach(pergunta => {
            if (pergunta.querySelector("input[type='radio']:checked")) respondidas++;
        });
        barra.style.width = (respondidas / perguntas.length) * 100 + "%";
    }

    perguntas.forEach(pergunta => {
        pergunta.querySelectorAll("input[type='radio']").forEach(radio => {
            radio.addEventListener("change", atualizar);
        });
    });

    atualizar();
}

// ================================================================
// NAVEGAÇÃO ENTRE PÁGINAS
// ================================================================

/**
 * Avança para a próxima página após validar e salvar respostas
 * @param {NodeList} perguntas - lista de elementos .pergunta
 * @param {number} paginaAtual - número da página atual
 * @param {string} proximaPagina - URL da próxima página
 */
function avancarPagina(perguntas, paginaAtual, proximaPagina) {
    if (!todasRespondidas(perguntas)) {
        alert("Por favor, responda todas as perguntas antes de avançar.");
        return;
    }
    salvarRespostasPagina(perguntas, paginaAtual);
    window.location.href = proximaPagina;
}

// ================================================================
// PESOS MÁXIMOS POR QUESTÃO
// Reflete a pontuação máxima de cada afirmação conforme metodologia
// ================================================================
const PESOS_MAXIMOS = {
    q1: 3.0,  q2: 2.5,  q3: 2.0,  q4: 2.5,  q5: 2.0,
    q6: 3.0,  q7: 2.5,  q8: 2.5,
    q9: 6.0,  q10: 2.0,
    q11: 3.0, q12: 2.5, q13: 2.5, q14: 2.0, q15: 2.0,
    q16: 7.0, q17: 5.0,
    q18: 4.0, q19: 4.0,
    q20: 3.0, q21: 2.0, q22: 2.0, q23: 2.0,
    q24: 2.5, q25: 2.0, q26: 1.5,
    q27: 3.0, q28: 2.5, q29: 2.5,
    q30: 2.0, q31: 1.5, q32: 2.0, q33: 1.5,
    q34: 1.5, q35: 1.0, q36: 1.5, q37: 1.0, q38: 1.0,
    q39: 2.0, q40: 1.0, q41: 1.0
};

// ================================================================
// ENVIO FINAL — PÁGINA 3
// ================================================================

/**
 * Consolida respostas de todas as páginas, valida e envia ao backend
 * @param {NodeList} perguntas - lista de elementos .pergunta da página 3
 */
async function enviarQuestionario(perguntas) {
    if (!todasRespondidas(perguntas)) {
        alert("Por favor, responda todas as perguntas antes de ver o resultado.");
        return;
    }

    salvarRespostasPagina(perguntas, 3);

    const p1 = JSON.parse(localStorage.getItem("respostas_p1") || "{}");
    const p2 = JSON.parse(localStorage.getItem("respostas_p2") || "{}");
    const p3 = JSON.parse(localStorage.getItem("respostas_p3") || "{}");

    // Verifica se as páginas anteriores foram respondidas
    if (Object.keys(p1).length === 0 || Object.keys(p2).length === 0) {
        alert("Parece que você não respondeu todas as páginas anteriores. Por favor, reinicie o questionário.");
        window.location.href = "questionario1.html";
        return;
    }

    const todasRespostas = { ...p1, ...p2, ...p3 };

    // Monta array de respostas com valor obtido e peso máximo
    const respostas = Object.keys(PESOS_MAXIMOS).map(key => ({
        valor: parseFloat(todasRespostas[key] || 0),
        max: PESOS_MAXIMOS[key]
    }));

    try {
        const response = await fetch("http://localhost:3000/calcular", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(respostas)
        });

        if (!response.ok) throw new Error("Erro na resposta do servidor.");

        const data = await response.json();

        localStorage.setItem("percentual", data.percentual);
        localStorage.setItem("nivel", data.nivel);
        localStorage.setItem("interpretacao", data.interpretacao);

        // Limpa respostas salvas após envio bem-sucedido
        localStorage.removeItem("respostas_p1");
        localStorage.removeItem("respostas_p2");
        localStorage.removeItem("respostas_p3");

        window.location.href = "resultado.html";

    } catch (error) {
        alert("Erro ao conectar com o servidor. Verifique se o servidor está rodando.");
        console.error("Erro ao enviar questionário:", error);
    }
}

// ================================================================
// INICIALIZAÇÃO — executado quando o DOM estiver pronto
// ================================================================

document.addEventListener("DOMContentLoaded", () => {
    const pagina = getPaginaAtual();
    if (!pagina) return;

    const perguntas = document.querySelectorAll(".pergunta");

    // Restaura respostas salvas (caso o usuário tenha voltado)
    restaurarRespostasPagina(pagina);

    // Inicializa barra de progresso
    inicializarBarraProgresso(perguntas);

    // Configura botão de avançar ou enviar conforme a página
    const btnAvancar = document.getElementById("btnAvancar");
    const form = document.getElementById("questionario");

    if (pagina === 1 && btnAvancar) {
        btnAvancar.addEventListener("click", () => {
            avancarPagina(perguntas, 1, "questionario2.html");
        });
    }

    if (pagina === 2 && btnAvancar) {
        btnAvancar.addEventListener("click", () => {
            avancarPagina(perguntas, 2, "questionario3.html");
        });
    }

    if (pagina === 3 && form) {
        form.addEventListener("submit", async (event) => {
            event.preventDefault();
            await enviarQuestionario(perguntas);
        });
    }
});