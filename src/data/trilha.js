/* Mapa da trilha. Um item aqui é a única fonte de verdade da Home e do
   roteamento: `status: 'ready'` significa que o módulo tem aula + interação +
   quiz prontos (README §6); 'soon' é placeholder de roadmap.
   `requires` é o id do módulo anterior — a Home usa para bloquear/liberar. */

export const TRACKS = {
  redes: {
    id: 'redes',
    label: 'Redes',
    kicker: 'Trilha 01 · Fundamentos de Redes',
    blueprint: 'CompTIA Network+ N10-009',
    accent: 'var(--cyan)',
  },
  secplus: {
    id: 'secplus',
    label: 'Security+',
    kicker: 'Trilha 02 · Segurança',
    blueprint: 'CompTIA Security+ SY0-701',
    accent: 'var(--violet)',
  },
}

export const MODULES = [
  {
    id: 'r1',
    code: 'R1',
    track: 'redes',
    title: 'Modelo OSI e TCP/IP',
    summary: 'As 7 camadas, o que cada uma resolve e como o dado é encapsulado até virar bits no cabo.',
    objectives: ['N10-009 · 1.1 Compare os modelos OSI e TCP/IP'],
    status: 'ready',
    requires: null,
    minutes: 25,
  },
  {
    id: 'r2',
    code: 'R2',
    track: 'redes',
    title: 'Endereçamento IP',
    summary: 'IPv4, classes, público vs. privado, IPv6 básico.',
    objectives: ['N10-009 · 1.7 Endereçamento IPv4 e IPv6'],
    status: 'soon',
    requires: 'r1',
    minutes: 30,
  },
  {
    id: 'r3',
    code: 'R3',
    track: 'redes',
    title: 'Subnetting e CIDR',
    summary: 'Máscaras, cálculo de sub-redes e treino com validação da resposta.',
    objectives: ['N10-009 · 1.7 Subnetting e CIDR'],
    status: 'soon',
    requires: 'r2',
    minutes: 45,
  },
  {
    id: 'r4',
    code: 'R4',
    track: 'redes',
    title: 'Portas e protocolos',
    summary: 'TCP vs. UDP, portas comuns e o three-way handshake.',
    objectives: ['N10-009 · 1.4 Portas, protocolos e tráfego'],
    status: 'soon',
    requires: 'r3',
    minutes: 30,
  },
  {
    id: 'r5',
    code: 'R5',
    track: 'redes',
    title: 'Dispositivos e topologias',
    summary: 'Switch, roteador, firewall; LAN, WAN e VLAN.',
    objectives: ['N10-009 · 2.1 Dispositivos e topologias'],
    status: 'soon',
    requires: 'r4',
    minutes: 30,
  },
  {
    id: 'r6',
    code: 'R6',
    track: 'redes',
    title: 'Meios de transmissão',
    summary: 'Cobre, fibra e wireless (Wi-Fi 6/6E).',
    objectives: ['N10-009 · 1.5 Meios de transmissão e conectores'],
    status: 'soon',
    requires: 'r5',
    minutes: 25,
  },
  {
    id: 'r7',
    code: 'R7',
    track: 'redes',
    title: 'Serviços de rede',
    summary: 'DNS, DHCP e NAT — o que quebra no dia a dia.',
    objectives: ['N10-009 · 3.4 Serviços de rede'],
    status: 'soon',
    requires: 'r6',
    minutes: 35,
  },
  {
    id: 'r8',
    code: 'R8',
    track: 'redes',
    title: 'Segurança de rede',
    summary: 'Zero trust, SASE e VPN — a ponte para o Security+.',
    objectives: ['N10-009 · 4.1 Conceitos de segurança de rede'],
    status: 'soon',
    requires: 'r7',
    minutes: 35,
  },
  {
    id: 'r9',
    code: 'R9',
    track: 'redes',
    title: 'Troubleshooting',
    summary: 'Metodologia CompTIA + terminal simulado (ping, traceroute, nslookup).',
    objectives: ['N10-009 · 5.1 Metodologia de troubleshooting'],
    status: 'soon',
    requires: 'r8',
    minutes: 40,
  },
  {
    id: 'sim-secplus',
    code: 'SIM',
    track: 'secplus',
    title: 'Simulado Security+ SY0-701',
    summary: '25 questões originais estilo cenário, com percentual de acerto por domínio.',
    objectives: ['SY0-701 · Todos os domínios (D1–D5)'],
    status: 'ready',
    requires: null,
    minutes: 40,
  },
  {
    id: 's-d1',
    code: 'D1',
    track: 'secplus',
    title: 'Conceitos Gerais de Segurança',
    summary: 'Tipos de controle, tríade CIA, não-repúdio, AAA.',
    objectives: ['SY0-701 · Domínio 1 (12%)'],
    status: 'soon',
    requires: 'sim-secplus',
    minutes: 35,
  },
  {
    id: 's-d2',
    code: 'D2',
    track: 'secplus',
    title: 'Ameaças, Vulnerabilidades e Mitigações',
    summary: 'Atores, vetores, tipos de vulnerabilidade e mitigação.',
    objectives: ['SY0-701 · Domínio 2 (22%)'],
    status: 'soon',
    requires: 's-d1',
    minutes: 40,
  },
  {
    id: 's-d3',
    code: 'D3',
    track: 'secplus',
    title: 'Arquitetura de Segurança',
    summary: 'RTO/RPO, regra 3-2-1, responsabilidade compartilhada, tokenização, cripto.',
    objectives: ['SY0-701 · Domínio 3 (18%)'],
    status: 'soon',
    requires: 's-d2',
    minutes: 45,
  },
  {
    id: 's-d4',
    code: 'D4',
    track: 'secplus',
    title: 'Operações de Segurança',
    summary: 'Forense, resposta a incidente, hardening e IAM.',
    objectives: ['SY0-701 · Domínio 4 (28%)'],
    status: 'soon',
    requires: 's-d3',
    minutes: 50,
  },
  {
    id: 's-d5',
    code: 'D5',
    track: 'secplus',
    title: 'Gestão do Programa de Segurança',
    summary: 'Governança, risco, SOC 2 e gestão de terceiros.',
    objectives: ['SY0-701 · Domínio 5 (20%)'],
    status: 'soon',
    requires: 's-d4',
    minutes: 40,
  },
]

export function getModule(id) {
  return MODULES.find((m) => m.id === id) ?? null
}

/* Estados possíveis na Home: 'done' | 'in-progress' | 'available' | 'locked' | 'soon'.
   'soon' vence os demais — módulo sem conteúdo não pode aparecer como jogável. */
export function moduleState(module, progress) {
  if (module.status !== 'ready') return 'soon'

  const requirement = module.requires
  const requirementMet = !requirement || progress[requirement]?.completed
  if (!requirementMet) return 'locked'

  const entry = progress[module.id]
  if (entry?.completed) return 'done'
  if (entry?.visited) return 'in-progress'
  return 'available'
}
