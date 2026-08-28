# CyberPath — Ferramenta de estudo interativa (Redes → Security+)

App React que ensina do básico de redes até o CompTIA Security+ (SY0-701), no
estilo "aprender vendo e fazendo". Cada módulo tem **aula visual + interação +
quiz com feedback**. Construído por partes: uma peça bem-feita e fechada por
vez, nunca tudo de uma vez.

**Dono/usuário:** Matheus — analista de segurança (SOC/IAM), estudando para
certificações. Prioridade: redes do básico (maior gargalo no trabalho) subindo
até o Security+.

---

## 1. Rodando o projeto

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # bundle de produção em dist/
npm run preview  # serve o build
```

## 2. Objetivo pedagógico

- Redes primeiro (blueprint **CompTIA Network+ N10-009**), depois **Security+
  (SY0-701)**.
- Conteúdo sempre ancorado nos objetivos oficiais das certificações — não
  inventar escopo.
- Diagnóstico do usuário no Security+ (simulado já feito): forte em
  Ameaças/Vulnerabilidades (D2); fraco em Conceitos Gerais (D1) e Arquitetura
  (D3), que são teoria/nomenclatura.

## 3. Stack e decisões técnicas

- **Vite + React 18** (funcional + hooks). Sem framework de estado, sem router:
  a rota é o id do módulo em `useState` (`src/App.jsx`). Introduzir router só
  quando houver deep link de verdade.
- **Estilo:** CSS Modules por componente + design tokens em
  `src/styles/tokens.css`. Nada de Tailwind. A paleta e as fontes são
  preferência fixa (ver §5) — mudar só em `tokens.css`.
- **Persistência:** `localStorage` via `src/hooks/useProgress.js`
  (chave `cyberpath:progress:v1`). Toda leitura/escrita é protegida por
  try/catch; o app funciona normalmente se a persistência estiver indisponível.
- Sem dependências além de `react` e `react-dom`.

## 4. Estrutura

```
src/
  App.jsx                      roteamento por estado + ligação com o progresso
  main.jsx
  styles/tokens.css            paleta, fontes, raios e sombras (fonte da verdade)
  styles/global.css            reset + .page, .kicker, .mono
  hooks/useProgress.js         persistência em localStorage
  data/
    trilha.js                  mapa da trilha, estados e regra de desbloqueio
    r1-osi.js                  conteúdo do R1 (camadas, encapsulamento, quiz)
    securityplus-questions.js  25 questões originais + pesos dos domínios
  components/
    Home/                      mapa da trilha com progresso real
    ModuleShell/               casca comum: kicker, título, objetivos, abas
    Quiz/                      quiz reutilizável (usado pelo R1 e pelo simulado)
  modules/
    R1Osi/                     3 abas: aula visual, encapsulamento, quiz
    SimuladoSecurityPlus/      menu, filtro por domínio, % por domínio
```

**Para adicionar um módulo novo:** conteúdo em `src/data/`, tela em
`src/modules/<Modulo>/` usando `ModuleShell` + `Quiz`, entrada em
`src/data/trilha.js` com `status: 'ready'`, e registro em `SCREENS` no
`src/App.jsx`.

## 5. Convenções visuais (preferência fixa — seguir à risca)

Estilo "cyber dark", todos os valores já em `src/styles/tokens.css`:

- Fundo navy `#0F172A`; telas de capa/fechamento mais escuras `#0B1220`
- Cards `#1E293B`, cantos arredondados, sombra suave
- Fontes: **Calibri** para corpo, **Courier New** (mono) para IPs, códigos,
  números e PDUs
- Acentos: ciano `#22D3EE`, teal `#2DD4BF`, azul `#38BDF8`, âmbar `#FBBF24`,
  verde `#4ADE80`, violeta `#A78BFA`; erro `#F87171`
- Layout largo; kicker em maiúsculas mono + título grande; sem barras de destaque
- Texto secundário `#94A3B8`, texto apagado `#475569`

## 6. Regras do projeto (não violar)

- **Uma frente por vez.** Fechar um módulo antes de abrir o próximo.
- Conteúdo ancorado em blueprint oficial (N10-009 / SY0-701). Nada de questões
  vazadas de prova real — todas as questões são **originais**, estilo cenário.
- Hands-on é **simulado didático** (terminal fake roteirizado, exercícios
  validados), NÃO ambiente real tipo Kali/VM. Isso fica explícito na UI.
- Cada módulo entregue = aula + interação + quiz, funcional e fechado.

## 7. Backlog / TODO

### Infra do app

- [x] Projeto Vite + React com estrutura de pastas (`src/components`,
      `src/modules`, `src/data`)
- [x] Persistência de progresso (localStorage): módulos concluídos, % dos quizzes
- [x] Home como mapa da trilha com estado real (concluído / em andamento /
      disponível / bloqueado / em breve)
- [x] Componente de quiz reutilizável (`src/components/Quiz`), usado pelo R1 e
      pelo simulado

### Trilha de REDES (N10-009) — prioridade do usuário

- [x] **R1 · Modelo OSI e TCP/IP** — aula visual (7 camadas clicáveis + coluna
      TCP/IP agrupada), exercício de encapsulamento validado e quiz de 4 questões
- [ ] **PRÓXIMO:** R2 · Endereçamento IP — IPv4, classes, público/privado, IPv6 básico
- [ ] R3 · Subnetting/CIDR — com calculadora/exercício que VALIDA a resposta
- [ ] R4 · Portas e protocolos — TCP vs. UDP, portas comuns, three-way handshake animado
- [ ] R5 · Dispositivos e topologias — switch/router/firewall, LAN/WAN/VLAN
- [ ] R6 · Meios de transmissão — cabos, fibra, wireless (Wi-Fi 6/6E)
- [ ] R7 · Serviços de rede — DNS, DHCP, NAT
- [ ] R8 · Segurança de rede — zero trust, SASE, VPN (ponte para o Security+)
- [ ] R9 · Troubleshooting — metodologia + terminal simulado

### Trilha SECURITY+ (SY0-701)

- [x] Simulado de 25 questões com % por domínio, filtro por domínio e embaralhamento
- [ ] S-D1 · Conceitos Gerais (12%) — buraco do usuário
- [ ] S-D2 · Ameaças/Vuln/Mitig (22%) — forte do usuário; reforço leve
- [ ] S-D3 · Arquitetura (18%) — buraco do usuário
- [ ] S-D4 · Operações (28%) — maior domínio
- [ ] S-D5 · Gestão do Programa (20%)
- [ ] Deck de flashcards para D1 e D3

### Componentes especiais (quando os módulos pedirem)

- [ ] Terminal de rede simulado (comandos roteirizados)
- [ ] Treino de subnetting com validação
- [ ] Animação interativa do three-way handshake
- [ ] Visualização de criptografia simplificada

## 8. Domínios das certificações (peso, para calibrar quizzes)

**Network+ N10-009:** Networking Concepts 23% · Network Implementation 20% ·
Network Operations 19% · Network Security 14% · Network Troubleshooting 24%.
(90 questões, 90 min, corte 720/900.)

**Security+ SY0-701:** D1 Conceitos Gerais 12% · D2 Ameaças/Vuln/Mitig 22% ·
D3 Arquitetura 18% · D4 Operações 28% · D5 Gestão do Programa 20%.
(90 questões, 90 min, corte 750/900.)

O banco em `securityplus-questions.js` segue esse peso: D1 3 · D2 6 · D3 4 ·
D4 7 · D5 5 = 25 questões.

## 9. Como retomar numa nova sessão

1. Ler este README inteiro.
2. `npm install && npm run dev`, e navegar pelo R1 e pelo simulado.
3. Pegar o item marcado **PRÓXIMO** (ou perguntar ao usuário se a prioridade mudou).
4. Entregar UMA peça fechada, testar, e só então seguir para a próxima.
5. Atualizar os checkboxes deste README ao concluir cada item.
