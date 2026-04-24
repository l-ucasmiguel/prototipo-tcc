const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// Servir arquivos estáticos (HTML, CSS, JS)
app.use(express.static(__dirname));

// ===============================
// ROTA DE CÁLCULO
// ===============================
app.post("/calcular", (req, res) => {

    const respostas = req.body;

    if (!respostas || respostas.length === 0) {
        return res.status(400).json({ erro: "Nenhuma resposta recebida." });
    }

    let totalPontos = 0;
    let totalMaximo = 0;

    respostas.forEach(pergunta => {
        totalPontos += pergunta.valor;
        totalMaximo += pergunta.max;
    });

    const percentual = Math.round((totalPontos / totalMaximo) * 100);

    let nivel = "";
    let interpretacao = "";

    if (percentual <= 39) {
        nivel = "Crítico";
        interpretacao = `Gestor, com base nas suas respostas, o nível de adequação da sua empresa à LGPD é CRÍTICO, isso significa que há ausência ou fragilidade significativa de práticas essenciais de proteção de dados pessoais, o que expõe a organização a riscos jurídicos, operacionais e reputacionais. Em termos práticos, a empresa possivelmente não possui clareza sobre quais dados trata, para quais finalidades e como essas informações são armazenadas, utilizadas ou compartilhadas. Nesse cenário, a prioridade deve ser estruturar uma base mínima de organização e controle.\n\nComo primeiro passo, recomenda-se realizar um mapeamento inicial dos dados pessoais tratados, ainda que de forma simples, identificando setores, tipos de dados, finalidades e locais de armazenamento. Também é importante designar um responsável interno pelo tema, centralizando as ações relacionadas à proteção de dados. Paralelamente, a elaboração de documentos básicos, como política de privacidade e orientações internas, já contribui para estabelecer diretrizes mínimas.\n\nNo campo da segurança da informação, medidas imediatas devem ser adotadas, como controle de acesso a sistemas, uso de senhas seguras e realização de backups periódicos. Além disso, é recomendável iniciar ações de conscientização com os colaboradores, mesmo que de forma introdutória, para reduzir riscos no cotidiano organizacional.\n\nPor fim, é importante destacar que as orientações aqui apresentadas não substituem uma consultoria especializada, mas oferecem um direcionamento prático e acessível, permitindo que a organização compreenda quais medidas iniciais podem ser adotadas. Neste nível, o foco é sair da ausência de controle e iniciar um processo estruturado de adequação, podendo, conforme a complexidade das operações, demandar apoio técnico mais aprofundado no futuro.`;

    } else if (percentual <= 59) {
        nivel = "Inicial";
        interpretacao = `Gestor, com base nas suas respostas, o nível de adequação da sua empresa à LGPD é INICIAL, isso significa que a organização já possui algumas práticas relacionadas à proteção de dados, porém de forma pontual, sem padronização e com baixo nível de integração entre áreas. Há iniciativas relevantes, mas ainda não estruturadas como um sistema de governança consistente.\n\nA principal recomendação é formalizar e organizar essas práticas. Para isso, é essencial desenvolver políticas internas claras, como política de proteção de dados, segurança da informação e procedimentos para resposta a incidentes. Também é necessário garantir que essas diretrizes sejam conhecidas pelos colaboradores e aplicadas no dia a dia.\n\nOutro ponto importante é a capacitação dos colaboradores, com treinamentos periódicos sobre LGPD e boas práticas no tratamento de dados. Recomenda-se ainda revisar contratos com terceiros que tenham acesso a dados pessoais, incluindo cláusulas específicas de proteção de dados. A criação de um canal para atendimento aos titulares também é uma medida essencial neste estágio.\n\nCabe ressaltar que as sugestões apresentadas não substituem uma consultoria especializada, mas funcionam como um guia inicial para organização e estruturação das práticas internas. Elas permitem que a empresa avance de forma orientada, identificando prioridades e reduzindo riscos, sem afastar a necessidade de apoio técnico mais específico em situações de maior complexidade.`;

    } else if (percentual <= 79) {
        nivel = "Intermediário";
        interpretacao = `Gestor, com base nas suas respostas, o nível de adequação da sua empresa à LGPD é INTERMEDIÁRIO, isso significa que a organização já possui práticas estruturadas e demonstra um nível relevante de maturidade, com políticas definidas e maior controle sobre o tratamento de dados pessoais. No entanto, ainda existem oportunidades de aprimoramento, especialmente no aprofundamento e na integração dessas práticas.\n\nNeste estágio, recomenda-se avançar no detalhamento do mapeamento de dados, incluindo a identificação das bases legais para cada operação de tratamento. Também é importante realizar avaliações de risco mais estruturadas, permitindo priorizar ações corretivas de forma estratégica.\n\nNo campo da segurança da informação, a organização deve implementar controles mais robustos, como gestão de acessos por perfil e monitoramento de atividades. A capacitação dos colaboradores deve ser contínua e adaptada às suas funções, reforçando a cultura de proteção de dados. Além disso, a realização de auditorias internas contribui para verificar a efetividade das medidas adotadas.\n\nAs orientações aqui apresentadas não substituem uma consultoria especializada, mas oferecem um direcionamento prático para o aprimoramento das práticas já existentes. Elas auxiliam na consolidação da governança em proteção de dados, embora, em níveis mais avançados de complexidade, possa ser necessário o suporte técnico especializado para avaliações mais profundas e implementação de soluções específicas.`;

    } else {
        nivel = "Avançado";
        interpretacao = `Gestor, com base nas suas respostas, o nível de adequação da sua empresa à LGPD é AVANÇADO, isso significa que a organização apresenta alto grau de maturidade, com integração entre governança, segurança da informação, conformidade jurídica e controles técnicos. A proteção de dados já está incorporada à cultura organizacional e às rotinas da empresa.\n\nNesse cenário, as recomendações são voltadas à manutenção e ao aprimoramento contínuo. É essencial realizar revisões periódicas das políticas e procedimentos, acompanhar mudanças legislativas e tecnológicas e manter o monitoramento constante dos processos. A adoção de práticas como privacy by design e privacy by default é um diferencial importante, integrando a proteção de dados desde a concepção de novos projetos.\n\nTambém é recomendável fortalecer continuamente a capacitação dos colaboradores e o engajamento da alta liderança, garantindo que a cultura de proteção de dados se mantenha ativa e evolutiva. A organização pode, inclusive, utilizar esse nível de maturidade como diferencial competitivo no mercado.\n\nPor fim, destaca-se que, embora as orientações fornecidas sirvam como apoio estratégico e direcionamento contínuo, elas não substituem uma consultoria especializada. Em contextos mais complexos, especialmente envolvendo novas tecnologias ou operações de maior risco, o suporte técnico qualificado pode ser essencial para garantir a manutenção do alto nível de conformidade e a evolução constante das práticas adotadas.`;
    }

    res.json({ percentual, nivel, interpretacao });
});

app.listen(3000, () => {
    console.log("Servidor rodando em http://localhost:3000");
});