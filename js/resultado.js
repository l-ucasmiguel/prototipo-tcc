document.addEventListener("DOMContentLoaded", () => {

    const percentualRaw = localStorage.getItem("percentual");
    const nivel = localStorage.getItem("nivel");
    const interpretacao = localStorage.getItem("interpretacao");

    if (percentualRaw === null || nivel === null || interpretacao === null) {
        window.location.href = "index.html";
        return;
    }

    const percentual = Number(percentualRaw);

    // Preenche pontuação e nível
    document.getElementById("percentual").textContent = percentual;
    document.getElementById("nivelBadge").textContent = "Nível: " + nivel;

    // Renderiza interpretação em parágrafos
    const interpretacaoEl = document.getElementById("interpretacao");
    interpretacaoEl.innerHTML = "";
    interpretacao.split("\n\n").forEach(paragrafo => {
        if (paragrafo.trim()) {
            const p = document.createElement("p");
            p.textContent = paragrafo.trim();
            interpretacaoEl.appendChild(p);
        }
    });

    // Barra de resultado com cor por nível
    const barra = document.getElementById("barraResultado");
    barra.style.width = percentual + "%";

    if (percentual <= 39) {
        barra.style.backgroundColor = "#e74c3c";
        document.getElementById("nivelBadge").style.background = "#fadbd8";
        document.getElementById("nivelBadge").style.color = "#922b21";
    } else if (percentual <= 59) {
        barra.style.backgroundColor = "#e67e22";
        document.getElementById("nivelBadge").style.background = "#fdebd0";
        document.getElementById("nivelBadge").style.color = "#935116";
    } else if (percentual <= 79) {
        barra.style.backgroundColor = "#f1c40f";
        document.getElementById("nivelBadge").style.background = "#fef9e7";
        document.getElementById("nivelBadge").style.color = "#7d6608";
    } else {
        barra.style.backgroundColor = "#27ae60";
        document.getElementById("nivelBadge").style.background = "#d5f5e3";
        document.getElementById("nivelBadge").style.color = "#1e8449";
    }
});