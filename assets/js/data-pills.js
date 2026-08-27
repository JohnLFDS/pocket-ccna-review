/* ═══════════════════════════════════════════════════════════════
   DATA — PÍLULAS TEÓRICAS  (29 pílulas)
   Para adicionar: copie um objeto e ajuste id, cat, icon, title, html
═══════════════════════════════════════════════════════════════ */
const PILLS = [
  {
    id: 1, cat: "NET", icon: "🌐",
    title: "Modelo OSI — 7 Camadas",
    html: `
      <table class="mini-table">
        <tr><th>#</th><th>Camada</th><th>PDU</th><th>Exemplo</th></tr>
        <tr><td><b>7</b></td><td>Aplicação</td><td>Data</td><td>HTTP, DNS, SMTP</td></tr>
        <tr><td><b>6</b></td><td>Apresentação</td><td>Data</td><td>TLS, JPEG</td></tr>
        <tr><td><b>5</b></td><td>Sessão</td><td>Data</td><td>NetBIOS, RPC</td></tr>
        <tr><td><b>4</b></td><td>Transporte</td><td>Segmento</td><td>TCP, UDP</td></tr>
        <tr><td><b>3</b></td><td>Rede</td><td>Pacote</td><td>IP, ICMP</td></tr>
        <tr><td><b>2</b></td><td>Enlace</td><td>Frame</td><td>Ethernet, PPP</td></tr>
        <tr><td><b>1</b></td><td>Física</td><td>Bit</td><td>Cabo, Wi-Fi</td></tr>
      </table>
      <ul style="margin-top:8px">
        <li>Mnemônico (top→down): <b>"All People Seem To Need Data Processing"</b></li>
        <li>Switch opera na <span class="hl">L2</span> · Router na <span class="hl">L3</span></li>
      </ul>`
  },
  {
    id: 2, cat: "NET", icon: "📦",
    title: "TCP vs UDP",
    html: `
      <table class="mini-table">
        <tr><th>Característica</th><th>TCP</th><th>UDP</th></tr>
        <tr><td>Confiável</td><td><span class="ok">Sim</span></td><td><span class="bad">Não</span></td></tr>
        <tr><td>Orientado a conexão</td><td><span class="ok">Sim</span></td><td><span class="bad">Não</span></td></tr>
        <tr><td>Controle de fluxo</td><td><span class="ok">Sim</span></td><td><span class="bad">Não</span></td></tr>
        <tr><td>Overhead</td><td>Alto</td><td>Baixo</td></tr>
        <tr><td>Uso típico</td><td>HTTP, FTP, SSH</td><td>DNS, VoIP, TFTP</td></tr>
      </table>
      <ul style="margin-top:8px">
        <li>Handshake TCP: <span class="hl">SYN → SYN-ACK → ACK</span></li>
        <li>Encerramento TCP: <span class="hl">FIN → ACK → FIN → ACK</span></li>
      </ul>`
  },
  {
    id: 3, cat: "NET", icon: "🔢",
    title: "IPv4 — Classes e CIDR",
    html: `
      <table class="mini-table">
        <tr><th>Classe</th><th>Faixa 1º Octeto</th><th>Máscara Padrão</th><th>Hosts</th></tr>
        <tr><td><b>A</b></td><td>1 – 126</td><td>/8</td><td>~16,7M</td></tr>
        <tr><td><b>B</b></td><td>128 – 191</td><td>/16</td><td>~65K</td></tr>
        <tr><td><b>C</b></td><td>192 – 223</td><td>/24</td><td>254</td></tr>
        <tr><td><b>D</b></td><td>224 – 239</td><td>Multicast</td><td>—</td></tr>
      </table>
      <ul style="margin-top:8px">
        <li>Privados: <span class="hl">10.0.0.0/8</span> · <span class="hl">172.16.0.0/12</span> · <span class="hl">192.168.0.0/16</span></li>
        <li>Loopback: <span class="hl">127.0.0.0/8</span></li>
        <li>APIPA: <span class="warn">169.254.0.0/16</span> (sem DHCP)</li>
      </ul>`
  },
  {
    id: 4, cat: "ACC", icon: "🔌",
    title: "VLANs — Conceitos e Trunk",
    html: `
      <ul>
        <li><b>VLAN</b> = domínio de broadcast lógico separado no switch</li>
        <li><b>Access port</b>: pertence a <span class="hl">1 VLAN</span>, sem tag</li>
        <li><b>Trunk port</b>: carrega <span class="hl">múltiplas VLANs</span> com tag <b>802.1Q</b></li>
        <li><b>Native VLAN</b>: tráfego enviado <span class="warn">sem tag</span> no trunk (padrão: VLAN 1)</li>
        <li>Range padrão: <b>1–1005</b> · Extended: <b>1006–4094</b></li>
      </ul>
      <table class="mini-table" style="margin-top:8px">
        <tr><th>Modo</th><th>Comando</th></tr>
        <tr><td>Access</td><td>switchport mode access</td></tr>
        <tr><td>Trunk</td><td>switchport mode trunk</td></tr>
        <tr><td>Atribuir VLAN</td><td>switchport access vlan 10</td></tr>
        <tr><td>Nativa</td><td>switchport trunk native vlan 99</td></tr>
      </table>`
  },
  {
    id: 5, cat: "ACC", icon: "🔗",
    title: "STP — Spanning Tree Protocol",
    html: `
      <ul>
        <li>Evita <span class="bad">loops</span> na camada 2 bloqueando portas redundantes</li>
        <li><b>Root Bridge</b>: switch com menor <span class="hl">Bridge ID</span> (prioridade + MAC)</li>
        <li>Prioridade padrão: <b>32768</b> (múltiplos de 4096)</li>
      </ul>
      <table class="mini-table" style="margin-top:8px">
        <tr><th>Estado STP</th><th>Descrição</th></tr>
        <tr><td><span class="bad">Blocking</span></td><td>Recebe BPDUs, sem encaminhamento</td></tr>
        <tr><td><span class="warn">Listening</span></td><td>Processa BPDUs, sem aprendizado</td></tr>
        <tr><td><span class="warn">Learning</span></td><td>Aprende MACs, sem encaminhamento</td></tr>
        <tr><td><span class="ok">Forwarding</span></td><td>Operação normal</td></tr>
        <tr><td><span class="muted">Disabled</span></td><td>Porta desligada</td></tr>
      </table>
      <ul style="margin-top:6px">
        <li><b>PortFast</b>: pula Listening/Learning em portas de host</li>
        <li><b>BPDU Guard</b>: desliga porta se receber BPDU</li>
        <li><b>RSTP (802.1w)</b>: convergência muito mais rápida</li>
      </ul>`
  },
  {
    id: 6, cat: "IPC", icon: "🛣️",
    title: "OSPF — Estados de Adjacência",
    html: `
      <table class="mini-table">
        <tr><th>Estado</th><th>O que acontece</th></tr>
        <tr><td><span class="bad">Down</span></td><td>Nenhum Hello recebido</td></tr>
        <tr><td><span class="warn">Init</span></td><td>Hello recebido, eu não estou no pacote</td></tr>
        <tr><td><span class="warn">2-Way</span></td><td>Bidirecional; DR/BDR eleito (redes multi-acesso)</td></tr>
        <tr><td><span class="warn">ExStart</span></td><td>Negocia Master/Slave, DBD inicial</td></tr>
        <tr><td><span class="warn">Exchange</span></td><td>Troca DBDs (resumo do LSDB)</td></tr>
        <tr><td><span class="warn">Loading</span></td><td>Solicita LSAs ausentes via LSR</td></tr>
        <tr><td><span class="ok">Full</span></td><td>Adjacência completa — banco de dados sincronizado</td></tr>
      </table>
      <ul style="margin-top:6px">
        <li>DR/BDR: eleitos em redes <span class="hl">Broadcast/NBMA</span></li>
        <li>Hello interval padrão (Ethernet): <b>10s</b> · Dead: <b>40s</b></li>
        <li>Metric = <span class="hl">10⁸ / bandwidth (bps)</span></li>
      </ul>
      <div style="background:#3a1c1c;border:1px solid #f8514966;border-radius:6px;padding:8px 10px;margin-top:8px;font-size:12px">
        <span class="bad">⚠ PEGADINHA DA PROVA — auto-cost reference-bandwidth</span><br>
        <span style="color:var(--text)">Por padrão, a referência de custo OSPF é <b>100 Mbps</b>. Isso faz FastEthernet (100 Mbps) e GigabitEthernet (1 Gbps) receberem o <b>mesmo custo = 1</b>, tornando impossível diferenciar os links.</span><br><br>
        <span style="color:var(--text)">Solução obrigatória em ambientes com GigE ou superiores:</span><br>
        <code style="color:var(--accent);font-family:monospace">router ospf 1</code><br>
        <code style="color:var(--accent);font-family:monospace">auto-cost reference-bandwidth 1000</code>
        <span style="color:var(--muted);font-size:11px"> ← ajusta para 1 Gbps (use 10000 para 10 GigE)</span>
      </div>`
  },
  {
    id: 7, cat: "IPC", icon: "⚖️",
    title: "Roteamento Estático vs Dinâmico",
    html: `
      <table class="mini-table">
        <tr><th></th><th>Estático</th><th>Dinâmico</th></tr>
        <tr><td>Configuração</td><td>Manual</td><td>Automática</td></tr>
        <tr><td>Escalabilidade</td><td><span class="bad">Baixa</span></td><td><span class="ok">Alta</span></td></tr>
        <tr><td>Convergência</td><td><span class="ok">Imediata</span></td><td>Depende do protocolo</td></tr>
        <tr><td>Overhead CPU</td><td><span class="ok">Zero</span></td><td>Moderado/Alto</td></tr>
        <tr><td>Segurança</td><td><span class="ok">Maior</span></td><td>Menor</td></tr>
      </table>
      <ul style="margin-top:8px">
        <li>Rota estática padrão: <span class="hl">ip route 0.0.0.0 0.0.0.0 [next-hop]</span></li>
        <li>AD: <b>Direta=0</b>, <b>Estática=1</b>, <b>OSPF=110</b>, <b>RIP=120</b>, <b>EIGRP=90</b></li>
      </ul>`
  },
  {
    id: 8, cat: "SVC", icon: "🕐",
    title: "DHCP — Processo DORA",
    html: `
      <ul>
        <li><span class="hl">D</span>iscover — Cliente broadcast buscando servidor DHCP</li>
        <li><span class="hl">O</span>ffer — Servidor oferece IP + configurações</li>
        <li><span class="hl">R</span>equest — Cliente confirma qual oferta aceita</li>
        <li><span class="hl">A</span>cknowledge — Servidor confirma atribuição</li>
      </ul>
      <table class="mini-table" style="margin-top:8px">
        <tr><th>Comando</th><th>Função</th></tr>
        <tr><td>ip helper-address</td><td>Relay em outro segmento</td></tr>
        <tr><td>ip dhcp excluded-address</td><td>Reserva IPs do pool</td></tr>
        <tr><td>ip dhcp pool NOME</td><td>Cria pool</td></tr>
        <tr><td>show ip dhcp binding</td><td>Lista leases ativos</td></tr>
      </table>`
  },
  {
    id: 9, cat: "SVC", icon: "📋",
    title: "Syslog — Níveis de Severidade",
    html: `
      <table class="mini-table">
        <tr><th>Nível</th><th>Nome</th><th>Descrição</th></tr>
        <tr><td><span class="bad">0</span></td><td>Emergency</td><td>Sistema inutilizável</td></tr>
        <tr><td><span class="bad">1</span></td><td>Alert</td><td>Ação imediata necessária</td></tr>
        <tr><td><span class="bad">2</span></td><td>Critical</td><td>Condição crítica</td></tr>
        <tr><td><span class="bad">3</span></td><td>Error</td><td>Condição de erro</td></tr>
        <tr><td><span class="warn">4</span></td><td>Warning</td><td>Aviso</td></tr>
        <tr><td><span class="warn">5</span></td><td>Notice</td><td>Normal mas significante</td></tr>
        <tr><td><span class="ok">6</span></td><td>Informational</td><td>Mensagem informativa</td></tr>
        <tr><td><span class="ok">7</span></td><td>Debug</td><td>Debug detalhado</td></tr>
      </table>
      <ul style="margin-top:6px">
        <li>Mnemônico: <b>"Every Awful Cisco Engineer Will Need Daily Inspiration"</b></li>
        <li>Configurar: <span class="hl">logging host [IP]</span> · <span class="hl">logging trap [level]</span></li>
      </ul>`
  },
  {
    id: 10, cat: "SEC", icon: "🔒",
    title: "ACL — Standard vs Extended",
    html: `
      <table class="mini-table">
        <tr><th></th><th>Standard (1-99)</th><th>Extended (100-199)</th></tr>
        <tr><td>Filtra por</td><td>IP de origem</td><td>Origem, destino, porta, protocolo</td></tr>
        <tr><td>Posicionamento</td><td>Próximo ao <span class="warn">destino</span></td><td>Próximo à <span class="hl">origem</span></td></tr>
        <tr><td>Granularidade</td><td>Baixa</td><td>Alta</td></tr>
      </table>
      <ul style="margin-top:8px">
        <li>Regra implícita no final: <span class="bad">deny any any</span></li>
        <li>ACLs são processadas de <b>cima para baixo</b>; primeira correspondência vence</li>
        <li>Aplicar na interface: <span class="hl">ip access-group [ACL] in|out</span></li>
        <li>Named ACL: <span class="hl">ip access-list extended NOME</span> (editável)</li>
      </ul>`
  },
  {
    id: 11, cat: "SEC", icon: "🛡️",
    title: "Port Security",
    html: `
      <ul>
        <li>Limita <b>MACs</b> permitidos por porta do switch</li>
        <li>Modo: <span class="hl">switchport port-security</span> (requer access mode)</li>
        <li>Max MACs padrão: <b>1</b></li>
      </ul>
      <table class="mini-table" style="margin-top:8px">
        <tr><th>Violation Mode</th><th>Ação</th><th>Log</th><th>Porta</th></tr>
        <tr><td><span class="bad">Shutdown</span></td><td>err-disabled</td><td><span class="ok">Sim</span></td><td>Desativa</td></tr>
        <tr><td><span class="warn">Restrict</span></td><td>Descarta</td><td><span class="ok">Sim</span></td><td>Mantém up</td></tr>
        <tr><td>Protect</td><td>Descarta</td><td><span class="bad">Não</span></td><td>Mantém up</td></tr>
      </table>
      <ul style="margin-top:6px">
        <li>Sticky MAC: <span class="hl">switchport port-security mac-address sticky</span></li>
        <li>Reabilitar porta: <span class="hl">shutdown</span> → <span class="hl">no shutdown</span></li>
      </ul>`
  },
  {
    id: 12, cat: "SVC", icon: "🔄",
    title: "NAT — Tipos e Terminologia",
    html: `
      <table class="mini-table">
        <tr><th>Tipo</th><th>Descrição</th></tr>
        <tr><td><b>Static NAT</b></td><td>1 IP privado ↔ 1 IP público fixo</td></tr>
        <tr><td><b>Dynamic NAT</b></td><td>Pool de IPs públicos compartilhados</td></tr>
        <tr><td><b>PAT / Overload</b></td><td>Muitos IPs privados → 1 IP público (porta diferente)</td></tr>
      </table>
      <ul style="margin-top:8px">
        <li><b>Inside Local</b>: IP privado do host interno</li>
        <li><b>Inside Global</b>: IP público que representa o host interno</li>
        <li><b>Outside Local</b>: IP do servidor externo visto de dentro</li>
        <li><b>Outside Global</b>: IP real do servidor externo</li>
        <li>Verificar: <span class="hl">show ip nat translations</span></li>
      </ul>`
  },
  {
    id: 13, cat: "AUT", icon: "🤖",
    title: "SDN e Planos de Controle",
    html: `
      <ul>
        <li><b>Data Plane</b>: encaminha pacotes (hardware / ASIC)</li>
        <li><b>Control Plane</b>: decide para onde encaminhar (protocolos de roteamento)</li>
        <li><b>Management Plane</b>: administração (SSH, SNMP, NETCONF)</li>
      </ul>
      <table class="mini-table" style="margin-top:8px">
        <tr><th>Tipo SDN</th><th>Descrição</th></tr>
        <tr><td>Underlay</td><td>Rede física IP/MPLS tradicional</td></tr>
        <tr><td>Overlay</td><td>Rede virtual sobre o underlay (VXLAN, GRE)</td></tr>
        <tr><td>Controller-Based</td><td>Controlador centraliza o control plane</td></tr>
      </table>
      <ul style="margin-top:6px">
        <li>Cisco DNA Center = <span class="hl">controlador SDN</span> para campus</li>
        <li>Northbound API: controlador ↔ apps (REST)</li>
        <li>Southbound API: controlador ↔ dispositivos (OpenFlow, NETCONF)</li>
      </ul>`
  },
  {
    id: 14, cat: "AUT", icon: "⚙️",
    title: "REST APIs e Formatos de Dados",
    html: `
      <table class="mini-table">
        <tr><th>Método HTTP</th><th>Operação CRUD</th></tr>
        <tr><td><span class="ok">GET</span></td><td>Read (ler)</td></tr>
        <tr><td><span class="hl">POST</span></td><td>Create (criar)</td></tr>
        <tr><td><span class="warn">PUT</span></td><td>Update (substituir)</td></tr>
        <tr><td><span class="warn">PATCH</span></td><td>Update (parcial)</td></tr>
        <tr><td><span class="bad">DELETE</span></td><td>Delete (remover)</td></tr>
      </table>
      <ul style="margin-top:8px">
        <li><b>JSON</b>: leve, legível, padrão REST APIs Cisco</li>
        <li><b>XML</b>: estruturado, usado no NETCONF/YANG</li>
        <li><b>YAML</b>: human-friendly, usado em Ansible</li>
        <li>Código 200 = OK · 201 = Created · 404 = Not Found · 401 = Unauthorized</li>
      </ul>`
  },
  {
    id: 15, cat: "NET", icon: "📶",
    title: "Wi-Fi — Padrões 802.11",
    html: `
      <table class="mini-table">
        <tr><th>Padrão</th><th>Frequência</th><th>Velocidade Máx.</th><th>Apelido</th></tr>
        <tr><td>802.11a</td><td>5 GHz</td><td>54 Mbps</td><td>—</td></tr>
        <tr><td>802.11b</td><td>2.4 GHz</td><td>11 Mbps</td><td>—</td></tr>
        <tr><td>802.11g</td><td>2.4 GHz</td><td>54 Mbps</td><td>—</td></tr>
        <tr><td>802.11n</td><td>2.4/5 GHz</td><td>600 Mbps</td><td>Wi-Fi 4</td></tr>
        <tr><td>802.11ac</td><td>5 GHz</td><td>3.5 Gbps</td><td>Wi-Fi 5</td></tr>
        <tr><td>802.11ax</td><td>2.4/5/6 GHz</td><td>9.6 Gbps</td><td>Wi-Fi 6</td></tr>
      </table>
      <ul style="margin-top:6px">
        <li>Canais não sobrepostos 2.4 GHz: <span class="hl">1, 6, 11</span></li>
        <li>WPA3 = segurança mais forte atual (SAE)</li>
      </ul>`
  },
  {
    id: 16, cat: "NET", icon: "🔵",
    title: "IPv6 — Endereçamento e Fundamentos",
    html: `
      <table class="mini-table">
        <tr><th>Tipo</th><th>Prefixo</th><th>Escopo</th></tr>
        <tr><td><b>GUA</b> (Global Unicast)</td><td>2000::/3</td><td>Roteável na internet</td></tr>
        <tr><td><b>LLA</b> (Link-Local)</td><td>FE80::/10</td><td>Apenas no link local</td></tr>
        <tr><td><b>ULA</b> (Unique Local)</td><td>FC00::/7</td><td>Privado (≈ RFC1918)</td></tr>
        <tr><td><b>Multicast</b></td><td>FF00::/8</td><td>Grupo de destinos</td></tr>
        <tr><td><b>Loopback</b></td><td>::1/128</td><td>Local apenas</td></tr>
      </table>
      <ul style="margin-top:8px">
        <li><b>EUI-64</b>: divide o MAC em 2 metades · insere <span class="hl">FF:FE</span> no meio · inverte 7º bit</li>
        <li><b>SLAAC</b>: host gera próprio IP via <span class="hl">Router Advertisement (RA)</span></li>
        <li><b>NDP</b> substitui ARP — NS usa <span class="hl">Solicited-Node Multicast</span> em vez de broadcast</li>
      </ul>
      <table class="mini-table" style="margin-top:4px">
        <tr><th>IPv4 (ARP)</th><th>Mecanismo</th><th>IPv6 (NDP)</th><th>Mecanismo</th></tr>
        <tr><td><b>ARP Request</b></td><td><span class="bad">Broadcast</span></td><td><b>NS — Neighbor Solicitation</b></td><td><span class="ok">Multicast</span></td></tr>
        <tr><td><b>ARP Reply</b></td><td>Unicast</td><td><b>NA — Neighbor Advertisement</b></td><td>Unicast</td></tr>
        <tr><td colspan="2">Descoberta de roteador: não existe</td><td><b>RS → RA</b></td><td><span class="ok">Multicast</span></td></tr>
      </table>`
  },
  {
    id: 17, cat: "NET", icon: "🏗️",
    title: "Arquiteturas de Rede e Wireless (WLC/CAPWAP)",
    html: `
      <table class="mini-table">
        <tr><th>Arquitetura</th><th>Camadas</th><th>Uso típico</th></tr>
        <tr><td><b>3-Tier</b></td><td>Core · Distribution · Access</td><td>Campus tradicional grande</td></tr>
        <tr><td><b>2-Tier (Collapsed Core)</b></td><td>Core/Dist. · Access</td><td>Campus médio</td></tr>
        <tr><td><b>Spine-Leaf</b></td><td>Spine · Leaf</td><td>Data center / alta performance</td></tr>
      </table>
      <ul style="margin-top:8px">
        <li><b>Spine-Leaf</b>: todo Leaf conecta a todo Spine · sem conexão Leaf-Leaf · latência previsível</li>
        <li><b>WLC</b> (Wireless LAN Controller): gerencia APs de forma centralizada</li>
        <li><b>CAPWAP</b>: túnel <span class="hl">UDP 5246</span> (controle) e <span class="hl">UDP 5247</span> (dados) entre AP e WLC</li>
        <li>AP em modo <span class="hl">Local</span>: tunela todo tráfego ao WLC · modo <span class="warn">FlexConnect</span>: comuta localmente</li>
      </ul>`
  },
  {
    id: 18, cat: "ACC", icon: "🔀",
    title: "EtherChannel — LACP vs PAgP",
    html: `
      <table class="mini-table">
        <tr><th>Característica</th><th>LACP (802.3ad)</th><th>PAgP</th></tr>
        <tr><td>Padrão</td><td><span class="ok">IEEE</span></td><td><span class="warn">Cisco proprietário</span></td></tr>
        <tr><td>Modo ativo</td><td>active</td><td>desirable</td></tr>
        <tr><td>Modo passivo</td><td>passive</td><td>auto</td></tr>
        <tr><td>Max interfaces</td><td>8 ativas + 8 standby</td><td>8 ativas</td></tr>
      </table>
      <ul style="margin-top:8px">
        <li>Requisitos: <b>mesma velocidade</b>, <b>duplex</b>, <b>VLAN</b>, <b>modo trunk/access</b></li>
        <li>NÃO formam bundle: <span class="bad">passive + passive</span> · <span class="bad">auto + auto</span></li>
        <li>Formam bundle: <span class="ok">active + active</span> · <span class="ok">active + passive</span> · <span class="ok">desirable + desirable</span></li>
        <li>Verificar: <span class="hl">show etherchannel summary</span> · flag <span class="ok">SU</span> = bundle ativo</li>
      </ul>`
  },
  {
    id: 19, cat: "AUT", icon: "🛠️",
    title: "Ferramentas de Gerenciamento de Configuração",
    html: `
      <table class="mini-table">
        <tr><th>Ferramenta</th><th>Modelo</th><th>Agente</th><th>Linguagem</th><th>Protocolo</th></tr>
        <tr><td><b>Ansible</b></td><td><span class="ok">Push</span></td><td><span class="ok">Agentless</span></td><td>YAML (Playbooks)</td><td>SSH / NETCONF</td></tr>
        <tr><td><b>Puppet</b></td><td><span class="warn">Pull</span></td><td><span class="bad">Agent</span></td><td>DSL (Manifests)</td><td>HTTPS</td></tr>
        <tr><td><b>Chef</b></td><td><span class="warn">Pull</span></td><td><span class="bad">Agent</span></td><td>Ruby (Recipes)</td><td>HTTPS</td></tr>
        <tr><td><b>Terraform</b></td><td><span class="ok">Push</span></td><td><span class="ok">Agentless</span></td><td>HCL</td><td>APIs REST</td></tr>
      </table>
      <ul style="margin-top:8px">
        <li><b>Ansible</b>: favorito no CCNA — sem agente, usa SSH, ideal para redes Cisco</li>
        <li><b>Push</b>: controlador envia config · <b>Pull</b>: dispositivos buscam config no servidor</li>
        <li>NETCONF usa <span class="hl">XML/YANG</span> · porta <b>830</b> sobre SSH</li>
      </ul>`
  },
  {
    id: 20, cat: "SVC", icon: "📊",
    title: "QoS — Classificação, Marcação e Controle",
    html: `
      <ul>
        <li><b>Classificação</b>: identifica o tráfego (ACL, DSCP, CoS)</li>
        <li><b>Marcação</b>: define o valor de QoS — <span class="hl">DSCP</span> (L3, 6 bits) ou <span class="hl">CoS</span> (L2, 802.1Q, 3 bits)</li>
      </ul>
      <table class="mini-table" style="margin-top:8px">
        <tr><th>Mecanismo</th><th>Ação ao exceder</th><th>Delay</th><th>Uso típico</th></tr>
        <tr><td><b>Policing</b></td><td><span class="bad">Drop ou re-mark</span></td><td><span class="ok">Não adiciona</span></td><td>Entrada de provedor / SLA</td></tr>
        <tr><td><b>Shaping</b></td><td><span class="warn">Bufferiza (delay)</span></td><td><span class="bad">Adiciona jitter</span></td><td>Saída para WAN</td></tr>
      </table>
      <ul style="margin-top:8px">
        <li>DSCP <b>EF</b> (46) = VoIP · <b>AF41</b> = vídeo · <b>CS0</b> = best-effort</li>
        <li>Filas: <span class="hl">CBWFQ</span> (por classe) · <span class="hl">LLQ</span> = CBWFQ + fila prioritária para voz</li>
      </ul>`
  },
  {
    id: 21, cat: "SEC", icon: "🕵️",
    title: "Segurança L2 — DHCP Snooping e DAI",
    html: `
      <table class="mini-table">
        <tr><th>Recurso</th><th>Ataque que mitiga</th><th>Mecanismo</th></tr>
        <tr><td><b>DHCP Snooping</b></td><td>Rogue DHCP Server</td><td>Porta trusted/untrusted</td></tr>
        <tr><td><b>DAI</b></td><td>ARP Spoofing / Poisoning</td><td>Valida ARP vs tabela DHCP</td></tr>
      </table>
      <ul style="margin-top:8px">
        <li><b>DHCP Snooping</b>: portas <span class="ok">trusted</span> aceitam OFFER/ACK · portas <span class="bad">untrusted</span> só enviam DISCOVER/REQUEST</li>
        <li>Habilitar: <span class="hl">ip dhcp snooping</span> · <span class="hl">ip dhcp snooping vlan [N]</span></li>
        <li><b>DAI</b>: usa a binding table do DHCP Snooping para validar pacotes ARP</li>
        <li>Habilitar DAI: <span class="hl">ip arp inspection vlan [N]</span></li>
      </ul>`
  },
  {
    id: 22, cat: "SEC", icon: "📡",
    title: "Segurança Wireless — WPA2, WPA3 e AAA",
    html: `
      <table class="mini-table">
        <tr><th></th><th>WPA2</th><th>WPA3</th></tr>
        <tr><td>Autenticação Personal</td><td>PSK (senha)</td><td>SAE (Dragonfly)</td></tr>
        <tr><td>Autenticação Enterprise</td><td>802.1X + EAP + RADIUS</td><td>802.1X + EAP + RADIUS</td></tr>
        <tr><td>Proteção offline dict.</td><td><span class="bad">Vulnerável</span></td><td><span class="ok">Protegido</span></td></tr>
        <tr><td>Forward Secrecy</td><td><span class="bad">Não</span></td><td><span class="ok">Sim</span></td></tr>
        <tr><td>Criptografia</td><td>AES-CCMP</td><td>AES-GCMP-256</td></tr>
      </table>
      <ul style="margin-top:6px">
        <li><b>802.1X</b>: Supplicant (cliente) → Authenticator (AP/switch) → Authentication Server (RADIUS)</li>
        <li>WPA3-Personal usa <span class="hl">SAE</span> em vez de PSK — resiste a ataques de dicionário offline</li>
      </ul>`
  },
  {
    id: 23, cat: "SEC", icon: "⚠️",
    title: "Ameaças de Rede e AAA — RADIUS vs TACACS+",
    html: `
      <ul>
        <li><b>Vulnerabilidade</b>: fraqueza no sistema</li>
        <li><b>Ameaça</b>: potencial de explorar uma vulnerabilidade</li>
        <li><b>Exploit</b>: mecanismo que efetivamente usa a vulnerabilidade</li>
        <li><b>Risco</b> = Probabilidade × Impacto</li>
      </ul>
      <table class="mini-table" style="margin-top:8px">
        <tr><th>Característica</th><th>RADIUS</th><th>TACACS+</th></tr>
        <tr><td>Transporte</td><td><span class="warn">UDP 1812/1813</span></td><td><span class="ok">TCP 49</span></td></tr>
        <tr><td>Criptografia</td><td><span class="warn">Apenas a senha</span></td><td><span class="ok">Payload inteiro</span></td></tr>
        <tr><td>Separação AAA</td><td><span class="bad">Combina Auth+Author</span></td><td><span class="ok">Auth / Author / Acct separados</span></td></tr>
        <tr><td>Padrão</td><td><span class="ok">Aberto (RFC)</span></td><td><span class="warn">Proprietário Cisco</span></td></tr>
        <tr><td>Uso típico</td><td>Autenticação Wi-Fi</td><td>Acesso admin a dispositivos</td></tr>
      </table>
      <ul style="margin-top:6px">
        <li>Para gerenciar roteadores/switches Cisco: prefira <span class="hl">TACACS+</span></li>
        <li>Para autenticar usuários VPN/Wi-Fi: prefira <span class="hl">RADIUS</span></li>
      </ul>`
  },
  {
    id: 24, cat: "AUT", icon: "📄",
    title: "JSON — Leitura Rápida de Payload",
    html: `
      <ul>
        <li><b>Objeto</b>: delimitado por <span class="hl">{ }</span> — pares chave-valor</li>
        <li><b>Array</b>: delimitado por <span class="hl">[ ]</span> — lista ordenada</li>
        <li><b>Tipos</b>: string <span class="ok">"texto"</span> · number <span class="ok">42</span> · boolean <span class="ok">true/false</span> · null · objeto · array</li>
        <li>JSON é <b>case-sensitive</b>: <span class="bad">"Name" ≠ "name"</span></li>
        <li>Vírgula separa elementos · <b>último elemento</b> da lista <span class="bad">não leva vírgula</span></li>
      </ul>`
  },
  {
    id: 25, cat: "NET", icon: "🔌",
    title: "Cabeamento, PoE e Virtualização",
    html: `
      <table class="mini-table">
        <tr><th>Fibra</th><th>Núcleo</th><th>Distância</th><th>Custo</th></tr>
        <tr><td><b>Single-mode (SMF)</b></td><td>~9 µm</td><td><span class="ok">Até 100 km+</span></td><td><span class="bad">Alto</span></td></tr>
        <tr><td><b>Multimode (MMF)</b></td><td>50–62.5 µm</td><td><span class="warn">Até ~550 m</span></td><td><span class="ok">Baixo</span></td></tr>
      </table>
      <ul style="margin-top:8px">
        <li><b>PoE (802.3af)</b>: até <span class="hl">15.4W</span> · PoE+ (802.3at): <span class="hl">30W</span> · PoE++ (802.3bt): <span class="hl">60–100W</span></li>
      </ul>
      <table class="mini-table" style="margin-top:8px">
        <tr><th></th><th>Máquinas Virtuais (VMs)</th><th>Containers</th></tr>
        <tr><td>Isolamento</td><td><span class="ok">SO completo por VM</span></td><td><span class="warn">Kernel compartilhado</span></td></tr>
        <tr><td>Overhead</td><td><span class="bad">Alto</span></td><td><span class="ok">Baixo</span></td></tr>
        <tr><td>Boot</td><td>Minutos</td><td>Segundos</td></tr>
        <tr><td>Tecnologia</td><td>VMware, Hyper-V, KVM</td><td>Docker, Kubernetes</td></tr>
      </table>`
  },
  {
    id: 26, cat: "IPC", icon: "🎯",
    title: "Lógica de Decisão de Roteamento (LPM)",
    html: `
      <table class="mini-table">
        <tr><th>Ordem</th><th>Critério</th><th>Regra</th></tr>
        <tr><td><span class="hl"><b>1º</b></span></td><td><b>LPM</b></td><td>Máscara mais longa <span class="ok">sempre vence</span></td></tr>
        <tr><td><span class="warn"><b>2º</b></span></td><td><b>Administrative Distance (AD)</b></td><td>Menor AD vence — desempata protocolos</td></tr>
        <tr><td><span class="muted"><b>3º</b></span></td><td><b>Métrica</b></td><td>Menor métrica vence — desempata mesmo protocolo</td></tr>
      </table>
      <ul style="margin-top:8px">
        <li><b>Exemplo LPM</b>: destino <span class="hl">10.1.1.5</span> → <span class="bad">10.0.0.0/8</span> vs <span class="ok">10.1.1.0/24</span> → vence <span class="ok">/24</span></li>
        <li>Rota <span class="hl">0.0.0.0/0</span> = rota padrão (gateway of last resort)</li>
        <li>Se nenhuma rota corresponde → pacote é <span class="bad">descartado</span> (ICMP Unreachable)</li>
      </ul>`
  },
  {
    id: 27, cat: "ACC", icon: "🗂️",
    title: "Comutação L2 — Tabela MAC e DTP",
    html: `
      <table class="mini-table">
        <tr><th>Operação</th><th>Gatilho</th><th>Ação</th></tr>
        <tr><td><span class="ok"><b>Learn</b></span></td><td>Frame recebido</td><td>Associa MAC de origem à porta de entrada</td></tr>
        <tr><td><span class="hl"><b>Forward</b></span></td><td>MAC destino conhecido</td><td>Envia frame pela porta correta</td></tr>
        <tr><td><span class="warn"><b>Flood</b></span></td><td>MAC destino desconhecido</td><td>Envia por todas as portas exceto a de origem</td></tr>
      </table>
      <ul style="margin-top:8px">
        <li>Aging time padrão: <span class="hl">300 segundos</span></li>
      </ul>
      <table class="mini-table" style="margin-top:8px">
        <tr><th>Modo DTP</th><th>Resultado com "dynamic auto"</th><th>Resultado com "dynamic desirable"</th></tr>
        <tr><td><b>dynamic auto</b></td><td><span class="bad">Access</span></td><td><span class="ok">Trunk</span></td></tr>
        <tr><td><b>dynamic desirable</b></td><td><span class="ok">Trunk</span></td><td><span class="ok">Trunk</span></td></tr>
        <tr><td><b>trunk</b></td><td><span class="ok">Trunk</span></td><td><span class="ok">Trunk</span></td></tr>
        <tr><td><b>access</b></td><td><span class="bad">Access</span></td><td><span class="bad">Access</span></td></tr>
      </table>
      <ul style="margin-top:6px">
        <li>Segurança: use <span class="hl">switchport nonegotiate</span> para desabilitar DTP</li>
      </ul>`
  },
  {
    id: 28, cat: "NET", icon: "📶",
    title: "Interfaces Lógicas da WLC",
    html: `
      <table class="mini-table">
        <tr><th>Interface</th><th>Função</th><th>Detalhe</th></tr>
        <tr><td><b>Management</b></td><td>Gerenciamento da WLC</td><td>SSH, HTTPS, SNMP, RADIUS · <span class="hl">obrigatória</span></td></tr>
        <tr><td><b>Virtual</b></td><td>Mobilidade e DHCP relay</td><td>IP fictício (ex: 1.1.1.1) · nunca roteado</td></tr>
        <tr><td><b>Service-Port</b></td><td>Gerenciamento out-of-band</td><td>Porta física dedicada</td></tr>
        <tr><td><b>Dynamic</b></td><td>Tráfego de clientes Wi-Fi</td><td>Mapeada 1:1 para uma VLAN · uma por SSID</td></tr>
        <tr><td><b>AP-Manager</b></td><td>Comunicação WLC ↔ APs (CAPWAP)</td><td>Pode coincidir com Management</td></tr>
      </table>
      <ul style="margin-top:6px">
        <li>Cada <b>Dynamic Interface</b> = uma VLAN de dados para um SSID específico</li>
        <li>Verificar: <span class="hl">show interface summary</span> na CLI da WLC</li>
      </ul>`
  },
  {
    id: 29, cat: "IPC", icon: "🔁",
    title: "FHRP — HSRP vs VRRP vs GLBP",
    html: `
      <table class="mini-table">
        <tr><th>Característica</th><th>HSRP</th><th>VRRP</th><th>GLBP</th></tr>
        <tr><td>Padrão</td><td><span class="warn">Cisco proprietário</span></td><td><span class="ok">IEEE RFC 5798</span></td><td><span class="warn">Cisco proprietário</span></td></tr>
        <tr><td>Papéis</td><td>Active / Standby</td><td>Master / Backup</td><td>AVG + AVF</td></tr>
        <tr><td>Load Balancing</td><td><span class="bad">Não</span></td><td><span class="bad">Não</span></td><td><span class="ok">Sim (ativo-ativo)</span></td></tr>
        <tr><td>Hello / Hold</td><td>3s / 10s</td><td>1s / 3s</td><td>3s / 10s</td></tr>
      </table>
      <ul style="margin-top:6px">
        <li><b>HSRP Active</b>: router com maior prioridade (padrão 100) · em empate, maior IP vence</li>
        <li><b>Preempt</b>: deve ser configurado explicitamente para reassumir o papel de Active</li>
        <li>Todos os FHRPs operam na <span class="hl">camada 3</span> e usam <span class="hl">multicast</span></li>
      </ul>`
  }
];
