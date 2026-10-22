/*
 * LÓGICA DO JOGO
 *
 * Onde mexer:
 *   - Pontuação: constantes PESO e PTS (logo no começo, perto de "let order").
 *   - Tempo por fase e códigos: js/codigos.js.
 *   - Seções: procure pelos comentários "---------- ... ----------" (escolha de jogador, tutorial, batalha).
 *
 * O ranking é salvo no navegador (localStorage, chave "pvplayers2").
 */
const vistos = new Set();
const sorteia = (g) => {
  let l = g.filter((r) => !vistos.has(r.id));
  if (!l.length) {
    g.forEach((r) => vistos.delete(r.id));
    l = g;
  }
  const r = l[Math.floor(Math.random() * l.length)];
  vistos.add(r.id);
  return r;
};
const TOT = 9,
  $ = (id) => document.getElementById(id);
const KW =
  /("[^"]*")|\b(\d+)\b|\b(int|char|void|return|for|if|else|while|public|class|static|String|def|print|range|in)\b/g;
const hl = (x) =>
  x
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(KW, (m, a, b) => `<i class="${a ? "s" : b ? "n" : "k"}">${m}</i>`);
const PESO = [1, 1.5, 2],
  PTS = { base: 100, perfeito: 50, passo: 0.1, maxMult: 1.5, vitoria: 500 };
let torneioAtivo = null,
  tutorialBatalhaVisto = false,
  demoAoConcluir = null,
  demoTimer = 0,
  audioCtx = null;
function desbloquearAudio() {
  const AC = window.AudioContext || window.webkitAudioContext;
  if (AC && !audioCtx) audioCtx = new AC();
  if (audioCtx && audioCtx.state === "suspended") {
    audioCtx.resume().catch(() => {});
  }
  document.querySelectorAll("audio").forEach((audio) => {
    try {
      audio.muted = false;
      if (audio.paused) {
        const tocando = audio.play();
        if (tocando) tocando.catch(() => {});
      }
    } catch (e) {}
  });
}
document.addEventListener("pointerdown", desbloquearAudio, { once: true, passive: true });
document.addEventListener("click", desbloquearAudio, { once: true, passive: true });
function montarJogosTorneio() {
  torneioAtivo.jogos = [];
  torneioAtivo.indice = 0;
  torneioAtivo.vencedores = [];
  const nomes = [...torneioAtivo.jogadores];
  if (nomes.length % 2) torneioAtivo.vencedores.push(nomes.pop());
  for (let k = 0; k < nomes.length; k += 2) torneioAtivo.jogos.push([nomes[k], nomes[k + 1]]);
}
function proximoJogoTorneio() {
  if (torneioAtivo.indice + 1 >= torneioAtivo.jogos.length) return null;
  return torneioAtivo.jogos[++torneioAtivo.indice];
}
let order,
  i,
  t,
  T = 30,
  sc,
  st,
  erros = 0,
  lock,
  run = 0,
  last,
  idle,
  PL = [],
  cur = null,
  dbDoc = null,
  wq = Promise.resolve(),
  nm = "",
  editando = null,
  modo = "solo",
  J1 = null,
  B = null,
  tutDepois = null;
const LS = "pvplayers2",
  CONFIG_LS = "pvconfig1",
  VOLUME_PADRAO = { menu: 0.12, batalha: 0.62, tutorial: 0.07, sfx: 0.22 },
  configuracao = (() => {
    try {
      const salvo = JSON.parse(localStorage.getItem(CONFIG_LS)) || {};
      return Object.fromEntries(Object.keys(VOLUME_PADRAO).map((k) => [k,
        Number.isFinite(+salvo[k]) ? Math.min(1, Math.max(0, +salvo[k])) : VOLUME_PADRAO[k],
      ]));
    } catch (e) { return { ...VOLUME_PADRAO }; }
  })(),
  esc = (s) => String(s).replace(/[&<>"']/g, (c) => "&#" + c.charCodeAt(0) + ";");
const clean = (a) =>
  (Array.isArray(a) ? a : [])
    .filter((p) => p && typeof p.n === "string" && p.n.trim())
    .map((p) => ({ n: p.n.slice(0, 12), b: +p.b || 0, p: +p.p || 0, t: +p.t || 0 }));
function merge(a, b) {
  const m = new Map();
  clean([...a, ...b]).forEach((p) => {
    const k = p.n.toLowerCase(),
      o = m.get(k);
    m.set(
      k,
      o ? { n: o.n, b: Math.max(o.b, p.b), p: Math.max(o.p, p.p), t: Math.max(o.t, p.t) } : p,
    );
  });
  return [...m.values()];
}
try {
  PL = clean(JSON.parse(localStorage.getItem(LS)));
} catch (e) {}
function save() {
  try {
    localStorage.setItem(LS, JSON.stringify(PL));
  } catch (e) {}
  if (dbDoc) wq = wq.then(() => dbDoc.set({ players: PL })).catch(() => {});
}
function salvarConfiguracao() {
  try { localStorage.setItem(CONFIG_LS, JSON.stringify(configuracao)); } catch (e) {}
  aplicarVolumes();
  atualizarControlesVolume();
}
function aplicarVolumes() {
  $("musicaMenu").volume = configuracao.menu;
  $("musicaDesafio").volume = $("demoBatalha").classList.contains("on")
    ? configuracao.tutorial : configuracao.batalha;
  $("sfxCerto").volume = configuracao.sfx;
  $("sfxErrado").volume = configuracao.sfx;
}
function atualizarControlesVolume() {
  Object.entries({ menu: "volMenu", batalha: "volBatalha", tutorial: "volTutorial", sfx: "volSfx" }).forEach(([chave, id]) => {
    if ($(id)) {
      $(id).value = Math.round(configuracao[chave] * 100);
      $(id + "Valor").textContent = $(id).value + "%";
    }
  });
}
async function initDb() {
  try {
    const db = await claude.use("db");
    if (!db) return;
    const d = db.doc("game/ranking2"),
      s = await d.get();
    PL = merge(PL, s.exists ? s.data().players || [] : []);
    if (cur) cur = PL.find((p) => p.n === cur.n) || cur;
    dbDoc = d;
    save();
    rank("rk1", 5);
  } catch (e) {
    dbDoc = null;
  }
}
const ranked = (n) =>
  PL.filter((p) => p.b > 0)
    .sort((a, b) => b.b - a.b || a.t - b.t)
    .slice(0, n);
function rank(id, n) {
  const L = ranked(n);
  $(id).innerHTML = L.length
    ? L.map(
        (p, k) =>
          `<li class="${cur && p.n === cur.n ? "me" : ""}"><span>${k + 1}º ${esc(p.n)}</span><b>${p.b}</b></li>`,
      ).join("")
    : '<li class="v">Ninguém jogou ainda… seja o primeiro! 👻</li>';
}
function who() {
  $("whoT").textContent =
    modo === "b1"
      ? "Jogador 1: quem é você?"
      : modo === "b2"
        ? "Jogador 2: quem é você?"
        : "Quem é você?";
  clearTimeout(idle);
  idle = setTimeout(home, 120000);
  if (!PL.length) {
    $("pl").innerHTML = '<p class="listaVazia">Nenhum jogador cadastrado. Use “Novo jogador” para criar um.</p>';
    show("whoS");
    return;
  }
  $("pl").innerHTML = PL.filter((p) => !(modo === "b2" && p.n === J1.n))
    .sort((a, b) => b.t - a.t)
    .map(
      (p, k) =>
        `<div class="jogadorItem"><button class="pb${k ? "" : " last"}" data-n="${esc(p.n)}">${esc(p.n)}<small>${p.b ? "recorde " + p.b : "sem pontos ainda"}</small></button><div class="acoesJogador"><button class="acaoJogador" data-editar="${esc(p.n)}" aria-label="Editar ${esc(p.n)}">Editar</button><button class="acaoJogador excluir" data-excluir="${esc(p.n)}" aria-label="Excluir ${esc(p.n)}">Excluir</button></div></div>`,
    )
    .join("");
  show("whoS");
}
const drawN = () => {
  $("nin").textContent = nm + "_";
};
function nameScr(jogador = null) {
  editando = jogador ? jogador.n : null;
  $("nmT").textContent =
    jogador ? "Editar jogador"
      : modo === "b1"
      ? "Jogador 1: qual é o seu nome?"
      : modo === "b2"
        ? "Jogador 2: qual é o seu nome?"
        : "Qual é o seu nome?";
  nm = jogador ? jogador.n : "";
  $("nerr").textContent = "";
  drawN();
  show("nmS");
}
const shuffle = (a) =>
  a
    .map((x) => [Math.random(), x])
    .sort((p, q) => p[0] - q[0])
    .map((x) => x[1]);
function show(id) {
  document.querySelectorAll(".scr").forEach((s) => s.classList.toggle("on", s.id === id));
}
function pararMusica(id) {
  const audio = $(id);
  if (!audio) return;
  try {
    audio.pause();
    audio.currentTime = 0;
  } catch (e) {}
}
function tocarMusica(id, { volume = 0.5, loop = false, resetar = true } = {}) {
  const audio = $(id);
  if (!audio) return null;
  audio.volume = Number.isFinite(volume) ? volume : audio.volume;
  audio.loop = !!loop;
  if (resetar) {
    try {
      audio.pause();
      audio.currentTime = 0;
    } catch (e) {}
  }
  const tocando = audio.play();
  if (tocando) tocando.catch(() => {});
  return audio;
}
function tocarMenu() {
  pararMusica("musicaDesafio");
  tocarMusica("musicaMenu", { volume: configuracao.menu, loop: true, resetar: false });
}
function iniciarTrilhaSolo() {
  pararMusica("musicaMenu");
  tocarMusica("musicaDesafio", { volume: configuracao.batalha, loop: true, resetar: true });
}
function say(m, c) {
  $("msg").textContent = m;
  $("msg").className = c;
}
function pop(x, g) {
  const p = $("pop");
  p.textContent = x;
  p.className = "";
  void p.offsetWidth;
  p.className = g ? "g" : "r";
}
function shake() {
  const c = $("code");
  c.classList.remove("sh");
  void c.offsetWidth;
  c.classList.add("sh");
}
function start() {
  clearTimeout(idle);
  pararMusica("musicaMenu");
  if (modo === "solo") iniciarTrilhaSolo();
  order = P.flatMap((p, k) =>
    shuffle(["C", "Java", "Python"].map((l) => sorteia(p.s.filter((r) => r.l === l)))).map((r) => ({
      ...r,
      ph: k,
    })),
  );
  i = 0;
  sc = 0;
  st = 0;
  erros = 0;
  t = T = P[0].t;
  lock = 1;
  run = 1;
  last = performance.now();
  go();
}
function go() {
  if (i % 3 === 0) {
    const k = i / 3,
      p = P[k];
    lock = 1;
    $("pt").textContent = "Fase " + (k + 1) + ": " + p.n;
    $("pd").textContent = p.d;
    show("phase");
    setTimeout(() => {
      if (run) {
        show("");
        load();
      }
    }, 2300);
  } else load();
}
function load() {
  const r = order[i],
    n = r.c.length;
  lock = 0;
  erros = 0;
  t = T = P[r.ph].t;
  last = performance.now();
  $("n").textContent = P[r.ph].n + " " + ((i % 3) + 1) + "/3";
  $("pn").textContent = cur ? cur.n : "";
  $("lang").textContent = r.l;
  $("lang").className = r.l;
  $("hint").innerHTML = `Toque na linha onde falta o <b>${r.m}</b>`;
  say("", "");
  $("lines").style.setProperty("--fs", Math.min(5, (60 / n - 1) / 1.35) + "vh");
  $("lines").innerHTML = r.c
    .map(
      (x, k) =>
        `<div class="ln" data-k="${k}"><span class="no">${k + 1}</span><span class="tx">${hl(x)}</span></div>`,
    )
    .join("");
}
function pick(k, d) {
  if (!run || lock || d.classList.contains("x")) return;
  const r = order[i];
  if (k === r.a) {
    lock = 1;
    st++;
    const base = PTS.base * PESO[r.ph],
      mult = Math.min(PTS.maxMult, 1 + PTS.passo * (st - 1)),
      pts = Math.round(
        (base + (base * Math.max(0, t)) / T + (erros ? 0 : PTS.perfeito * PESO[r.ph])) * mult,
      );
    sc += pts;
    pop("+" + pts + (mult > 1 ? " ×" + mult.toFixed(1) : ""), 1);
    d.classList.add("ok");
    d.querySelector(".tx").insertAdjacentHTML("beforeend", `<b class="semi">${r.m}</b>`);
    say(
      r.m === ":"
        ? "Achou! Sem esse : o Python solta um SyntaxError de pavor."
        : "Achou! Sem esse ; o compilador solta um grito de terror.",
      "ok-t",
    );
    tocarSfx("sfxCerto");
    setTimeout(() => {
      i++;
      i >= TOT ? end(1) : go();
    }, 1800);
  } else {
    st = 0;
    erros++;
    t -= 5;
    pop("−5s", 0);
    shake();
    d.classList.add("x");
    say("Essa linha está certa! Procure em outra.", "bad-t");
    tocarSfx("sfxErrado");
    if (t <= 0) end(0);
  }
}
$("lines").addEventListener("pointerdown", (e) => {
  const d = e.target.closest(".ln");
  if (d) pick(+d.dataset.k, d);
});
function render() {
  $("bar").style.width = (Math.max(0, t) / T) * 100 + "%";
  $("bar").className = t < T * 0.35 ? "low" : "";
  $("tm").textContent = Math.ceil(Math.max(0, t)) + "s";
  $("sc").textContent = sc;
}
function end(win) {
  if (!run) return;
  run = 0;
  const done = win ? TOT : i;
  if (win) sc += PTS.vitoria;
  cur = PL.find((p) => p.n === cur.n) || cur;
  if (!PL.includes(cur)) PL.push(cur);
  const rec = sc > cur.b;
  if (rec) cur.b = sc;
  cur.p++;
  cur.t = Date.now();
  save();
  const pos = ranked(999).findIndex((p) => p.n === cur.n) + 1;
  render();
  $("et").textContent = win ? "Bugs exorcizados!" : "O tempo acabou…";
  $("es").innerHTML =
    `<b>${esc(cur.n)}</b>, você caçou <b>${done}/${TOT}</b> fantasmas<br>Pontos: <b>${sc}</b>${rec ? " · novo recorde pessoal!" : " · seu recorde: <b>" + cur.b + "</b>"}${pos ? "<br>Posição no ranking: <b>" + pos + "º</b>" : ""}` +
    (win
      ? "<br>Você zerou as 3 fases! Bônus de vitória: +" +
        PTS.vitoria +
        ". Terror dos compiladores!"
      : `<br>Você chegou até a fase ${Math.min(3, ((done / 3) | 0) + 1)}. Os bugs levaram a melhor desta vez.`);
  rank("rk2", 8);
  show("end");
  idle = setTimeout(home, 25000);
}
function home() {
  clearTimeout(idle);
  clearTimeout(demoTimer);
  demoAoConcluir = null;
  B = null;
  torneioAtivo = null;
  $("musicaDesafio").pause();
  tocarMenu();
  modo = "solo";
  rank("rk1", 5);
  show("start");
}
setInterval(() => {
  if (!run) return;
  const n = performance.now();
  if (!lock) t -= (n - last) / 1000;
  last = n;
  render();
  if (!lock && t <= 0) end(0);
}, 100);
$("kb").innerHTML =
  "QWERTYUIOPASDFGHJKLÇZXCVBNM"
    .split("")
    .map((k) => `<button data-k="${k}">${k}</button>`)
    .join("") +
  '<button data-k="⌫" class="w">⌫</button><button data-k=" " class="wf">ESPAÇO</button>';
$("play").onclick = () => {
  tocarMenu();
  modo = "solo";
  who();
};
$("again").onclick = () => {
  tocarMenu();
  modo = "solo";
  who();
};
$("btnBat").onclick = () => {
  tocarMenu();
  modo = "b1";
  who();
};
$("btnTorneio").onclick = () => {
  tocarMenu();
  $("torLista").innerHTML = PL.length ? PL.map((p,k) => '<label class="torItem"><input type="checkbox" value="' + esc(p.n) + '"' + (k < 2 ? ' checked' : '') + '> ' + esc(p.n) + '</label>').join("") : "<p>Cadastre jogadores primeiro, usando Jogar.</p>";
  $("torMsg").textContent = "";
  show("torneio");
};
$("torVoltar").onclick = home;
$("torGo").onclick = () => {
  const nomes = [...$("torLista").querySelectorAll("input:checked")].map((x) => x.value);
  if (nomes.length < 2) return void ($("torMsg").textContent = "Selecione pelo menos 2 jogadores.");
  torneioAtivo = { jogadores: nomes, vencedores: [], jogos: [], indice: 0 };
  montarJogosTorneio();
  $("vsN1").textContent = torneioAtivo.jogos[0][0];
  $("vsN2").textContent = torneioAtivo.jogos[0][1];
  show("telaVS");
};
$("btnTut").onclick = () => {
  tocarMenu();
  tutorial(home);
};
$("btnConfig").onclick = () => {
  pararMusica("musicaDesafio");
  tocarMenu();
  atualizarControlesVolume();
  show("config");
};
$("configVoltar").onclick = home;
$("volPadrao").onclick = () => {
  Object.assign(configuracao, VOLUME_PADRAO);
  salvarConfiguracao();
};
[["menu", "volMenu"], ["batalha", "volBatalha"], ["tutorial", "volTutorial"], ["sfx", "volSfx"]].forEach(([chave, id]) => {
  $(id).addEventListener("input", () => {
    configuracao[chave] = Number($(id).value) / 100;
    salvarConfiguracao();
  });
});
$("newp").onclick = () => nameScr();
$("back").onclick = home;
$("nback").onclick = () => (PL.length ? who() : home());
$("pl").addEventListener("click", (e) => {
  const editar = e.target.closest("[data-editar]");
  if (editar) {
    const jogador = PL.find((p) => p.n === editar.dataset.editar);
    if (jogador) nameScr(jogador);
    return;
  }
  const excluir = e.target.closest("[data-excluir]");
  if (excluir) {
    const jogador = PL.find((p) => p.n === excluir.dataset.excluir);
    if (!jogador) return;
    if (excluir.dataset.confirmar !== "sim") {
      excluir.dataset.confirmar = "sim";
      excluir.textContent = "Confirmar?";
      setTimeout(() => {
        if (!excluir.isConnected || excluir.dataset.confirmar !== "sim") return;
        delete excluir.dataset.confirmar;
        excluir.textContent = "Excluir";
      }, 4000);
      return;
    }
    PL = PL.filter((p) => p !== jogador);
    if (cur === jogador) cur = null;
    save();
    rank("rk1", 5);
    rank("rk2", 8);
    who();
    return;
  }
  const b = e.target.closest(".pb");
  if (b) {
    const j = PL.find((p) => p.n === b.dataset.n);
    if (j) escolheu(j);
  }
});
$("kb").addEventListener("pointerdown", (e) => {
  const b = e.target.closest("button");
  if (!b) return;
  const k = b.dataset.k;
  nm = k === "⌫" ? nm.slice(0, -1) : (nm + k).slice(0, 12);
  $("nerr").textContent = "";
  drawN();
});
$("nok").onclick = () => {
  const n = nm.trim().replace(/\s+/g, " ");
  if (n.length < 2) return void ($("nerr").textContent = "Digite pelo menos 2 letras.");
  if (PL.some((p) => p.n.toLowerCase() === n.toLowerCase() && p.n.toLowerCase() !== String(editando || "").toLowerCase()))
    return void ($("nerr").textContent = "Esse nome já existe! Volte e toque nele na lista.");
  if (editando) {
    const antigo = PL.find((p) => p.n === editando);
    if (!antigo) return void ($("nerr").textContent = "Esse jogador não existe mais.");
    const atualizado = { ...antigo, n, t: Date.now() };
    PL[PL.indexOf(antigo)] = atualizado;
    if (cur === antigo) cur = atualizado;
    if (J1 === antigo) J1 = atualizado;
    editando = null;
    save();
    rank("rk1", 5);
    rank("rk2", 8);
    who();
    return;
  }
  const j = { n, b: 0, p: 0, t: Date.now() };
  PL.push(j);
  save();
  escolheu(j);
};
window.addEventListener("load", initDb);

/* ---------- escolha de jogador (solo ou batalha) ---------- */
function escolheu(j) {
  if (modo === "solo") {
    cur = j;
    start();
  } else if (modo === "b1") {
    J1 = j;
    modo = "b2";
    who();
  } else iniciarBatalha(J1, j);
}

/* ---------- tutorial ---------- */
const TUT = [
  {
    t: "Encontre o erro",
    h: "Toque na linha sem <b>;</b> em C e Java ou sem <b>:</b> em Python. Este tutorial é opcional; no Solo você pode treinar no seu ritmo.",
  },
  {
    t: "Treino com calma",
    h: "No Solo, o tempo é por código: <b>30s</b> no Fácil, <b>15s</b> no Médio e <b>10s</b> no Difícil. Cada erro tira <b>5s</b> e bloqueia aquela linha. A trilha de batalha fica ativa em segundo plano para manter o ritmo do treino.",
  },
  {
    t: "Pontos e batalha",
    h: "No Solo, rapidez e sequência de acertos aumentam a pontuação. Na <b>Batalha</b>, cada erro toca um som e avança para outro código, sem nova tentativa. Não há placar entre os 3 rounds: a contagem de acertos, erros e pontos aparece no final. No Difícil, acertos seguidos aumentam o multiplicador.",
  },
];let tp = 0,
  tOk = false;
function tutorial(depois) {
  tutDepois = depois;
  tp = 0;
  mostraTut();
  show("tut");
}
function mostraTut() {
  const p = TUT[tp];
  tOk = !p.c;
  $("tutT").textContent = p.t;
  $("tutH").innerHTML = p.h;
  $("tutD").innerHTML = p.c
    ? p.c
        .map(
          (x, k) =>
            `<div class="ln" data-k="${k}"><span class="no">${k + 1}</span><span class="tx">${hl(x)}</span></div>`,
        )
        .join("")
    : "";
  $("tutM").textContent = "";
  $("tutP").textContent = tp + 1 + "/" + TUT.length;
  $("tutAnt").style.visibility = tp ? "visible" : "hidden";
  $("tutProx").textContent = tp === TUT.length - 1 ? "Entendi, vamos jogar!" : "Próximo →";
  $("tutProx").style.opacity = tOk ? 1 : 0.35;
}
function fimTut() {
  const f = tutDepois;
  tutDepois = null;
  if (f) f();
}
$("tutD").addEventListener("pointerdown", (e) => {
  const d = e.target.closest(".ln"),
    p = TUT[tp];
  if (!d || tOk) return;
  if (+d.dataset.k === p.a) {
    tOk = true;
    d.classList.add("ok");
    d.querySelector(".tx").insertAdjacentHTML("beforeend", `<b class="semi">${p.m}</b>`);
    $("tutM").className = "ok-t";
    $("tutM").textContent = "Isso! Sem esse " + p.m + " o código não funciona.";
    $("tutProx").style.opacity = 1;
  } else {
    d.classList.add("x");
    $("tutM").className = "bad-t";
    $("tutM").textContent = "Essa linha está certa. Tente outra! (no jogo, errar tira 5s)";
  }
});
$("tutProx").onclick = () => {
  if (!tOk) return;
  if (tp < TUT.length - 1) {
    tp++;
    mostraTut();
  } else fimTut();
};
$("tutAnt").onclick = () => {
  if (tp) {
    tp--;
    mostraTut();
  }
};
$("tutPular").onclick = fimTut;

/* ---------- batalha: tela dividida, três etapas com trilha ---------- */

function iniciarBatalha(a, b) {
  B = {
    j: [a.n, b.n], pts: [0, 0], etapa: 0, on: false, perguntas: [null, null],
    respondidos: [false, false], errosLinha: [new Set(), new Set()],
    etapaPontos: [[0, 0], [0, 0], [0, 0]], sequencia: [0, 0],
    etapaLogs: [[[], []], [[], []], [[], []]], timerEtapa: 0, timerPergunta: 0, token: 0,
  };
  clearTimeout(idle);
  $('vsN1').textContent = a.n;
  $('vsN2').textContent = b.n;
  show('telaVS');
}
const TUT_BATALHA = [
  {
    titulo: "Etapa 1 · procure o símbolo",
    texto: "Cada pessoa joga no próprio lado. Procure a linha sem ; em C/Java ou sem : em Python. O cursor vai mostrar o toque.",
  },
  {
    titulo: "Etapa 2 · erre, tente de novo",
    texto: "Se errar, você ouve o som e o código avança sem pontos; não há segunda tentativa. Entre rounds, só aparece a confirmação para seguir. A contagem fica para o final.",
  },
  {
    titulo: "Etapa 3 · final em dobro",
    texto: "A última etapa usa códigos difíceis. Cada acerto vale 2 pontos; 4 acertos seguidos valem 4 pontos cada e 7 seguidos valem 6, até o fim do round. Só no final aparece a contagem dos três rounds e o vencedor é revelado.",
  },
];
function iniciarTutorialBatalha(depois) {
  demoAoConcluir = depois;
  demoIndice = 0;
  pararMusica("musicaMenu");
  tocarMusica("musicaDesafio", { volume: configuracao.tutorial, loop: true, resetar: true });
  mostraDemoBatalha();
}
let demoIndice = 0;
function mostraDemoBatalha() {
  clearTimeout(demoTimer);
  const p = TUT_BATALHA[demoIndice];
  $("demoCont").textContent = "ETAPA " + (demoIndice + 1) + " DE 3";
  $("demoTitulo").textContent = p.titulo;
  $("demoTexto").textContent = p.texto;
  $("demoPontos").innerHTML = TUT_BATALHA.map((_, k) => '<span class="demoDot' + (k === demoIndice ? ' ativo' : '') + '"></span>').join("");
  $("demoAnt").disabled = demoIndice === 0;
  $("demoProx").hidden = demoIndice === TUT_BATALHA.length - 1;
  $("demoOk").hidden = demoIndice !== TUT_BATALHA.length - 1;
  $("demoCursor").classList.remove("tocando");
  if (demoIndice === 0) demoPunctuacao(0);
  else if (demoIndice === 1) demoErro();
  else demoPontuacaoFinal();
  show("demoBatalha");
}
function apontarDemo(alvo, mensagem, corrigir) {
  clearTimeout(demoTimer);
  demoTimer = setTimeout(() => {
    const alvoEl = $(alvo), cursor = $("demoCursor"), palco = $("demoPalco");
    if (!alvoEl) return;
    const a = alvoEl.getBoundingClientRect(), b = palco.getBoundingClientRect();
    cursor.style.left = (a.left - b.left + a.width * 0.78) + "px";
    cursor.style.top = (a.top - b.top + a.height * 0.45) + "px";
    cursor.classList.add("visivel");
    demoTimer = setTimeout(() => {
      cursor.classList.add("tocando");
      if (corrigir) alvoEl.classList.add("demoAcerto");
      else if (demoIndice !== 1) alvoEl.classList.add("demoErro");
      if (corrigir) alvoEl.querySelector(".tx").insertAdjacentHTML("beforeend", '<b class="semi">' + corrigir + "</b>");
      $("demoResultado").textContent = mensagem;
      demoTimer = setTimeout(() => {
        if (demoIndice === 0) demoPunctuacao(demoDemoTipo === 0 ? 1 : 0);
        else if (demoIndice === 1) demoAvancarCodigoDemo();
      }, demoIndice === 0 ? 2200 : 1700);
    }, 500);
  }, 500);
}
let demoDemoTipo = 0;
function demoPunctuacao(tipo) {
  demoDemoTipo = tipo;
  const python = tipo === 1;
  const linhas = python
    ? ['vidas = 3', 'if vidas > 0', '    print("Vai!")']
    : ['int vidas = 3;', 'int erros = 0', 'printf("%d", vidas);'];
  const alvo = python ? 1 : 1;
  $("demoVis").innerHTML = '<div class="demoJanela"><div class="demoEtiqueta">' + (python ? "PYTHON · falta :" : "C · falta ;") +
    '</div><div class="demoCodigo">' + linhas.map((x, k) => '<div class="demoLinha' + (k === alvo ? ' alvo' : '') + '" id="demoLinha' + k + '"><span class="no">' +
    (k + 1) + '</span><span class="tx">' + hl(x) + '</span></div>').join("") +
    '</div><div class="demoResultado" id="demoResultado">Observe o cursor...</div></div>';
  $("demoCursor").classList.remove("visivel", "tocando");
  apontarDemo("demoLinha" + alvo, python ? "Toque na linha e complete com :" : "Toque na linha e complete com ;", python ? ":" : ";");
}
function demoErro() {
  $("demoVis").innerHTML = '<div class="demoJanela"><div class="demoEtiqueta">O JOGO CONTINUA</div><div class="demoCodigo"><div class="demoLinha"><span class="no">1</span><span class="tx">int vidas = 3;</span></div><div class="demoLinha alvo" id="demoAlvo"><span class="no">2</span><span class="tx">if (vidas > 0);</span></div><div class="demoLinha"><span class="no">3</span><span class="tx">printf("Vai!");</span></div></div><div class="demoResultado" id="demoResultado">Toque numa linha errada para ver o que acontece.</div><div class="demoLegenda">O erro toca um som e não vale pontos.</div></div>';
  $("demoCursor").classList.remove("visivel", "tocando");
  apontarDemo("demoAlvo", "Som de erro; este código não pontua.", null);
}
function demoAvancarCodigoDemo() {
  $("demoCursor").classList.remove("visivel", "tocando");
  const vis = $("demoVis");
  vis.classList.remove("demoTroca");
  void vis.offsetWidth;
  vis.innerHTML = '<div class="demoJanela demoTroca"><div class="demoEtiqueta">CÓDIGO NOVO</div><div class="demoCodigo"><div class="demoLinha"><span class="no">1</span><span class="tx">for (int i = 0; i &lt; 3; i++)</span></div><div class="demoLinha alvo"><span class="no">2</span><span class="tx">    printf("Próximo código");</span></div></div><div class="demoResultado">A tentativa acabou. O jogo já avançou.</div></div>';
}
function demoPontuacaoFinal() {
  $("demoVis").innerHTML = '<div class="demoResumo"><div class="demoResumoCab"><b>Round</b><b>Ana</b><b>Beto</b></div><div><span>1 · Fácil</span><b>4 acertos · 2 erros · +4</b><b>3 acertos · 1 erro · +3</b></div><div><span>2 · Médio</span><b>5 acertos · 1 erro · +5</b><b>5 acertos · 2 erros · +5</b></div><div class="final"><span>3 · Difícil</span><b>8 acertos · combo x2 · +16</b><b>4 acertos · combo x1 · +8</b></div></div><div class="demoResultado demoSuspense" id="demoResultado">Contando os três rounds...</div>';
  $("demoCursor").classList.remove("visivel", "tocando");
  demoTimer = setTimeout(() => {
    if (demoIndice !== 2 || !$("demoResultado")) return;
    $("demoResultado").textContent = "Total: Ana 25 · Beto 16";
    demoTimer = setTimeout(() => {
      if (demoIndice === 2 && $("demoResultado")) $("demoResultado").textContent = "E a vencedora é... Ana!";
    }, 1300);
  }, 1300);
}
function fecharTutorialBatalha() {
  clearTimeout(demoTimer);
  $("demoCursor").classList.remove("visivel", "tocando");
  pararMusica("musicaDesafio");
  const seguir = demoAoConcluir;
  demoAoConcluir = null;
  tutorialBatalhaVisto = true;
  if (seguir) seguir();
}
function tocarSfx(id) {
  const som = $(id);
  if (!som) return;
  try {
    if (audioCtx && audioCtx.state === "suspended") audioCtx.resume().catch(() => {});
    som.muted = false;
    som.pause();
    som.currentTime = 0;
    som.volume = configuracao.sfx;
    const tocando = som.play();
    if (tocando) tocando.catch(() => {});
  } catch (e) {}
}
function bRound() {
  const partida = B, token = ++B.token, fase = P[B.etapa], musica = $('musicaDesafio');
  pararMusica("musicaMenu");
  musica.volume = configuracao.batalha;
  musica.loop = false;
  B.on = true;
  B.sequencia = [0, 0];
  $('bInfo').textContent = 'Etapa ' + (B.etapa + 1) + '/3 · ' + fase.n + (B.etapa === 2 ? ' · PONTOS EM DOBRO' : '');
  [0, 1].forEach((s) => {
    $('lado' + s).style.setProperty('--perigo-bg', '0%');
  });
  [0, 1].forEach((s) => {
    $('cab' + s).innerHTML = '<span>' + esc(B.j[s]) + ' · ' + B.pts[s] + ' pts</span><span class="lg">?</span>';
  });
  $('bMsg').textContent = '';
  show('batalha');
  [0, 1].forEach((s) => bNovaPergunta(s, token, partida));
  tocarMusica("musicaDesafio", { volume: configuracao.batalha, loop: false, resetar: true });
  const iniciarRelogio = () => {
    if (B !== partida || token !== B.token || !B.on) return;
    const duracao = Number.isFinite(musica.duration) ? musica.duration : 180;
    clearTimeout(B.timerEtapa);
    const restante = duracao - 2 - musica.currentTime;
    if (restante <= 0) return bFimEtapa(token, partida);
    B.timerEtapa = setTimeout(() => bFimEtapa(token, partida), restante * 1000);
  };
  musica.onloadedmetadata = iniciarRelogio;
  const tocando = musica.play();
  if (tocando) tocando.then(() => {
    if (Number.isFinite(musica.duration)) iniciarRelogio();
  }).catch(() => {
    $('bMsg').textContent = 'Não foi possível tocar a trilha. A etapa seguirá sem áudio.';
    iniciarRelogio();
  });
  iniciarRelogio();
}
function bNovaPergunta(s, token, partida) {
  if (B !== partida || token !== B.token || !B.on) return;
  const r = { ...sorteia(P[B.etapa].s), ph: B.etapa };
  B.perguntas[s] = r;
  B.respondidos[s] = false;
  B.errosLinha[s] = new Set();
  const cols = Math.max(...r.c.map((x) => x.length)) + 4;
  $('cod' + s).style.setProperty('--fw', 45 / (cols * 0.6) + 'vw');
  $('cod' + s).style.setProperty('--fh', (58 / r.c.length - 1) / 1.35 + 'vh');
  const lg = $('cab' + s).children[1];
  lg.className = 'lg ' + r.l;
  lg.textContent = r.l;
  $('cod' + s).innerHTML = r.c.map((x, k) =>
    '<div class="ln" data-k="' + k + '"><span class="no">' + (k + 1) + '</span><span class="tx" style="--linha:' + k + '">' + hl(x) + '</span></div>'
  ).join('');
}
$('bLados').addEventListener('pointerdown', (e) => {
  const d = e.target.closest('.ln');
  if (!d || !B || !B.on) return;
  const s = +d.closest('.lado').dataset.s, k = +d.dataset.k;
  if (B.respondidos[s]) return;
  const r = B.perguntas[s], certo = k === r.a;
  if (!certo) {
    B.errosLinha[s].add(k);
    B.etapaLogs[B.etapa][s].push({ certo: false, linha: k, idioma: r.l, pts: 0 });
    B.respondidos[s] = true;
    B.sequencia[s] = 0;
    tocarSfx('sfxErrado');
    const token = B.token, partida = B;
    setTimeout(() => bNovaPergunta(s, token, partida), 350);
    return;
  }
  B.respondidos[s] = true;
  B.sequencia[s]++;
  const multiplicador = B.etapa === 2 ? Math.min(3, 1 + Math.floor((B.sequencia[s] - 1) / 3)) : 1;
  const valor = (B.etapa === 2 ? 2 : 1) * multiplicador;
  B.etapaLogs[B.etapa][s].push({ certo: true, linha: k, idioma: r.l, pts: valor, multiplicador });
  B.pts[s] += valor;
  B.etapaPontos[B.etapa][s] += valor;
  $('cab' + s).children[0].textContent = B.j[s] + ' · ' + B.pts[s] + ' pts';
  tocarSfx('sfxCerto');
  const token = B.token, partida = B;
  setTimeout(() => bNovaPergunta(s, token, partida), 350);
});
function bFimEtapa(token, partida) {
  if (B !== partida || token !== B.token || !B.on) return;
  B.on = false;
  clearTimeout(B.timerPergunta);
  const etapa = B.etapa;
  B.prontos = [false, false];
  if (etapa < 2) {
    $('resTitulo').textContent = 'Etapa ' + (etapa + 1) + ' concluída';
    $('resSub').textContent = 'Confirme quando estiver pronto. A próxima etapa começa depois que os dois confirmarem.';
    $('resPlacar').innerHTML = '';
    $('resProntos').innerHTML = [0, 1].map((s) => '<button class="btn pronto" data-ready="' + s + '">' + esc(B.j[s]) + ': pronto para a próxima etapa</button>').join('');
    show('resumo');
    return;
  }
  setTimeout(() => { if (B === partida) bFim(); }, 2200);
}
$('resProntos').addEventListener('click', (e) => {
  const botao = e.target.closest('[data-ready]');
  if (!botao || !B || B.etapa >= 2) return;
  const s = +botao.dataset.ready;
  if (B.prontos[s]) return;
  B.prontos[s] = true;
  botao.disabled = true;
  botao.textContent = B.j[s] + ': pronto!';
  if (B.prontos[0] && B.prontos[1]) {
    $('resSub').textContent = 'A trilha termina e a próxima etapa começa em alguns segundos...';
    const jogo = B;
    setTimeout(() => {
      if (B !== jogo) return;
      B.etapa++;
      bRound();
    }, 5200);
  }
});
$('resSair').onclick = home;

function bFim() {
  const [a, b] = B.pts;
  const [n1, n2] = B.j;
  const partida = B;
  $("fbT").textContent = "Contagem final";
  $("fbP").textContent = "Vamos rever os três rounds.";
  const linhasResultado = B.etapaLogs.map((round, k) => {
    const celulas = [0, 1].map((s) => {
      const logs = round[s];
      const acertos = logs.filter((x) => x.certo).length;
      const erros = logs.length - acertos;
      const melhorMultiplicador = Math.max(1, ...logs.map((x) => x.multiplicador || 1));
      return '<td>' + acertos + ' acertos · ' + erros + ' erros' + (k === 2 ? ' · combo x' + melhorMultiplicador : '') +
        '<strong>+' + B.etapaPontos[k][s] + ' pontos</strong></td>';
    }).join('');
    return '<tr><th>Round ' + (k + 1) + '<small>' + esc(P[k].n) + '</small></th>' + celulas + '</tr>';
  }).join('');
  $("finalResumo").innerHTML = '<table class="placarFinal"><thead><tr><th>Round</th><th>' + esc(n1) + '</th><th>' + esc(n2) + '</th></tr></thead><tbody>' + linhasResultado + '</tbody></table>';
  show("fimBat");
  setTimeout(() => {
    if (B !== partida) return;
    $("fbP").textContent = n1 + " " + a + " pontos · " + b + " pontos " + n2;
    $("fbT").textContent = "E o vencedor é...";
  }, 2200);
  setTimeout(() => {
    if (B !== partida) return;
    $("fbT").textContent = a === b ? "Empate" : (a > b ? n1 : n2) + " venceu";
  }, 4200);
  if (torneioAtivo) setTimeout(() => { if (B === partida && torneioAtivo) resolverFim(); }, 6500);
  else idle = setTimeout(home, 25000);
}
function resolverFim() {
  const [a, b] = B.pts,
    [n1, n2] = B.j;
  if (torneioAtivo) {
    const vencedor = a === b ? null : a > b ? n1 : n2;
    B.on = false;
    if (!vencedor) {
      $("fbT").textContent = "Empate! Confronto decisivo";
      $("fbP").textContent = "A partida será repetida para definir quem avança.";
      $("vsN1").textContent = n1;
      $("vsN2").textContent = n2;
      show("telaVS");
      return;
    }
    if (vencedor) torneioAtivo.vencedores.push(vencedor);
    const proximo = proximoJogoTorneio();
    if (proximo) {
      $("fbT").textContent = "Próximo confronto";
      $("fbP").textContent = torneioAtivo.jogos.length + " confronto(s) restantes nesta fase.";
      $("vsN1").textContent = proximo[0];
      $("vsN2").textContent = proximo[1];
      show("telaVS");
      return;
    }
    if (torneioAtivo.jogadores.length === 1) {
      $("fbT").textContent = torneioAtivo.jogadores[0] + " venceu o torneio!";
      $("fbP").textContent = "Campeão do torneio eliminatório.";
      torneioAtivo = null;
      show("fimBat");
      idle = setTimeout(home, 25000);
      return;
    }
    torneioAtivo.jogadores = torneioAtivo.vencedores;
    torneioAtivo.vencedores = [];
    if (torneioAtivo.jogadores.length === 1) {
      $("fbT").textContent = torneioAtivo.jogadores[0] + " venceu o torneio!";
      $("fbP").textContent = "Campeão do torneio eliminatório.";
      torneioAtivo = null;
      show("fimBat");
      idle = setTimeout(home, 25000);
      return;
    }
    montarJogosTorneio();
    const p = torneioAtivo.jogos[0];
    torneioAtivo.indice = 0;
    if (p) {
      $("fbT").textContent = "Nova fase do torneio";
      $("fbP").textContent = torneioAtivo.jogadores.length + " jogadores restantes.";
      $("vsN1").textContent = p[0];
      $("vsN2").textContent = p[1];
      show("telaVS");
      return;
    }
  }
  $("fbT").textContent = a === b ? "Empate" : (a > b ? n1 : n2) + " venceu";
  $("fbP").innerHTML = "<b>" + esc(n1) + "</b> " + a + " × " + b + " <b>" + esc(n2) + "</b>";
  show("fimBat");
  idle = setTimeout(home, 25000);
}
setInterval(() => {
  if (!B || !B.on) return;
  const audio = $("musicaDesafio");
  const duracao = Number.isFinite(audio.duration) ? Math.max(1, audio.duration - 2) : 180;
  const restante = Math.max(0, duracao - audio.currentTime);
  const perigo = Math.min(1, Math.max(0, 1 - restante / duracao));
  [0, 1].forEach((s) => {
    $("lado" + s).style.setProperty("--perigo-bg", (100 * perigo).toFixed(1) + "%");
  });
}, 100);
function iniciarConfrontoAtual() {
  if (torneioAtivo) {
    const par = torneioAtivo.jogos[torneioAtivo.indice];
    iniciarBatalha({ n: par[0] }, { n: par[1] });
  }
  const lados = $("bLados");
  lados.classList.remove("dividindo");
  void lados.offsetWidth;
  lados.classList.add("dividindo");
  bRound();
}
$("vsGo").onclick = () => {
  $("musicaMenu").pause();
  if (!tutorialBatalhaVisto) {
    iniciarTutorialBatalha(iniciarConfrontoAtual);
  } else iniciarConfrontoAtual();
};
$("demoAnt").onclick = () => {
  if (demoIndice > 0) { demoIndice--; mostraDemoBatalha(); }
};
$("demoProx").onclick = () => {
  if (demoIndice < TUT_BATALHA.length - 1) { demoIndice++; mostraDemoBatalha(); }
};
$("demoOk").onclick = fecharTutorialBatalha;
$("demoSair").onclick = home;
$("vsVoltar").onclick = home;
$("fbInicio").onclick = home;
$("revanche").onclick = () => {
  clearTimeout(idle);
  iniciarBatalha({ n: B.j[0] }, { n: B.j[1] });
};
$("fs").onclick = () => {
  try {
    document.fullscreenElement
      ? document.exitFullscreen()
      : document.documentElement.requestFullscreen();
  } catch (e) {}
};
home();
