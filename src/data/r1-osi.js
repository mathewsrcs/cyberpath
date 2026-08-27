/* R1 · Modelo OSI e TCP/IP — ancorado no objetivo N10-009 1.1.
   Ordem do array: camada 7 primeiro (topo da pilha), como o modelo é desenhado. */

export const LAYERS = [
  {
    n: 7,
    name: 'Aplicação',
    pdu: 'Dados',
    color: 'var(--violet)',
    tcpip: 'Aplicação',
    role: 'É onde o software fala com a rede. Não é o navegador em si — é o protocolo que o navegador usa.',
    detail:
      'A camada 7 define o formato da conversa entre duas aplicações: quais verbos existem, o que é um pedido e o que é uma resposta. O HTTP não sabe nada de IP ou de cabo; ele só sabe pedir GET /index.html e receber 200 OK.',
    examples: ['HTTP/HTTPS', 'DNS', 'SMTP', 'SSH', 'FTP'],
    devices: ['Proxy de aplicação', 'WAF', 'Firewall de próxima geração'],
    breaks: 'Site responde mas dá erro 500, certificado inválido, autenticação recusada.',
  },
  {
    n: 6,
    name: 'Apresentação',
    pdu: 'Dados',
    color: 'var(--violet)',
    tcpip: 'Aplicação',
    role: 'Traduz o dado para um formato que os dois lados entendem: codificação, compressão e criptografia.',
    detail:
      'É a camada que garante que "texto" signifique a mesma coisa nas duas pontas — UTF-8, JPEG, ASCII. A criptografia TLS é classicamente mapeada aqui, embora na prática o TLS fique entre a 4 e a 7.',
    examples: ['TLS/SSL', 'UTF-8, ASCII', 'JPEG, PNG', 'Compressão gzip'],
    devices: ['Terminador TLS', 'Balanceador que faz offload de SSL'],
    breaks: 'Caracteres corrompidos, handshake TLS falhando, cifra incompatível.',
  },
  {
    n: 5,
    name: 'Sessão',
    pdu: 'Dados',
    color: 'var(--violet)',
    tcpip: 'Aplicação',
    role: 'Abre, mantém e encerra a conversa entre duas máquinas — e sabe retomá-la de onde parou.',
    detail:
      'Sessão é o diálogo, não a conexão. Controla quem fala em cada momento (half/full-duplex) e coloca marcações de sincronismo para que uma transferência longa possa continuar após uma queda.',
    examples: ['RPC', 'NetBIOS', 'PPTP', 'Cookies de sessão'],
    devices: ['Gateway de sessão'],
    breaks: 'Sessão caindo sozinha, timeout, usuário deslogado sem motivo.',
  },
  {
    n: 4,
    name: 'Transporte',
    pdu: 'Segmento (TCP) / Datagrama (UDP)',
    color: 'var(--blue)',
    tcpip: 'Transporte',
    role: 'Decide se a entrega é confiável ou rápida, e usa portas para saber a qual processo entregar.',
    detail:
      'O TCP numera os segmentos, confirma o recebimento e retransmite o que se perdeu — por isso é confiável e mais lento. O UDP só dispara. A porta é o que permite ao mesmo servidor atender HTTPS na 443 e SSH na 22 ao mesmo tempo.',
    examples: ['TCP porta 443', 'UDP porta 53', 'Three-way handshake', 'Controle de fluxo'],
    devices: ['Firewall stateful', 'Balanceador de carga L4'],
    breaks: 'Porta fechada, conexão recusada, retransmissão alta, MTU/fragmentação.',
  },
  {
    n: 3,
    name: 'Rede',
    pdu: 'Pacote',
    color: 'var(--teal)',
    tcpip: 'Internet',
    role: 'Endereça e roteia o pacote entre redes diferentes. É a camada do IP.',
    detail:
      'Endereço IP é lógico: identifica onde a máquina está na topologia, e por isso muda quando ela troca de rede. O roteador olha o IP de destino, consulta a tabela de rotas e escolhe o próximo salto — decrementando o TTL a cada um.',
    examples: ['IPv4 / IPv6', 'ICMP (ping)', 'OSPF, BGP', 'NAT'],
    devices: ['Roteador', 'Firewall L3'],
    breaks: 'Sem rota para o destino, gateway errado, TTL expirado, conflito de IP.',
  },
  {
    n: 2,
    name: 'Enlace',
    pdu: 'Quadro (frame)',
    color: 'var(--green)',
    tcpip: 'Acesso à rede',
    role: 'Entrega o quadro dentro do mesmo segmento de rede, usando endereço MAC.',
    detail:
      'MAC é físico e queimado na placa — só tem significado dentro do link local. O switch aprende quais MACs vivem em cada porta e encaminha o quadro só para a porta certa. O FCS no fim do quadro detecta corrupção.',
    examples: ['Ethernet', 'ARP', 'VLAN (802.1Q)', 'Endereço MAC'],
    devices: ['Switch', 'Bridge', 'Access point'],
    breaks: 'VLAN errada, loop de switch, ARP spoofing, colisão/CRC error.',
  },
  {
    n: 1,
    name: 'Física',
    pdu: 'Bits',
    color: 'var(--amber)',
    tcpip: 'Acesso à rede',
    role: 'Transforma bits em sinal — elétrico, luz ou rádio — e joga no meio físico.',
    detail:
      'Aqui não existe endereço nem decisão: existe voltagem, pulso de luz e frequência. Pinagem, tipo de cabo, distância máxima e potência do sinal são problemas de camada 1 — e é onde muito chamado de rede realmente termina.',
    examples: ['Cabo UTP Cat6', 'Fibra óptica', 'RJ45', 'Wi-Fi (rádio)'],
    devices: ['Hub', 'Repetidor', 'Transceiver / SFP'],
    breaks: 'Cabo rompido, porta sem link, SFP queimado, interferência, sinal fraco.',
  },
]

/* Exercício de encapsulamento: descida da pilha, um cabeçalho por passo.
   `distractors` são erros comuns de prova — trocar MAC por IP, achar que a
   porta é de camada 3, etc. */
export const ENCAPSULATION_STEPS = [
  {
    layer: 7,
    pdu: 'Dados',
    adds: 'Cabeçalho HTTP',
    header: 'Cabeçalho HTTP',
    color: 'var(--violet)',
    caption: 'O navegador monta a requisição. Ainda não existe IP, porta nem MAC — só a mensagem.',
    payload: 'GET /login HTTP/1.1',
    distractors: ['Cabeçalho TCP', 'Cabeçalho IP'],
  },
  {
    layer: 4,
    pdu: 'Segmento',
    adds: 'Cabeçalho TCP (porta 443)',
    header: 'Cabeçalho TCP',
    color: 'var(--blue)',
    caption: 'O transporte acrescenta portas de origem e destino, número de sequência e flags. Agora é um segmento.',
    payload: '[HTTP]',
    distractors: ['Cabeçalho ARP', 'Trailer FCS'],
  },
  {
    layer: 3,
    pdu: 'Pacote',
    adds: 'Cabeçalho IP (destino 203.0.113.10)',
    header: 'Cabeçalho IP',
    color: 'var(--teal)',
    caption: 'A camada de rede coloca IP de origem e destino e o TTL. Agora o dado sabe para qual rede ir.',
    payload: '[TCP][HTTP]',
    distractors: ['Cabeçalho Ethernet', 'Cabeçalho HTTP'],
  },
  {
    layer: 2,
    pdu: 'Quadro',
    adds: 'Cabeçalho Ethernet (MAC) + FCS',
    header: 'Ethernet + FCS',
    color: 'var(--green)',
    caption: 'O enlace envelopa com MAC de origem e destino e fecha com o FCS, que detecta corrupção no caminho.',
    payload: '[IP][TCP][HTTP]',
    distractors: ['Cabeçalho IP', 'Cabeçalho TLS'],
  },
  {
    layer: 1,
    pdu: 'Bits',
    adds: 'Sinal no meio físico',
    header: 'Sinal físico',
    color: 'var(--amber)',
    caption: 'Nada é adicionado: o quadro vira pulso elétrico, luz ou rádio e entra no cabo.',
    payload: '[Ethernet][IP][TCP][HTTP]',
    distractors: ['Cabeçalho MAC', 'Número de sequência'],
  },
]

export const R1_QUIZ = [
  {
    id: 'r1-q1',
    domain: 'Camadas OSI',
    stem: 'Um usuário reclama que não consegue acessar um sistema interno. Você descobre que a estação recebeu IP e máscara corretos, faz ping no gateway, mas o ping para o servidor retorna "TTL expirado em trânsito". Em qual camada do modelo OSI está o problema?',
    options: ['Camada 1 — Física', 'Camada 2 — Enlace', 'Camada 3 — Rede', 'Camada 4 — Transporte'],
    answer: 2,
    explanation:
      'TTL é um campo do cabeçalho IP, decrementado a cada roteador. "TTL expirado" indica que o pacote ficou circulando entre roteadores — um problema de roteamento, ou seja, camada 3. Se fosse camada 1 ou 2 não haveria ping ao gateway; se fosse camada 4 o sintoma seria conexão recusada em uma porta específica.',
  },
  {
    id: 'r1-q2',
    domain: 'Encapsulamento',
    stem: 'Durante o encapsulamento de uma requisição HTTPS, qual é a ordem correta em que os cabeçalhos são adicionados, do primeiro ao último?',
    options: [
      'Ethernet → IP → TCP → HTTP',
      'HTTP → TCP → IP → Ethernet',
      'IP → TCP → Ethernet → HTTP',
      'TCP → HTTP → Ethernet → IP',
    ],
    answer: 1,
    explanation:
      'O encapsulamento desce a pilha: a aplicação gera os dados (HTTP), o transporte envelopa em segmento (TCP), a rede em pacote (IP) e o enlace em quadro (Ethernet). O receptor faz o caminho inverso, desencapsulando de fora para dentro.',
  },
  {
    id: 'r1-q3',
    domain: 'Dispositivos',
    stem: 'Você precisa segmentar o tráfego de dois departamentos que estão no mesmo andar, no mesmo switch, para que não enxerguem o tráfego um do outro. Qual recurso, e em qual camada, resolve isso?',
    options: [
      'VLAN, na camada 2',
      'Sub-rede, na camada 1',
      'ACL de porta, na camada 7',
      'NAT, na camada 3',
    ],
    answer: 0,
    explanation:
      'VLAN (802.1Q) separa domínios de broadcast dentro do mesmo switch e é um recurso de camada 2 — de enlace. Sub-redes são camada 3 e complementam a VLAN, mas sozinhas não isolam o tráfego no mesmo switch. NAT traduz endereços, não segmenta, e ACL de aplicação não é o mecanismo aqui.',
  },
  {
    id: 'r1-q4',
    domain: 'OSI vs. TCP/IP',
    stem: 'Ao comparar os modelos OSI e TCP/IP, quais camadas do OSI correspondem à camada de Aplicação do modelo TCP/IP?',
    options: [
      'Apenas a camada 7',
      'As camadas 5, 6 e 7',
      'As camadas 6 e 7',
      'As camadas 4, 5, 6 e 7',
    ],
    answer: 1,
    explanation:
      'O modelo TCP/IP condensa Sessão (5), Apresentação (6) e Aplicação (7) do OSI em uma única camada de Aplicação. As camadas 1 e 2 do OSI viram "Acesso à rede", a 3 vira "Internet" e a 4 permanece como Transporte.',
  },
]
