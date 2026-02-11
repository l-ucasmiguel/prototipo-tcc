document.addEventListener("DOMContentLoaded", () => {

    const percentual = Number(localStorage.getItem("percentual"));
    if (!percentual && percentual !== 0) return;

    let nivel = "";
    let interpretacao = "";

    if (percentual <= 25) {
        nivel = "Crítico";
        interpretacao = "A organização apresenta nível crítico de maturidade em LGPD, com ausência ou fragilidade significativa de controles, governança e práticas de proteção de dados.";

    } else if (percentual <= 50) {
        nivel = "Inicial";
        interpretacao = "A organização encontra-se em estágio inicial de adequação à LGPD, com ações pontuais e pouco estruturadas.";

    } else if (percentual <= 75) {
        nivel = "Intermediário";
        interpretacao = "A organização apresenta nível intermediário de maturidade em LGPD, com processos parcialmente definidos e controles em evolução.";

    } else {
        nivel = "Avançado";
        interpretacao = "A organização apresenta elevado nível de maturidade em LGPD, com governança estruturada e práticas consolidadas.";
    }

    document.getElementById("percentual").textContent = percentual;
    document.getElementById("nivel").textContent = nivel;
    document.getElementById("interpretacao").textContent = interpretacao;

    const barra = document.getElementById("barraResultado");
    barra.style.width = percentual + "%";

    if (percentual <= 25) {
        barra.style.backgroundColor = "#e74c3c";
    } else if (percentual <= 50) {
        barra.style.backgroundColor = "#e67e22";
    } else if (percentual <= 75) {
        barra.style.backgroundColor = "#f1c40f";
    } else {
        barra.style.backgroundColor = "#2ecc71";
    }
});
