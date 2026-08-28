/* Simulado Security+ SY0-701 — 25 questões ORIGINAIS, estilo cenário.
   Nada aqui é reproduzido de prova real (README §6). A distribuição segue o
   peso oficial dos domínios: D1 12% (3), D2 22% (6), D3 18% (4), D4 28% (7),
   D5 20% (5). */

export const DOMAINS = [
  { id: 'D1', label: 'D1 · Conceitos Gerais', weight: 12, color: 'var(--cyan)' },
  { id: 'D2', label: 'D2 · Ameaças e Vulnerabilidades', weight: 22, color: 'var(--red)' },
  { id: 'D3', label: 'D3 · Arquitetura', weight: 18, color: 'var(--teal)' },
  { id: 'D4', label: 'D4 · Operações', weight: 28, color: 'var(--blue)' },
  { id: 'D5', label: 'D5 · Gestão do Programa', weight: 20, color: 'var(--violet)' },
]

export const SECPLUS_QUESTIONS = [
  // ---------- D1 · Conceitos Gerais (12%) ----------
  {
    id: 'sp-01',
    domain: 'D1',
    stem: 'Uma auditoria apontou que a empresa não consegue implementar autenticação multifator no sistema legado de folha de pagamento, porque o fornecedor não suporta. Para reduzir o risco, a equipe restringiu o acesso ao sistema a uma única sub-rede administrativa monitorada. Como esse controle é classificado?',
    options: ['Controle preventivo', 'Controle compensatório', 'Controle de dissuasão', 'Controle corretivo'],
    answer: 1,
    explanation:
      'Controle compensatório é o que se aplica quando o controle exigido não pode ser implementado, oferecendo proteção equivalente. A restrição de rede não é o controle originalmente requerido (MFA), mas cobre o risco enquanto ele não existe. Preventivo descreve a função técnica; a classificação que a questão pede é a de compensação.',
  },
  {
    id: 'sp-02',
    domain: 'D1',
    stem: 'Um gestor nega ter aprovado uma transferência bancária, embora exista registro de aprovação com o usuário dele. A empresa quer garantir que, em casos futuros, o autor de uma aprovação não possa negar a autoria. Qual propriedade deve ser implementada?',
    options: ['Confidencialidade', 'Integridade', 'Não-repúdio', 'Disponibilidade'],
    answer: 2,
    explanation:
      'Não-repúdio garante que o autor de uma ação não possa negá-la, normalmente via assinatura digital com chave privada exclusiva do usuário e log de auditoria. Integridade garante que o dado não foi alterado, mas não prova quem o produziu; confidencialidade e disponibilidade não tratam de autoria.',
  },
  {
    id: 'sp-03',
    domain: 'D1',
    stem: 'A empresa adotou um modelo em que nenhuma requisição é confiável por origem: mesmo o tráfego interno é autenticado e autorizado a cada acesso, com decisão tomada por um componente e execução por outro. Como se chamam, respectivamente, esses dois componentes no modelo Zero Trust?',
    options: [
      'Policy Engine e Policy Enforcement Point',
      'Control Plane e Trust Zone',
      'Identity Provider e Service Provider',
      'Data Owner e Data Custodian',
    ],
    answer: 0,
    explanation:
      'No Zero Trust, o Policy Engine (no plano de controle) decide conceder ou negar o acesso, e o Policy Enforcement Point (no plano de dados) aplica a decisão. IdP e SP são papéis de federação; Data Owner e Custodian são papéis de governança de dados.',
  },

  // ---------- D2 · Ameaças, Vulnerabilidades e Mitigações (22%) ----------
  {
    id: 'sp-04',
    domain: 'D2',
    stem: 'O SOC identifica que um adversário permaneceu na rede por sete meses sem exfiltrar volume relevante, usando apenas ferramentas nativas do sistema operacional e credenciais válidas, com foco em documentos de pesquisa. O tráfego de saída imitava atualizações legítimas. Qual perfil de ator melhor descreve o caso?',
    options: [
      'Script kiddie buscando notoriedade',
      'Hacktivista com motivação ideológica',
      'Ameaça persistente avançada, provavelmente patrocinada por Estado',
      'Insider acidental sem intenção maliciosa',
    ],
    answer: 2,
    explanation:
      'Persistência longa, uso de living-off-the-land, foco em propriedade intelectual e evasão sofisticada são marcas de APT com recursos de Estado. Script kiddie usa ferramentas prontas e é barulhento; hacktivista busca visibilidade; insider acidental não mantém canal encoberto.',
  },
  {
    id: 'sp-05',
    domain: 'D2',
    stem: 'Um sistema valida se o usuário tem permissão sobre um arquivo e, alguns milissegundos depois, abre o arquivo pelo caminho informado. Um atacante substitui o caminho por um link simbólico nesse intervalo e obtém acesso a um arquivo protegido. Qual vulnerabilidade foi explorada?',
    options: [
      'Buffer overflow',
      'Condição de corrida do tipo TOCTOU',
      'Injeção de SQL de segunda ordem',
      'Desserialização insegura',
    ],
    answer: 1,
    explanation:
      'TOCTOU (time-of-check to time-of-use) é a condição de corrida em que o estado muda entre a verificação e o uso do recurso. A mitigação é operar sobre o descritor já aberto, e não sobre o caminho, ou usar operações atômicas. As demais opções não dependem da janela temporal entre checagem e uso.',
  },
  {
    id: 'sp-06',
    domain: 'D2',
    stem: 'Colaboradores do financeiro receberam ligações de alguém que se identificou como o novo diretor, com voz muito parecida com a do executivo real, pedindo urgência na liberação de um pagamento fora do processo. Qual combinação de técnicas está em uso?',
    options: [
      'Smishing com typosquatting',
      'Vishing com deepfake de voz e pretexto de autoridade',
      'Watering hole com drive-by download',
      'Shoulder surfing com tailgating',
    ],
    answer: 1,
    explanation:
      'A ligação caracteriza vishing; a imitação da voz é deepfake; e a alegação de ser o diretor com pressa explora os princípios de autoridade e urgência. Smishing é por SMS, watering hole compromete um site legítimo frequentado pelo alvo e as duas últimas são técnicas físicas.',
  },
  {
    id: 'sp-07',
    domain: 'D2',
    stem: 'Após comprometer uma estação, o atacante consulta o Active Directory em busca de contas de serviço com SPN registrado, solicita tickets para esses serviços e os leva para quebra de senha offline. Qual técnica está sendo usada e qual mitigação é a mais eficaz?',
    options: [
      'Pass-the-hash; desabilitar NTLM na rede',
      'Kerberoasting; usar senhas longas e aleatórias em contas de serviço, preferindo gMSA',
      'Golden ticket; rotacionar a senha do usuário comprometido',
      'DCSync; remover o usuário do grupo Backup Operators',
    ],
    answer: 1,
    explanation:
      'Kerberoasting explora o fato de qualquer usuário autenticado poder pedir um ticket de serviço cifrado com o hash da senha da conta de serviço, quebrável offline. Senhas longas e aleatórias tornam a quebra inviável, e gMSA automatiza a rotação. Golden ticket exige o hash da conta krbtgt, e DCSync exige privilégios de replicação.',
  },
  {
    id: 'sp-08',
    domain: 'D2',
    stem: 'Uma aplicação web permite que o usuário informe um ID numérico na URL para consultar sua fatura. Trocando o ID, um analista consegue visualizar faturas de outros clientes. Qual é a falha e a mitigação correta?',
    options: [
      'Cross-site scripting; sanitizar a entrada com escape de HTML',
      'Referência direta insegura a objeto; validar autorização por objeto no servidor',
      'Cross-site request forgery; exigir token anti-CSRF',
      'Injeção de comando; usar listas de permissão de caracteres',
    ],
    answer: 1,
    explanation:
      'É uma IDOR (insecure direct object reference), subtipo de falha de controle de acesso: a aplicação autentica o usuário mas não verifica se ele é dono do objeto solicitado. A correção é checar a autorização no servidor a cada requisição — ocultar ou ofuscar o ID não resolve.',
  },
  {
    id: 'sp-09',
    domain: 'D2',
    stem: 'Um fornecedor de software teve seu servidor de build comprometido, e uma atualização assinada e legítima passou a distribuir um backdoor para todos os clientes. Qual tipo de ataque é esse e qual controle reduziria a exposição do cliente?',
    options: [
      'Ataque de cadeia de suprimentos; validar SBOM e monitorar comportamento pós-atualização',
      'Ataque on-path; forçar HSTS em todas as conexões',
      'Ataque de força bruta; aplicar bloqueio de conta',
      'Ameaça interna; aplicar segregação de funções',
    ],
    answer: 0,
    explanation:
      'Comprometer o fornecedor para atingir seus clientes por um canal confiável é ataque de cadeia de suprimentos. Como a assinatura permanece válida, a defesa do cliente passa por conhecer os componentes (SBOM), restringir o que o software pode fazer e monitorar comportamento anômalo após atualizações.',
  },

  // ---------- D3 · Arquitetura de Segurança (18%) ----------
  {
    id: 'sp-10',
    domain: 'D3',
    stem: 'A diretoria definiu que, em caso de desastre, o sistema de faturamento pode ficar indisponível por no máximo 4 horas e que a perda máxima aceitável de dados é de 15 minutos. Como esses dois números são chamados?',
    options: [
      'RTO de 4 horas e RPO de 15 minutos',
      'RPO de 4 horas e RTO de 15 minutos',
      'MTTR de 4 horas e MTBF de 15 minutos',
      'SLA de 4 horas e MTTF de 15 minutos',
    ],
    answer: 0,
    explanation:
      'RTO (Recovery Time Objective) é o tempo máximo tolerável de indisponibilidade; RPO (Recovery Point Objective) é a janela máxima de dados que se aceita perder, e determina a frequência do backup ou da replicação. MTTR e MTBF são métricas de confiabilidade, não objetivos de recuperação.',
  },
  {
    id: 'sp-11',
    domain: 'D3',
    stem: 'A empresa mantém três cópias dos dados críticos, em dois tipos diferentes de mídia, sendo uma cópia fora do site principal. Após um ransomware, descobriu-se que a cópia externa também foi cifrada porque estava em um compartilhamento sempre montado. Qual ajuste atende melhor à intenção da regra 3-2-1?',
    options: [
      'Aumentar para quatro cópias no mesmo storage',
      'Manter ao menos uma cópia offline ou imutável, isolada de gravação pela rede',
      'Reduzir o RPO para 5 minutos com replicação síncrona',
      'Trocar backup completo por incremental diário',
    ],
    answer: 1,
    explanation:
      'A regra 3-2-1 pressupõe que a cópia externa esteja realmente isolada. Contra ransomware, isso significa air gap ou imutabilidade (WORM, retenção bloqueada), impedindo que credenciais comprometidas alterem o backup. Replicação síncrona propaga a cifragem mais rápido, e mudar o tipo de backup não resolve o isolamento.',
  },
  {
    id: 'sp-12',
    domain: 'D3',
    stem: 'Ao migrar para IaaS em nuvem pública, a equipe questiona quem responde pelo quê. No modelo de responsabilidade compartilhada, qual item é responsabilidade do CLIENTE em IaaS?',
    options: [
      'Segurança física do datacenter',
      'Patching do hipervisor',
      'Patching do sistema operacional da máquina virtual',
      'Manutenção da rede física do provedor',
    ],
    answer: 2,
    explanation:
      'Em IaaS o provedor cuida da infraestrutura até o hipervisor — instalações físicas, hardware e virtualização. Do sistema operacional convidado para cima (patches, configuração, aplicação, dados e identidade) a responsabilidade é do cliente. Em PaaS e SaaS essa linha sobe progressivamente.',
  },
  {
    id: 'sp-13',
    domain: 'D3',
    stem: 'Uma equipe precisa usar dados reais de cartão em ambiente de testes, sem que o número original transite ou seja armazenado, e sem manter relação matemática reversível com o valor original. Qual técnica atende ao requisito?',
    options: [
      'Criptografia simétrica com AES-256',
      'Tokenização com cofre de mapeamento',
      'Hash com salt',
      'Ofuscação de código',
    ],
    answer: 1,
    explanation:
      'Tokenização substitui o dado por um token sem relação matemática com o original; a correspondência vive apenas em um cofre protegido, o que tira o ambiente de teste do escopo do dado sensível. Criptografia é reversível com a chave, e hash é irreversível — o que impede recuperar o valor quando ele for legitimamente necessário.',
  },

  // ---------- D4 · Operações de Segurança (28%) ----------
  {
    id: 'sp-14',
    domain: 'D4',
    stem: 'Durante a resposta a um incidente de ransomware, a equipe isolou as máquinas afetadas da rede, mas manteve-as ligadas. Em qual fase do ciclo do NIST SP 800-61 essa ação se encaixa?',
    options: ['Preparação', 'Detecção e análise', 'Contenção', 'Erradicação'],
    answer: 2,
    explanation:
      'Isolar para impedir a propagação é contenção. Manter as máquinas ligadas preserva a memória volátil para a análise forense. A erradicação vem depois, quando o artefato malicioso é removido; a recuperação restaura os serviços.',
  },
  {
    id: 'sp-15',
    domain: 'D4',
    stem: 'Um analista precisa coletar evidências de um servidor comprometido que ainda está ligado. Seguindo a ordem de volatilidade, qual fonte deve ser coletada PRIMEIRO?',
    options: [
      'Backups em fita armazenados off-site',
      'Conteúdo do disco rígido',
      'Cache de CPU, memória RAM e conexões de rede ativas',
      'Logs arquivados no servidor de log central',
    ],
    answer: 2,
    explanation:
      'A ordem de volatilidade manda coletar do mais efêmero para o mais durável: registradores e cache, RAM e estado de rede, depois disco, e por último mídias de arquivamento. Desligar a máquina antes de capturar a memória destrói chaves, processos e conexões que só existem em RAM.',
  },
  {
    id: 'sp-16',
    domain: 'D4',
    stem: 'Após a coleta de uma imagem de disco, a defesa questiona se a evidência pode ter sido alterada entre a coleta e a perícia. Qual conjunto de práticas sustenta a admissibilidade da evidência?',
    options: [
      'Cadeia de custódia documentada e hash da imagem calculado e conferido',
      'Criptografia da imagem com a chave do analista',
      'Compressão da imagem e armazenamento em nuvem privada',
      'Assinatura do relatório final pelo gestor da área',
    ],
    answer: 0,
    explanation:
      'A cadeia de custódia registra quem teve posse da evidência, quando e por quê; o hash calculado na coleta e reconferido depois prova que o conteúdo não mudou. Criptografar ou comprimir protege o acesso, mas não demonstra integridade nem rastreia a posse.',
  },
  {
    id: 'sp-17',
    domain: 'D4',
    stem: 'A empresa quer que administradores não tenham privilégio permanente: o acesso elevado deve ser solicitado, aprovado, concedido por tempo limitado e revogado automaticamente. Qual controle de IAM descreve isso?',
    options: [
      'Single Sign-On com federação SAML',
      'Acesso privilegiado just-in-time com cofre de credenciais',
      'Controle de acesso baseado em atributos',
      'Provisionamento automatizado via SCIM',
    ],
    answer: 1,
    explanation:
      'Acesso just-in-time concede privilégio elevado apenas durante uma janela aprovada, reduzindo a superfície de contas administrativas permanentes — normalmente com cofre (PAM), aprovação e gravação de sessão. SSO trata de autenticação, ABAC de política de autorização e SCIM do ciclo de vida da conta.',
  },
  {
    id: 'sp-18',
    domain: 'D4',
    stem: 'O scanner de vulnerabilidades apontou uma falha crítica em um servidor. Ao investigar, o analista confirma que a versão instalada já foi corrigida por um backport da distribuição, e o serviço não é vulnerável. Como esse achado deve ser classificado e tratado?',
    options: [
      'Falso positivo; documentar a validação e criar exceção com revisão periódica',
      'Falso negativo; aumentar a frequência do scan',
      'Verdadeiro positivo; aplicar o patch imediatamente',
      'Risco aceito; encerrar sem registro',
    ],
    answer: 0,
    explanation:
      'O scanner acusou algo que não existe: é falso positivo, comum quando a detecção se baseia em número de versão e a distribuição faz backport da correção. O tratamento correto é registrar a evidência da validação e abrir uma exceção com data de revisão — não encerrar silenciosamente.',
  },
  {
    id: 'sp-19',
    domain: 'D4',
    stem: 'Ao revisar o hardening de servidores Linux expostos, qual medida traz a maior redução de superfície de ataque?',
    options: [
      'Trocar a porta padrão do SSH para uma porta alta',
      'Desabilitar serviços e remover pacotes não utilizados',
      'Aumentar o tamanho mínimo da senha local para 20 caracteres',
      'Habilitar banner de aviso legal no login',
    ],
    answer: 1,
    explanation:
      'Superfície de ataque é a soma do que está exposto e pode ser explorado; desligar serviços e remover software desnecessário elimina alvos inteiros. Mudar a porta do SSH é segurança por obscuridade, senha longa não ajuda se a autenticação for por chave, e banner é controle de dissuasão e requisito legal.',
  },
  {
    id: 'sp-20',
    domain: 'D4',
    stem: 'O SIEM gera 400 alertas diários de logins de países incomuns, dos quais 95% são de colaboradores em viagem usando VPN corporativa. A equipe está saturada. Qual ação melhora a eficiência sem perder cobertura?',
    options: [
      'Desativar a regra de login geográfico',
      'Ajustar a regra correlacionando com viagens aprovadas e o pool de saída da VPN, elevando severidade só em impossible travel',
      'Aumentar o limiar para 1000 alertas por dia',
      'Encaminhar todos os alertas ao gestor de cada usuário',
    ],
    answer: 1,
    explanation:
      'O problema é falta de contexto na regra, não excesso de detecção. Correlacionar com fontes autoritativas (RH, VPN) e reservar alta severidade para o que é fisicamente impossível reduz o ruído mantendo a detecção. Desativar a regra cria ponto cego e repassar tudo apenas transfere a fadiga.',
  },

  // ---------- D5 · Gestão do Programa de Segurança (20%) ----------
  {
    id: 'sp-21',
    domain: 'D5',
    stem: 'Um ativo vale R$ 500.000. Estima-se que um incêndio destruiria 40% do seu valor e que isso ocorre, em média, uma vez a cada 20 anos. Qual é a expectativa de perda anual (ALE)?',
    options: ['R$ 200.000', 'R$ 25.000', 'R$ 10.000', 'R$ 40.000'],
    answer: 2,
    explanation:
      'SLE = valor do ativo × fator de exposição = 500.000 × 0,40 = 200.000. ARO = 1/20 = 0,05. ALE = SLE × ARO = 200.000 × 0,05 = R$ 10.000 por ano. Esse é o teto racional para o gasto anual com um controle que elimine esse risco.',
  },
  {
    id: 'sp-22',
    domain: 'D5',
    stem: 'A empresa vai contratar um SaaS que processará dados de clientes e quer evidência independente de que os controles do fornecedor operaram efetivamente ao longo do último ano. Qual documento deve ser solicitado?',
    options: [
      'Relatório SOC 2 Tipo II',
      'Relatório SOC 1 Tipo I',
      'Certificado ISO 9001',
      'Política interna de segurança do fornecedor',
    ],
    answer: 0,
    explanation:
      'SOC 2 trata dos critérios de confiança (segurança, disponibilidade, confidencialidade, entre outros) e o Tipo II avalia a efetividade operacional dos controles durante um período — normalmente 6 a 12 meses. O Tipo I é um retrato pontual do desenho, SOC 1 foca em controles financeiros e ISO 9001 é qualidade.',
  },
  {
    id: 'sp-23',
    domain: 'D5',
    stem: 'Durante a negociação com um fornecedor crítico, o jurídico pergunta qual instrumento garante que a empresa possa verificar, por conta própria, os controles de segurança do fornecedor durante a vigência do contrato. Qual cláusula atende a isso?',
    options: [
      'Acordo de nível de serviço (SLA)',
      'Cláusula de direito de auditoria',
      'Memorando de entendimento (MOU)',
      'Termo de confidencialidade (NDA)',
    ],
    answer: 1,
    explanation:
      'A cláusula de direito de auditoria (right-to-audit) autoriza contratualmente a contratante a examinar controles, evidências e instalações do fornecedor. SLA define metas de desempenho, MOU é declaração de intenções sem força equivalente e NDA trata do sigilo da informação trocada.',
  },
  {
    id: 'sp-24',
    domain: 'D5',
    stem: 'Uma empresa decide não operar seu próprio datacenter e contrata um provedor de nuvem, transferindo parte da exposição financeira restante para uma apólice de seguro cibernético. Como se classificam, respectivamente, essas duas decisões?',
    options: [
      'Mitigação e aceitação',
      'Evitar e transferir',
      'Transferir e evitar',
      'Aceitação e mitigação',
    ],
    answer: 1,
    explanation:
      'Deixar de executar a atividade que gera o risco é evitar (avoidance). Repassar o impacto financeiro a terceiro por contrato ou apólice é transferir. Mitigar é reduzir probabilidade ou impacto com controles, e aceitar é assumir conscientemente o risco residual.',
  },
  {
    id: 'sp-25',
    domain: 'D5',
    stem: 'No programa de privacidade, quem determina a finalidade e os meios do tratamento de um conjunto de dados pessoais, respondendo por sua classificação e pelas regras de acesso?',
    options: ['Data custodian', 'Data processor', 'Data owner', 'Data subject'],
    answer: 2,
    explanation:
      'O data owner (proprietário do dado) é o papel de negócio que responde pela finalidade, classificação e autorização de acesso. O custodian implementa e opera os controles no dia a dia, o processor trata os dados em nome do controlador e o data subject é a pessoa a quem os dados se referem.',
  },
]
