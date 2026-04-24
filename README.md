# Guia Interativo de Avaliação do Nível de Adequação à LGPD em Sistemas Corporativos

Protótipo funcional desenvolvido como Trabalho de Conclusão de Curso de Especialização em Engenharia de Software pela Escola Superior de Agricultura Luiz de Queiroz da Universidade de São Paulo (USP/ESALQ/PECEGE).

**Autor:** Lucas Miguel de Melo Salles  
**Orientador:** Prof. Me. Rafael de Sá Mascarenhas  

---

## Sobre o projeto

Este sistema é um guia interativo que auxilia gestores na avaliação do grau de maturidade de suas organizações em relação à **Lei Geral de Proteção de Dados Pessoais (LGPD)**. Por meio de um questionário estruturado em seis eixos temáticos, a ferramenta calcula automaticamente um indicador de adequação e gera um relatório com interpretação e recomendações personalizadas.

> ⚠️ Esta ferramenta tem caráter educacional e diagnóstico. Não substitui a atuação de advogados, encarregados de dados (DPOs) ou consultorias especializadas.

---

## Funcionalidades

- Questionário com **41 afirmações** organizadas em 6 eixos temáticos
- Navegação em **3 páginas** com barra de progresso por etapa
- **Motor de pontuação ponderada** baseado em escala Likert (100%, 75%, 25% e 0% do peso de cada questão)
- Classificação automática em **4 níveis de maturidade**: Crítico, Inicial, Intermediário e Avançado
- **Relatório final** com percentual de adequação, interpretação e recomendações por nível
- Arquitetura **cliente-servidor** com frontend em HTML/CSS/JS e backend em Node.js + Express

---

## Eixos avaliados

| Eixo | Tema | Pontuação máxima |
|------|------|-----------------|
| 1 | Governança Básica e Conscientização | 20 pontos |
| 2 | Estratégia, Estrutura Organizacional e Compliance | 20 pontos |
| 3 | Governança de Dados e Processos Organizacionais | 20 pontos |
| 4 | Jurídico, Documentação e Direitos dos Titulares | 15 pontos |
| 5 | Segurança da Informação e Gestão de Riscos | 15 pontos |
| 6 | Conformidade Técnica e Gestão de Riscos Avançada | 10 pontos |

**Total: 100 pontos**

---

## Níveis de maturidade

| Nível | Faixa |
|-------|-------|
| 🔴 Crítico | 0% – 39% |
| 🟠 Inicial | 40% – 59% |
| 🟡 Intermediário | 60% – 79% |
| 🟢 Avançado | 80% – 100% |

---

## Tecnologias utilizadas

- **Frontend:** HTML5, CSS3, JavaScript (ES6+)
- **Backend:** Node.js + Express
- **Comunicação:** HTTP REST (método POST, formato JSON)
- **Persistência temporária:** localStorage do navegador

---

## Pré-requisitos

Antes de executar o projeto, certifique-se de ter instalado:

- [Node.js](https://nodejs.org/) — versão 18 ou superior  
  Para verificar se já está instalado, execute no terminal:
  ```
  node --version
  ```

---

## Como executar o projeto

### 1. Clone o repositório

```bash
git clone https://github.com/l-ucasmiguel/prototipo-tcc.git
```

### 2. Acesse a pasta do projeto

```bash
cd prototipo-tcc
```

### 3. Instale as dependências

```bash
npm install
```

### 4. Inicie o servidor

```bash
node server.js
```

Se o servidor iniciar corretamente, você verá a seguinte mensagem no terminal:

```
Servidor rodando em http://localhost:3000
```

### 5. Acesse o sistema no navegador

Abra o navegador (Google Chrome ou Microsoft Edge) e acesse:

```
http://localhost:3000
```

---

## Estrutura do projeto

```
prototipo-tcc/
│
├── css/
│   └── style.css              # Folha de estilos principal
│
├── js/
│   ├── script.js              # Lógica do questionário (navegação, progresso e envio)
│   └── resultado.js           # Lógica da página de resultado
│
├── index.html                 # Página inicial
├── questionario1.html         # Questionário — Eixos 1 e 2 (perguntas 1 a 15)
├── questionario2.html         # Questionário — Eixos 3 e 4 (perguntas 16 a 26)
├── questionario3.html         # Questionário — Eixos 5 e 6 (perguntas 27 a 41)
├── resultado.html             # Página de resultado e relatório
├── server.js                  # Servidor Node.js + Express (backend)
├── package.json               # Configuração e dependências do projeto
└── README.md                  # Documentação do projeto
```

---

## Como funciona o cálculo

Cada afirmação possui um peso máximo definido conforme sua criticidade em relação à LGPD. As respostas seguem uma escala Likert de quatro níveis:

| Alternativa | Percentual do peso |
|-------------|-------------------|
| Concordo totalmente | 100% |
| Concordo | 75% |
| Discordo | 25% |
| Discordo totalmente | 0% |

O percentual final de adequação é calculado pela fórmula:

```
Percentual = (soma dos pontos obtidos / soma dos pesos máximos) × 100
```

O cálculo é executado no backend (`server.js`), que recebe as respostas via requisição HTTP POST e retorna o resultado em formato JSON.

---

## Observações importantes

- O sistema foi desenvolvido para execução em **ambiente local**, sem necessidade de hospedagem ou banco de dados.
- O servidor deve estar em execução (`node server.js`) durante todo o uso do sistema.
- Não feche o terminal enquanto estiver utilizando o sistema.
- Caso ocorra erro ao clicar em "Ver Resultado", verifique se o servidor está rodando na porta 3000.

---

## Licença

Este projeto está licenciado sob a licença ISC. Consulte o arquivo [LICENSE](LICENSE) para mais detalhes.