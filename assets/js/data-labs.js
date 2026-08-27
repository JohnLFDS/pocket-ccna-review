/* ═══════════════════════════════════════════════════════════════
   DATA — LABORATÓRIOS (12 labs)
   Para adicionar: copie um objeto e ajuste id, title, obj, steps, cli
   timerNote é opcional — aparece como seção especial no card
═══════════════════════════════════════════════════════════════ */
const LABS = [
  {
    id: 1,
    title: "Router on a Stick (Inter-VLAN Routing)",
    obj: "Permitir comunicação entre VLANs usando subinterfaces no router.",
    steps: [
      "Criar VLANs no switch e atribuir portas de acesso",
      "Configurar o link switch→router como trunk (802.1Q)",
      "No router, criar subinterfaces para cada VLAN",
      "Definir encapsulamento dot1q e atribuir o IP gateway de cada VLAN",
      "Ativar a interface física pai (sem IP direto)"
    ],
    cli: `<span class="cmt">! ── SWITCH ──────────────────────────────</span>
SW(config)<span class="mode">#</span> <span class="cmd">vlan</span> <span class="val">10</span>
SW(config-vlan)<span class="mode">#</span> <span class="cmd">name</span> <span class="val">VENDAS</span>
SW(config-vlan)<span class="mode">#</span> <span class="cmd">vlan</span> <span class="val">20</span>
SW(config-vlan)<span class="mode">#</span> <span class="cmd">name</span> <span class="val">TI</span>
SW(config)<span class="mode">#</span> <span class="cmd">interface</span> <span class="arg">fa0/1</span>
SW(config-if)<span class="mode">#</span> <span class="cmd">switchport mode</span> <span class="kw">access</span>
SW(config-if)<span class="mode">#</span> <span class="cmd">switchport access vlan</span> <span class="val">10</span>
SW(config)<span class="mode">#</span> <span class="cmd">interface</span> <span class="arg">fa0/24</span>
SW(config-if)<span class="mode">#</span> <span class="cmd">switchport mode</span> <span class="kw">trunk</span>

<span class="cmt">! ── ROUTER ──────────────────────────────</span>
R1(config)<span class="mode">#</span> <span class="cmd">interface</span> <span class="arg">g0/0.10</span>
R1(config-subif)<span class="mode">#</span> <span class="cmd">encapsulation dot1Q</span> <span class="val">10</span>
R1(config-subif)<span class="mode">#</span> <span class="cmd">ip address</span> <span class="val">192.168.10.1 255.255.255.0</span>
R1(config)<span class="mode">#</span> <span class="cmd">interface</span> <span class="arg">g0/0.20</span>
R1(config-subif)<span class="mode">#</span> <span class="cmd">encapsulation dot1Q</span> <span class="val">20</span>
R1(config-subif)<span class="mode">#</span> <span class="cmd">ip address</span> <span class="val">192.168.20.1 255.255.255.0</span>
R1(config)<span class="mode">#</span> <span class="cmd">interface</span> <span class="arg">g0/0</span>
R1(config-if)<span class="mode">#</span> <span class="cmd">no shutdown</span>

<span class="cmt">! ── VERIFICAR ───────────────────────────</span>
R1<span class="mode">#</span> <span class="cmd">show ip route</span>
R1<span class="mode">#</span> <span class="cmd">show interfaces</span> <span class="arg">g0/0.10</span>`
  },
  {
    id: 2,
    title: "OSPFv2 Single-Area (Área 0)",
    obj: "Configurar OSPF área backbone em múltiplos routers e verificar adjacência Full.",
    steps: [
      "Atribuir IPs nas interfaces conectadas entre os routers",
      "Ativar OSPF com 'router ospf [ID]' em cada router",
      "Anunciar as redes com 'network [ip] [wildcard] area 0'",
      "Verificar adjacências com 'show ip ospf neighbor'",
      "Confirmar tabela de rotas com 'show ip route ospf'"
    ],
    cli: `<span class="cmt">! ── R1 ──────────────────────────────────</span>
R1(config)<span class="mode">#</span> <span class="cmd">router ospf</span> <span class="val">1</span>
R1(config-router)<span class="mode">#</span> <span class="cmd">router-id</span> <span class="val">1.1.1.1</span>
R1(config-router)<span class="mode">#</span> <span class="cmd">network</span> <span class="val">10.0.12.0 0.0.0.255</span> <span class="kw">area 0</span>
R1(config-router)<span class="mode">#</span> <span class="cmd">network</span> <span class="val">192.168.1.0 0.0.0.255</span> <span class="kw">area 0</span>
R1(config-router)<span class="mode">#</span> <span class="cmd">passive-interface</span> <span class="arg">g0/1</span>

<span class="cmt">! ── R2 ──────────────────────────────────</span>
R2(config)<span class="mode">#</span> <span class="cmd">router ospf</span> <span class="val">1</span>
R2(config-router)<span class="mode">#</span> <span class="cmd">router-id</span> <span class="val">2.2.2.2</span>
R2(config-router)<span class="mode">#</span> <span class="cmd">network</span> <span class="val">0.0.0.0 255.255.255.255</span> <span class="kw">area 0</span>

<span class="cmt">! ── VERIFICAR ───────────────────────────</span>
R1<span class="mode">#</span> <span class="cmd">show ip ospf neighbor</span>
R1<span class="mode">#</span> <span class="cmd">show ip route ospf</span>
R1<span class="mode">#</span> <span class="cmd">show ip ospf interface</span> <span class="arg">brief</span>`
  },
  {
    id: 3,
    title: "Port Security com Sticky MAC",
    obj: "Proteger porta de acesso permitindo apenas 1 MAC, desligando em violação.",
    steps: [
      "Configurar a porta como access (Port Security não funciona em trunk)",
      "Ativar port-security na interface",
      "Definir máximo de 1 endereço MAC",
      "Habilitar sticky para aprender o MAC automaticamente",
      "Definir violation mode como shutdown",
      "Verificar e salvar configuração"
    ],
    cli: `SW(config)<span class="mode">#</span> <span class="cmd">interface</span> <span class="arg">fa0/5</span>
SW(config-if)<span class="mode">#</span> <span class="cmd">switchport mode</span> <span class="kw">access</span>
SW(config-if)<span class="mode">#</span> <span class="cmd">switchport access vlan</span> <span class="val">10</span>
SW(config-if)<span class="mode">#</span> <span class="cmd">switchport port-security</span>
SW(config-if)<span class="mode">#</span> <span class="cmd">switchport port-security maximum</span> <span class="val">1</span>
SW(config-if)<span class="mode">#</span> <span class="cmd">switchport port-security mac-address</span> <span class="kw">sticky</span>
SW(config-if)<span class="mode">#</span> <span class="cmd">switchport port-security violation</span> <span class="kw">shutdown</span>

<span class="cmt">! ── VERIFICAR ───────────────────────────</span>
SW<span class="mode">#</span> <span class="cmd">show port-security interface</span> <span class="arg">fa0/5</span>
SW<span class="mode">#</span> <span class="cmd">show port-security address</span>

<span class="cmt">! ── REABILITAR porta err-disabled ───────</span>
SW(config-if)<span class="mode">#</span> <span class="cmd">shutdown</span>
SW(config-if)<span class="mode">#</span> <span class="cmd">no shutdown</span>`
  },
  {
    id: 4,
    title: "ACL Extended — Bloqueio de Tráfego HTTP",
    obj: "Criar ACL nomeada para bloquear HTTP (porta 80) de uma subnet para um servidor.",
    steps: [
      "Criar a ACL nomeada extended no modo de configuração global",
      "Adicionar regra deny para TCP da subnet origem ao destino porta 80",
      "Adicionar permit ip any any para não bloquear demais tráfegos",
      "Aplicar a ACL na interface mais próxima da origem (inbound)",
      "Verificar hits nos contadores da ACL"
    ],
    cli: `<span class="cmt">! ── CRIAR ACL ───────────────────────────</span>
R1(config)<span class="mode">#</span> <span class="cmd">ip access-list extended</span> <span class="val">BLOQUEIA-HTTP</span>
R1(config-ext-nacl)<span class="mode">#</span> <span class="cmd">deny</span> <span class="kw">tcp</span> <span class="val">192.168.10.0 0.0.0.255</span> <span class="arg">host 10.0.0.100</span> <span class="kw">eq</span> <span class="val">80</span>
R1(config-ext-nacl)<span class="mode">#</span> <span class="cmd">permit</span> <span class="kw">ip any any</span>

<span class="cmt">! ── APLICAR NA INTERFACE ────────────────</span>
R1(config)<span class="mode">#</span> <span class="cmd">interface</span> <span class="arg">g0/0</span>
R1(config-if)<span class="mode">#</span> <span class="cmd">ip access-group</span> <span class="val">BLOQUEIA-HTTP</span> <span class="kw">in</span>

<span class="cmt">! ── VERIFICAR ───────────────────────────</span>
R1<span class="mode">#</span> <span class="cmd">show ip access-lists</span> <span class="arg">BLOQUEIA-HTTP</span>
R1<span class="mode">#</span> <span class="cmd">show ip interface</span> <span class="arg">g0/0</span>`
  },
  {
    id: 5,
    title: "NAT com PAT (Overload)",
    obj: "Configurar PAT para que hosts internos acessem a internet usando 1 IP público.",
    steps: [
      "Definir qual interface é 'inside' e qual é 'outside'",
      "Criar ACL standard identificando os hosts internos a traduzir",
      "Configurar NAT overload referenciando a ACL e a interface outside",
      "Verificar traduções ativas na tabela NAT"
    ],
    cli: `<span class="cmt">! ── INTERFACES ──────────────────────────</span>
R1(config)<span class="mode">#</span> <span class="cmd">interface</span> <span class="arg">g0/0</span>
R1(config-if)<span class="mode">#</span> <span class="cmd">ip nat</span> <span class="kw">inside</span>
R1(config)<span class="mode">#</span> <span class="cmd">interface</span> <span class="arg">g0/1</span>
R1(config-if)<span class="mode">#</span> <span class="cmd">ip nat</span> <span class="kw">outside</span>

<span class="cmt">! ── ACL E NAT OVERLOAD ───────────────────</span>
R1(config)<span class="mode">#</span> <span class="cmd">access-list</span> <span class="val">1</span> <span class="cmd">permit</span> <span class="val">192.168.0.0 0.0.255.255</span>
R1(config)<span class="mode">#</span> <span class="cmd">ip nat inside source list</span> <span class="val">1</span> <span class="cmd">interface</span> <span class="arg">g0/1</span> <span class="kw">overload</span>

<span class="cmt">! ── VERIFICAR ───────────────────────────</span>
R1<span class="mode">#</span> <span class="cmd">show ip nat translations</span>
R1<span class="mode">#</span> <span class="cmd">show ip nat statistics</span>
R1<span class="mode">#</span> <span class="cmd">debug ip nat</span>`
  },
  {
    id: 6,
    title: "DHCP Server no Router IOS",
    obj: "Configurar o router como servidor DHCP com exclusão de IPs e relay para outra VLAN.",
    steps: [
      "Excluir IPs reservados (gateways, servidores) do pool DHCP",
      "Criar o pool com nome, rede, gateway padrão e DNS",
      "Em redes remotas, configurar ip helper-address apontando para o router DHCP",
      "Verificar bindings e estatísticas"
    ],
    cli: `<span class="cmt">! ── CONFIGURAR DHCP ─────────────────────</span>
R1(config)<span class="mode">#</span> <span class="cmd">ip dhcp excluded-address</span> <span class="val">192.168.10.1 192.168.10.10</span>
R1(config)<span class="mode">#</span> <span class="cmd">ip dhcp pool</span> <span class="val">VLAN10-POOL</span>
R1(dhcp-config)<span class="mode">#</span> <span class="cmd">network</span> <span class="val">192.168.10.0 255.255.255.0</span>
R1(dhcp-config)<span class="mode">#</span> <span class="cmd">default-router</span> <span class="val">192.168.10.1</span>
R1(dhcp-config)<span class="mode">#</span> <span class="cmd">dns-server</span> <span class="val">8.8.8.8 8.8.4.4</span>
R1(dhcp-config)<span class="mode">#</span> <span class="cmd">lease</span> <span class="val">7</span>

<span class="cmt">! ── RELAY (outro segmento) ───────────────</span>
SW-L3(config)<span class="mode">#</span> <span class="cmd">interface</span> <span class="arg">vlan 20</span>
SW-L3(config-if)<span class="mode">#</span> <span class="cmd">ip helper-address</span> <span class="val">192.168.10.1</span>

<span class="cmt">! ── VERIFICAR ───────────────────────────</span>
R1<span class="mode">#</span> <span class="cmd">show ip dhcp binding</span>
R1<span class="mode">#</span> <span class="cmd">show ip dhcp pool</span>
R1<span class="mode">#</span> <span class="cmd">show ip dhcp conflict</span>`
  },
  {
    id: 7,
    title: "SSH — Acesso Seguro ao Dispositivo",
    obj: "Habilitar SSH v2 no router/switch, desabilitando Telnet por segurança.",
    steps: [
      "Configurar hostname e domain-name (obrigatório para gerar chaves RSA)",
      "Gerar par de chaves RSA com mínimo 2048 bits",
      "Forçar uso de SSHv2",
      "Criar usuário local com senha e privilege level",
      "Configurar as linhas VTY para aceitar apenas SSH",
      "Aplicar autenticação local nas linhas"
    ],
    cli: `R1(config)<span class="mode">#</span> <span class="cmd">hostname</span> <span class="val">R1</span>
R1(config)<span class="mode">#</span> <span class="cmd">ip domain-name</span> <span class="val">lab.ccna.local</span>
R1(config)<span class="mode">#</span> <span class="cmd">crypto key generate rsa modulus</span> <span class="val">2048</span>
R1(config)<span class="mode">#</span> <span class="cmd">ip ssh version</span> <span class="val">2</span>
R1(config)<span class="mode">#</span> <span class="cmd">username</span> <span class="val">admin</span> <span class="cmd">privilege</span> <span class="val">15</span> <span class="cmd">secret</span> <span class="val">Cisco123!</span>
R1(config)<span class="mode">#</span> <span class="cmd">line vty</span> <span class="val">0 4</span>
R1(config-line)<span class="mode">#</span> <span class="cmd">login local</span>
R1(config-line)<span class="mode">#</span> <span class="cmd">transport input</span> <span class="kw">ssh</span>

<span class="cmt">! ── VERIFICAR ───────────────────────────</span>
R1<span class="mode">#</span> <span class="cmd">show ip ssh</span>
R1<span class="mode">#</span> <span class="cmd">show ssh</span>`
  },
  {
    id: 8,
    title: "HSRP — Gateway Redundante com IP Virtual",
    obj: "Configurar dois roteadores com IP virtual compartilhado, forçando Active e Standby via prioridade.",
    steps: [
      "Conectar ambos os routers ao mesmo segmento LAN (mesma VLAN/subnet)",
      "Atribuir IPs reais distintos nas interfaces de cada router",
      "Ativar HSRP no grupo com o IP virtual (VIP) que os hosts usarão como gateway",
      "Definir prioridade maior no router que deve ser Active (padrão: 100)",
      "Habilitar preempt para que o router de maior prioridade retome o papel de Active após falha",
      "Verificar estado Active/Standby e o VIP"
    ],
    cli: `<span class="cmt">! ── R1 (Active — prioridade maior) ──────</span>
R1(config)<span class="mode">#</span> <span class="cmd">interface</span> <span class="arg">g0/0</span>
R1(config-if)<span class="mode">#</span> <span class="cmd">ip address</span> <span class="val">192.168.1.1 255.255.255.0</span>
R1(config-if)<span class="mode">#</span> <span class="cmd">standby</span> <span class="val">1</span> <span class="cmd">ip</span> <span class="val">192.168.1.254</span>
R1(config-if)<span class="mode">#</span> <span class="cmd">standby</span> <span class="val">1</span> <span class="cmd">priority</span> <span class="val">110</span>
R1(config-if)<span class="mode">#</span> <span class="cmd">standby</span> <span class="val">1</span> <span class="kw">preempt</span>

<span class="cmt">! ── R2 (Standby — prioridade padrão) ────</span>
R2(config)<span class="mode">#</span> <span class="cmd">interface</span> <span class="arg">g0/0</span>
R2(config-if)<span class="mode">#</span> <span class="cmd">ip address</span> <span class="val">192.168.1.2 255.255.255.0</span>
R2(config-if)<span class="mode">#</span> <span class="cmd">standby</span> <span class="val">1</span> <span class="cmd">ip</span> <span class="val">192.168.1.254</span>
R2(config-if)<span class="mode">#</span> <span class="cmd">standby</span> <span class="val">1</span> <span class="cmd">priority</span> <span class="val">100</span>
R2(config-if)<span class="mode">#</span> <span class="cmd">standby</span> <span class="val">1</span> <span class="kw">preempt</span>

<span class="cmt">! ── VERIFICAR ───────────────────────────</span>
R1<span class="mode">#</span> <span class="cmd">show standby</span>
R1<span class="mode">#</span> <span class="cmd">show standby</span> <span class="arg">brief</span>`
  },
  {
    id: 9,
    title: "EtherChannel com LACP (Port-Channel)",
    obj: "Agregar duas interfaces físicas entre dois switches usando LACP no modo active.",
    steps: [
      "Verificar que as interfaces têm mesma velocidade, duplex, VLAN e modo (trunk)",
      "Configurar as interfaces físicas como trunk em ambos os switches",
      "Atribuir as interfaces ao channel-group com modo LACP active",
      "O port-channel virtual herda automaticamente as configurações de trunk",
      "Verificar o bundle com show etherchannel summary (esperar flag SU)"
    ],
    cli: `<span class="cmt">! ── SW1 ──────────────────────────────────</span>
SW1(config)<span class="mode">#</span> <span class="cmd">interface range</span> <span class="arg">g0/1 - 2</span>
SW1(config-if-range)<span class="mode">#</span> <span class="cmd">switchport mode</span> <span class="kw">trunk</span>
SW1(config-if-range)<span class="mode">#</span> <span class="cmd">channel-group</span> <span class="val">1</span> <span class="cmd">mode</span> <span class="kw">active</span>

<span class="cmt">! ── SW2 ──────────────────────────────────</span>
SW2(config)<span class="mode">#</span> <span class="cmd">interface range</span> <span class="arg">g0/1 - 2</span>
SW2(config-if-range)<span class="mode">#</span> <span class="cmd">switchport mode</span> <span class="kw">trunk</span>
SW2(config-if-range)<span class="mode">#</span> <span class="cmd">channel-group</span> <span class="val">1</span> <span class="cmd">mode</span> <span class="kw">active</span>

<span class="cmt">! ── VERIFICAR ───────────────────────────</span>
SW1<span class="mode">#</span> <span class="cmd">show etherchannel summary</span>
<span class="cmt">! Flags esperadas: SU = Layer2 bundle Up · P = in Port-channel</span>
SW1<span class="mode">#</span> <span class="cmd">show etherchannel</span> <span class="val">1</span> <span class="cmd">port-channel</span>
SW1<span class="mode">#</span> <span class="cmd">show interfaces</span> <span class="arg">port-channel 1</span>`
  },
  {
    id: 10,
    title: "CDP, LLDP e NTP — Descoberta e Sincronização",
    obj: "Habilitar protocolos de descoberta de vizinhos e configurar sincronização de tempo via NTP.",
    steps: [
      "Verificar se CDP está habilitado globalmente (padrão: ativo em IOS)",
      "Habilitar LLDP globalmente (padrão: desabilitado) e por interface",
      "Desabilitar CDP em interfaces voltadas para usuários finais (segurança)",
      "Configurar o router como cliente NTP apontando para o servidor",
      "Opcionalmente configurar o router como servidor NTP para a rede interna",
      "Verificar vizinhos descobertos e sincronização de horário"
    ],
    timerNote: `<table class="mini-table" style="margin-top:0">
      <tr><th>Protocolo</th><th>Padrão</th><th>Hello (Send)</th><th>Hold-time</th></tr>
      <tr><td><b>CDP</b></td><td><span class="warn">Cisco proprietário</span></td><td><span class="hl">60s</span></td><td><span class="hl">180s</span></td></tr>
      <tr><td><b>LLDP</b></td><td><span class="ok">IEEE 802.1AB</span></td><td><span class="hl">30s</span></td><td><span class="hl">120s</span></td></tr>
    </table>`,
    cli: `<span class="cmt">! ── CDP ─────────────────────────────────</span>
R1(config)<span class="mode">#</span> <span class="cmd">cdp run</span>
<span class="cmt">! Desabilitar em interfaces de usuário (segurança)</span>
R1(config)<span class="mode">#</span> <span class="cmd">interface</span> <span class="arg">g0/1</span>
R1(config-if)<span class="mode">#</span> <span class="cmd">no cdp enable</span>

<span class="cmt">! ── LLDP ─────────────────────────────────</span>
R1(config)<span class="mode">#</span> <span class="cmd">lldp run</span>
R1(config)<span class="mode">#</span> <span class="cmd">interface</span> <span class="arg">g0/0</span>
R1(config-if)<span class="mode">#</span> <span class="cmd">lldp transmit</span>
R1(config-if)<span class="mode">#</span> <span class="cmd">lldp receive</span>

<span class="cmt">! ── NTP ─────────────────────────────────</span>
<span class="cmt">! Cliente NTP (sincroniza com servidor externo)</span>
R1(config)<span class="mode">#</span> <span class="cmd">ntp server</span> <span class="val">216.239.35.0</span>
<span class="cmt">! Servidor NTP (distribui tempo para a rede interna)</span>
R1(config)<span class="mode">#</span> <span class="cmd">ntp master</span> <span class="val">3</span>

<span class="cmt">! ── VERIFICAR ───────────────────────────</span>
R1<span class="mode">#</span> <span class="cmd">show cdp neighbors</span> <span class="arg">detail</span>
R1<span class="mode">#</span> <span class="cmd">show lldp neighbors</span>
R1<span class="mode">#</span> <span class="cmd">show ntp status</span>
R1<span class="mode">#</span> <span class="cmd">show clock</span>`
  },
  {
    id: 11,
    title: "Rotas Flutuantes — Roteamento Estático de Backup",
    obj: "Configurar rota principal e rota flutuante de backup com AD superior, para IPv4 e IPv6.",
    steps: [
      "Configurar a rota primária com AD padrão (1) — usada normalmente",
      "Configurar a rota flutuante com AD elevada (ex: 5) — só entra na tabela se a primária cair",
      "A rota com menor AD sempre vence; a flutuante fica 'escondida' enquanto a primária existe",
      "Repetir o processo para IPv6 com distância administrativa via parâmetro final",
      "Verificar qual rota está ativa na tabela com show ip route e show ipv6 route"
    ],
    cli: `<span class="cmt">! ── IPv4 — Rota principal (AD padrão = 1) ──</span>
R1(config)<span class="mode">#</span> <span class="cmd">ip route</span> <span class="val">0.0.0.0 0.0.0.0</span> <span class="arg">10.0.0.1</span>

<span class="cmt">! ── IPv4 — Rota flutuante (AD = 5 > 1) ─────</span>
<span class="cmt">! Só entra na tabela se a rota acima for removida</span>
R1(config)<span class="mode">#</span> <span class="cmd">ip route</span> <span class="val">0.0.0.0 0.0.0.0</span> <span class="arg">10.0.1.1</span> <span class="val">5</span>

<span class="cmt">! ── IPv6 — Rota principal ───────────────────</span>
R1(config)<span class="mode">#</span> <span class="cmd">ipv6 route</span> <span class="val">::/0</span> <span class="arg">2001:db8:0:1::1</span>

<span class="cmt">! ── IPv6 — Rota flutuante (AD = 5) ─────────</span>
R1(config)<span class="mode">#</span> <span class="cmd">ipv6 route</span> <span class="val">::/0</span> <span class="arg">2001:db8:0:2::1</span> <span class="val">5</span>

<span class="cmt">! ── VERIFICAR ───────────────────────────────</span>
R1<span class="mode">#</span> <span class="cmd">show ip route</span>
<span class="cmt">! Rota flutuante NÃO aparece enquanto a principal estiver ativa</span>
R1<span class="mode">#</span> <span class="cmd">show ip route static</span>
R1<span class="mode">#</span> <span class="cmd">show ipv6 route</span>

<span class="cmt">! ── SIMULANDO FALHA (teste) ─────────────────</span>
R1(config)<span class="mode">#</span> <span class="cmd">interface</span> <span class="arg">g0/0</span>
R1(config-if)<span class="mode">#</span> <span class="cmd">shutdown</span>
<span class="cmt">! Agora show ip route mostrará a rota flutuante</span>`
  },
  {
    id: 12,
    title: "WLAN via WLC — Configuração pela Interface Gráfica",
    obj: "Criar uma WLAN corporativa na Wireless LAN Controller seguindo o fluxo de menus da simulação GUI do exame.",
    steps: [
      "Acessar a WLC pelo browser: https://[IP-da-WLC] → fazer login com credenciais de admin",
      "Navegar até: menu superior → aba WLAN → clicar em 'Create New' → Go",
      "Preencher: Type = WLAN · Profile Name = CORP-WLAN · SSID = CORP-WIFI · ID = 1 → Apply",
      "Na aba General: marcar Status = Enabled · Interface/Group = management (ou VLAN desejada)",
      "Na aba Security → Layer 2: selecionar WPA+WPA2 → habilitar WPA2 Policy → AES",
      "Auth Key Mgmt: se Personal → PSK (digitar senha) · se Enterprise → 802.1X (configurar RADIUS)",
      "Na aba Advanced: habilitar opções como FlexConnect Local Switching se necessário → Apply",
      "Verificar WLAN criada na lista: Status deve aparecer como Enabled (azul/verde)"
    ],
    cli: `<span class="cmt">! ATENÇÃO: WLC é configurada via GUI (browser)</span>
<span class="cmt">! Os comandos abaixo são de VERIFICAÇÃO via CLI da WLC</span>

<span class="cmt">! ── Verificar WLANs configuradas ────────────</span>
WLC<span class="mode">></span> <span class="cmd">show wlan summary</span>

<span class="cmt">! ── Detalhes de uma WLAN específica ─────────</span>
WLC<span class="mode">></span> <span class="cmd">show wlan</span> <span class="val">1</span>

<span class="cmt">! ── Verificar APs associados ────────────────</span>
WLC<span class="mode">></span> <span class="cmd">show ap summary</span>

<span class="cmt">! ── Verificar clientes conectados ───────────</span>
WLC<span class="mode">></span> <span class="cmd">show client summary</span>

<span class="cmt">! ── Verificar configuração RADIUS (Enterprise)</span>
WLC<span class="mode">></span> <span class="cmd">show radius summary</span>

<span class="cmt">! ── Fluxo GUI resumido para a prova: ────────</span>
<span class="cmt">! WLANs → Create New → Go</span>
<span class="cmt">!   → General: Status=Enabled, Interface=mgmt</span>
<span class="cmt">!   → Security → L2: WPA+WPA2 → AES</span>
<span class="cmt">!   → Auth: PSK (Personal) ou 802.1X (Enterprise)</span>
<span class="cmt">!   → Advanced → Apply → Save Config</span>`
  }
];
