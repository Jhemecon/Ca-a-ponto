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
  modo = "solo",
  J1 = null,
  B = null,
  tutDepois = null;
const LS = "pvplayers2",
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
          `<li class="${cur && p.n === cur.n ? "me" : ""}"><span>${["🥇", "🥈", "🥉"][k] || k + 1 + "º"} ${esc(p.n)}</span><b>${p.b}</b></li>`,
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
  if (!PL.length) return nameScr();
  $("pl").innerHTML = PL.filter((p) => !(modo === "b2" && p.n === J1.n))
    .sort((a, b) => b.t - a.t)
    .map(
      (p, k) =>
        `<button class="pb${k ? "" : " last"}" data-n="${esc(p.n)}">${esc(p.n)}<small>${p.b ? "recorde " + p.b : "sem pontos ainda"}</small></button>`,
    )
    .join("");
  show("whoS");
}
const drawN = () => {
  $("nin").textContent = nm + "_";
};
function nameScr() {
  $("nmT").textContent =
    modo === "b1"
      ? "Jogador 1: qual é o seu nome?"
      : modo === "b2"
        ? "Jogador 2: qual é o seu nome?"
        : "Qual é o seu nome?";
  nm = "";
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
        ? "🐍 Achou! Sem esse : o Python solta um SyntaxError de pavor."
        : "✅ Achou! Sem esse ; o compilador solta um grito de terror.",
      "ok-t",
    );
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
    say("Essa linha está certa! Procure em outra. 🔍", "bad-t");
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
  $("et").textContent = win ? "Bugs exorcizados! 🎃" : "O tempo acabou… 💀";
  $("es").innerHTML =
    `<b>${esc(cur.n)}</b>, você caçou <b>${done}/${TOT}</b> fantasmas<br>Pontos: <b>${sc}</b>${rec ? " · 🔥 novo recorde pessoal!" : " · seu recorde: <b>" + cur.b + "</b>"}${pos ? "<br>Posição no ranking: <b>" + pos + "º</b>" : ""}` +
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
  B = null;
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
  modo = "solo";
  who();
};
$("again").onclick = () => {
  modo = "solo";
  who();
};
$("btnBat").onclick = () => {
  modo = "b1";
  who();
};
$("btnTut").onclick = () => tutorial(home);
$("newp").onclick = nameScr;
$("back").onclick = home;
$("nback").onclick = () => (PL.length ? who() : home());
$("pl").addEventListener("click", (e) => {
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
  if (PL.some((p) => p.n.toLowerCase() === n.toLowerCase()))
    return void ($("nerr").textContent = "Esse nome já existe! Volte e toque nele na lista.");
  const j = { n, b: 0, p: 0, t: Date.now() };
  PL.push(j);
  save();
  escolheu(j, true);
};
window.addEventListener("load", initDb);

/* ---------- escolha de jogador (solo ou batalha) ---------- */
function escolheu(j, novo) {
  if (modo === "solo") {
    cur = j;
    novo ? tutorial(start) : start();
  } else if (modo === "b1") {
    J1 = j;
    modo = "b2";
    who();
  } else iniciarBatalha(J1, j);
}

/* ---------- tutorial ---------- */
const TUT = [
  {
    t: "Como jogar",
    h: "Em cada rodada aparece um código com <b>um erro</b>.<br>Falta um <b>;</b> no fim de uma linha em <b>C</b> e <b>Java</b>, ou os <b>:</b> em <b>Python</b>.<br>Toque na linha com o erro antes que o tempo acabe!",
  },
  {
    t: "Treine: C e Java",
    m: ";",
    a: 1,
    c: ["int vidas = 3;", "int fantasmas = 5", 'printf("%d", vidas);'],
    h: "Qual linha está sem o <b>;</b> no final? Toque nela!",
  },
  {
    t: "Treine: Python",
    m: ":",
    a: 1,
    c: ['nome = "Zumbi"', 'if nome == "Zumbi"', '    print("Buuu!")'],
    h: "Em Python faltam os <b>:</b> no fim de <b>if</b>, <b>for</b>, <b>while</b> e <b>def</b>. Toque na linha sem ele!",
  },
  {
    t: "Fases e tempo",
    h: "São <b>3 fases</b>, com 3 códigos cada (C, Java e Python):<br>🟢 <b>Fácil</b>: 30s por código · 🟡 <b>Médio</b>: 15s · 🔴 <b>Difícil</b>: 10s<br>Cada erro tira <b>5s</b> e bloqueia aquela linha. Acabou o tempo? Fim de jogo!",
  },
  {
    t: "Pontos",
    h: "Quanto <b>mais rápido</b> e <b>sem errar</b>, mais pontos.<br>Acertos seguidos multiplicam a pontuação (até <b>×1,5</b>), fases difíceis valem mais<br>e zerar as 3 fases dá <b>+500</b>. Seu melhor placar entra no ranking!<br>⚔️ Quer duelar? Use a <b>Batalha</b>, para 2 jogadores.",
  },
];
let tp = 0,
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
  $("tutProx").textContent = tp === TUT.length - 1 ? "🎃 Entendi, vamos jogar!" : "Próximo →";
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
    $("tutM").textContent = "✅ Isso! Sem esse " + p.m + " o código não funciona.";
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

/* ---------- batalha: tela dividida, melhor de 5 ---------- */
function iniciarBatalha(a, b) {
  let ult = "";
  const rod = [0, 1, 1, 2, 2].map((k) => {
    const ls = ["C", "Java", "Python"].filter((l) => l !== ult),
      l = ls[Math.floor(Math.random() * ls.length)];
    ult = l;
    const g = P[k].s.filter((r) => r.l === l),
      curtos = g.filter((r) => Math.max(...r.c.map((x) => x.length)) <= 50);
    return { ...sorteia(curtos.length > 2 ? curtos : g), ph: k };
  });
  B = { j: [a.n, b.n], pts: [0, 0], r: 0, rod, on: false, cong: [0, 0], t: 30, T: 30, last: 0 };
  clearTimeout(idle);
  $("vsN1").textContent = a.n;
  $("vsN2").textContent = b.n;
  show("telaVS");
}
function bRound() {
  const tok = B,
    r = B.rod[B.r],
    f = P[r.ph],
    cols = Math.max(...r.c.map((x) => x.length)) + 4;
  B.on = false;
  B.cong = [0, 0];
  B.T = B.t = f.t;
  $("bBarra").style.width = "100%";
  $("bBarra").className = "";
  $("bInfo").textContent = "Round " + (B.r + 1) + "/5 · " + f.n;
  $("bLados").style.setProperty("--fw", 45 / (cols * 0.6) + "vw");
  $("bLados").style.setProperty("--fh", (58 / r.c.length - 1) / 1.35 + "vh");
  [0, 1].forEach((s) => {
    $("lado" + s).classList.remove("gelado");
    $("cab" + s).innerHTML =
      `<span>${esc(B.j[s])} ${"●".repeat(B.pts[s])}${"○".repeat(3 - B.pts[s])}</span><span class="lg">?</span>`;
    $("cod" + s).innerHTML = '<div style="text-align:center;font-size:14vh;opacity:.35">🎃</div>';
  });
  $("bMsg").textContent = "Round " + (B.r + 1) + ": " + f.n;
  setTimeout(() => {
    if (B !== tok) return;
    $("bMsg").textContent = "JÁ!";
    setTimeout(() => {
      if (B !== tok) return;
      $("bMsg").textContent = "";
      bRevelar(r);
      B.on = true;
      B.last = performance.now();
    }, 700);
  }, 1500);
}
function bRevelar(r) {
  /* o código só aparece quando os toques são liberados */
  [0, 1].forEach((s) => {
    const lg = $("cab" + s).children[1];
    lg.className = "lg " + r.l;
    lg.textContent = r.l;
    $("cod" + s).innerHTML = r.c
      .map(
        (x, k) =>
          `<div class="ln" data-k="${k}"><span class="no">${k + 1}</span><span class="tx">${hl(x)}</span></div>`,
      )
      .join("");
  });
}
$("bLados").addEventListener("pointerdown", (e) => {
  const d = e.target.closest(".ln");
  if (!d || !B || !B.on || d.classList.contains("x")) return;
  const s = +d.closest(".lado").dataset.s,
    agora = performance.now();
  if (B.cong[s] > agora) return;
  if (+d.dataset.k === B.rod[B.r].a) bFimRound(s);
  else {
    d.classList.add("x");
    B.cong[s] = agora + 2000;
    $("lado" + s).classList.add("gelado");
    const tok = B;
    setTimeout(() => {
      if (B === tok) $("lado" + s).classList.remove("gelado");
    }, 2000);
  }
});
function bFimRound(s) {
  const tok = B,
    r = B.rod[B.r];
  B.on = false;
  if (s >= 0) B.pts[s]++;
  [0, 1].forEach((k) => {
    $("lado" + k).classList.remove("gelado");
    const d = $("cod" + k).children[r.a];
    d.classList.add("ok");
    d.querySelector(".tx").insertAdjacentHTML("beforeend", `<b class="semi">${r.m}</b>`);
    $("cab" + k).children[0].textContent =
      B.j[k] + " " + "●".repeat(B.pts[k]) + "○".repeat(3 - B.pts[k]);
  });
  $("bMsg").textContent = s < 0 ? "⏰ Tempo esgotado! Ninguém pontuou" : B.j[s] + " levou o round!";
  setTimeout(() => {
    if (B !== tok) return;
    B.r++;
    B.pts[0] >= 3 || B.pts[1] >= 3 || B.r >= 5 ? bFim() : bRound();
  }, 2200);
}
function bFim() {
  const [a, b] = B.pts,
    [n1, n2] = B.j;
  $("fbT").textContent = a === b ? "Empate! 🤝" : (a > b ? n1 : n2) + " venceu! 🏆";
  $("fbP").innerHTML = "<b>" + esc(n1) + "</b> " + a + " × " + b + " <b>" + esc(n2) + "</b>";
  show("fimBat");
  idle = setTimeout(home, 25000);
}
setInterval(() => {
  if (!B || !B.on) return;
  const n = performance.now();
  B.t -= (n - B.last) / 1000;
  B.last = n;
  $("bBarra").style.width = (Math.max(0, B.t) / B.T) * 100 + "%";
  $("bBarra").className = B.t < B.T * 0.35 ? "low" : "";
  if (B.t <= 0) bFimRound(-1);
}, 100);
$("vsGo").onclick = () => {
  show("batalha");
  bRound();
};
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
