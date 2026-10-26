const VERTICE = 'attribute vec2 a;void main(){gl_Position=vec4(a,0.,1.);}';

const RUIDO = `
float h(vec2 p){p=fract(p*vec2(123.34,456.21));p+=dot(p,p+45.32);return fract(p.x*p.y);}
float n(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);
  return mix(mix(h(i),h(i+vec2(1.,0.)),f.x),mix(h(i+vec2(0.,1.)),h(i+1.),f.x),f.y);}
float fbm(vec2 p){float s=0.,a=.5;mat2 r=mat2(.8,.6,-.6,.8);
  for(int i=0;i<5;i++){s+=a*n(p);p=r*p*2.03;a*=.5;}return s;}
`;

// Passada 1, numa textura pequena: só a densidade da fumaça. O fbm deformado
// por outro fbm (domain warping) estica o ruído em fios em vez de manchas.
const FUMACA = `precision mediump float;
uniform vec2 uRes;uniform float uT;uniform vec3 uPtr;
${RUIDO}
void main(){
  vec2 uv=gl_FragCoord.xy/uRes;float ar=uRes.x/uRes.y;
  vec2 p=vec2(uv.x*ar,uv.y)*vec2(1.4,3.);
  p.y+=.45*sin(p.x*.8+uT*.22);
  vec2 q=vec2(fbm(p+vec2(0.,uT*.05)),fbm(p+vec2(5.2,1.3)-uT*.04));
  float d=smoothstep(.36,.82,fbm(p+2.2*q+vec2(uT*.03,0.)));
  vec2 e=(uv-uPtr.xy)*vec2(ar,1.);
  d*=1.+.7*uPtr.z*exp(-dot(e,e)/.05);
  gl_FragColor=vec4(d,0.,0.,1.);}`;

// Passada 2, na resolução da tela: amplia a fumaça e aplica um grão fixo por
// pixel. A cor é a mistura entre o fundo e a tinta lidos do CSS.
const COMPOSICAO = `precision mediump float;
uniform sampler2D uF;uniform vec2 uRes;uniform vec3 uBase,uTinta;uniform float uForca;
${RUIDO}
void main(){
  float d=texture2D(uF,gl_FragCoord.xy/uRes).r;
  float g=h(floor(gl_FragCoord.xy));
  float a=clamp(d*(.7+.6*g),0.,1.)*uForca;
  gl_FragColor=vec4(mix(uBase,uTinta,a),1.);}`;

/** ~30 fps bastam para fumaça lenta. */
const QUADRO_MS = 33;
/** Começa adiantado para o primeiro quadro já ter fios formados. */
const ADIANTO = 30;

type Cor = [number, number, number];

/** O valor computado já vem resolvido, mesmo vindo de oklch() no tema. */
function lerCor(cor: string): Cor | null {
  const probe = document.createElement('canvas').getContext('2d');
  if (!probe) return null;
  // O 2D converte qualquer cor CSS para rgb, inclusive oklch e color().
  probe.fillStyle = cor;
  probe.fillRect(0, 0, 1, 1);
  const [r, g, b] = probe.getImageData(0, 0, 1, 1).data;
  return [r / 255, g / 255, b / 255];
}

function contexto(canvas: HTMLCanvasElement) {
  try {
    return canvas.getContext('webgl', {
      alpha: false,
      antialias: false,
      depth: false,
      stencil: false,
      powerPreference: 'low-power',
    });
  } catch {
    return null;
  }
}

function programa(gl: WebGLRenderingContext, fragmento: string) {
  const p = gl.createProgram()!;
  for (const [tipo, fonte] of [
    [gl.VERTEX_SHADER, VERTICE],
    [gl.FRAGMENT_SHADER, fragmento],
  ] as const) {
    const s = gl.createShader(tipo)!;
    gl.shaderSource(s, fonte);
    gl.compileShader(s);
    if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(s) ?? 'shader');
    gl.attachShader(p, s);
  }
  gl.bindAttribLocation(p, 0, 'a');
  gl.linkProgram(p);
  if (!gl.getProgramParameter(p, gl.LINK_STATUS)) throw new Error(gl.getProgramInfoLog(p) ?? 'link');
  return { p, u: (nome: string) => gl.getUniformLocation(p, nome) };
}

/**
 * Fumaça em WebGL no fundo da capa. O fundo é o `background-color` do
 * canvas e a tinta é o `color`, ambos dos tokens do tema, então trocar entre
 * papel e grafite troca a fumaça junto.
 *
 * Decorativa: qualquer falha só esconde o canvas e a capa fica lisa. Para fora
 * da tela e com a aba oculta; com movimento reduzido
 * desenha um quadro só. Devolve a limpeza, chamada antes da troca de página.
 */
export function iniciarFumaca(canvas: HTMLCanvasElement, forca: number): () => void {
  const gl = contexto(canvas);
  if (!gl) {
    canvas.hidden = true;
    return () => {};
  }

  let fumaca: ReturnType<typeof programa>;
  let composicao: ReturnType<typeof programa>;
  try {
    fumaca = programa(gl, FUMACA);
    composicao = programa(gl, COMPOSICAO);
  } catch {
    canvas.hidden = true;
    return () => {};
  }

  // Um triângulo que cobre a tela inteira, sem a diagonal de um quad.
  gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
  gl.enableVertexAttribArray(0);
  gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);

  const textura = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, textura);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  const fb = gl.createFramebuffer();

  let base: Cor = [0, 0, 0];
  let tinta: Cor = [1, 1, 1];
  const lerCores = () => {
    const estilo = getComputedStyle(canvas);
    base = lerCor(estilo.backgroundColor) ?? base;
    tinta = lerCor(estilo.color) ?? tinta;
  };
  lerCores();

  // A fumaça é calculada em 1/6 × 1/4 da área e ampliada: é o que a deixa leve.
  let pw = 2;
  let ph = 2;
  const dimensionar = () => {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = canvas.clientWidth || 1;
    const h = canvas.clientHeight || 1;
    const largura = Math.max(1, Math.round(w * dpr));
    const altura = Math.max(1, Math.round(h * dpr));
    // Redimensionar apaga o canvas: só quando o tamanho muda de verdade.
    if (largura === canvas.width && altura === canvas.height) return true;
    canvas.width = largura;
    canvas.height = altura;
    pw = Math.max(2, Math.ceil(w / 6));
    ph = Math.max(2, Math.ceil(h / 4));
    gl.bindTexture(gl.TEXTURE_2D, textura);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, pw, ph, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
    gl.bindFramebuffer(gl.FRAMEBUFFER, fb);
    gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, textura, 0);
    return gl.checkFramebufferStatus(gl.FRAMEBUFFER) === gl.FRAMEBUFFER_COMPLETE;
  };
  if (!dimensionar()) {
    canvas.hidden = true;
    return () => {};
  }

  const area = canvas.parentElement ?? canvas;
  const sinal = new AbortController();
  const ptr = { x: 0.5, y: 0.5, on: 0, tx: 0.5, ty: 0.5, ton: 0 };
  area.addEventListener('pointermove', (e) => {
    if (e.pointerType !== 'mouse') return;
    const r = area.getBoundingClientRect();
    ptr.tx = (e.clientX - r.left) / r.width;
    ptr.ty = 1 - (e.clientY - r.top) / r.height;
    ptr.ton = 1;
  }, { passive: true, signal: sinal.signal });
  area.addEventListener('pointerleave', () => { ptr.ton = 0; }, { signal: sinal.signal });

  const reduzido = window.matchMedia('(prefers-reduced-motion: reduce)');
  const inicio = performance.now();

  const desenhar = () => {
    const t = reduzido.matches ? ADIANTO : ADIANTO + (performance.now() - inicio) / 1000;
    ptr.x += (ptr.tx - ptr.x) * 0.06;
    ptr.y += (ptr.ty - ptr.y) * 0.06;
    ptr.on += (ptr.ton - ptr.on) * 0.04;

    gl.bindFramebuffer(gl.FRAMEBUFFER, fb);
    gl.viewport(0, 0, pw, ph);
    gl.useProgram(fumaca.p);
    gl.uniform2f(fumaca.u('uRes'), pw, ph);
    gl.uniform1f(fumaca.u('uT'), t);
    gl.uniform3f(fumaca.u('uPtr'), ptr.x, ptr.y, reduzido.matches ? 0 : ptr.on);
    gl.drawArrays(gl.TRIANGLES, 0, 3);

    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.useProgram(composicao.p);
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, textura);
    gl.uniform1i(composicao.u('uF'), 0);
    gl.uniform2f(composicao.u('uRes'), canvas.width, canvas.height);
    gl.uniform3f(composicao.u('uBase'), ...base);
    gl.uniform3f(composicao.u('uTinta'), ...tinta);
    gl.uniform1f(composicao.u('uForca'), forca);
    gl.drawArrays(gl.TRIANGLES, 0, 3);

    // Até o primeiro quadro o canvas fica transparente e vale o fundo da capa.
    canvas.style.opacity = '1';
  };

  let raf = 0;
  let ultimo = -Infinity;
  let visivel = true;
  const passo = (agora: number) => {
    raf = requestAnimationFrame(passo);
    if (agora - ultimo < QUADRO_MS) return;
    ultimo = agora;
    desenhar();
  };
  const atualizar = () => {
    cancelAnimationFrame(raf);
    raf = 0;
    if (reduzido.matches || !visivel || document.hidden) {
      desenhar();
      return;
    }
    raf = requestAnimationFrame(passo);
  };

  const io = new IntersectionObserver(([entrada]) => {
    visivel = entrada.isIntersecting;
    atualizar();
  });
  io.observe(canvas);

  // Desenha na hora, antes da pintura: esperar o próximo quadro deixava o
  // canvas recém-apagado aparecer vazio por um instante (o fundo piscava).
  const ro = new ResizeObserver(() => {
    if (!dimensionar()) {
      canvas.hidden = true;
      return;
    }
    desenhar();
  });
  ro.observe(canvas);

  // A troca de tema muda as cores computadas, mesmo com o loop parado.
  const aoMudarTema = () => {
    lerCores();
    if (!raf) desenhar();
  };
  const mo = new MutationObserver(aoMudarTema);
  mo.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
  reduzido.addEventListener('change', atualizar, { signal: sinal.signal });
  document.addEventListener('visibilitychange', atualizar, { signal: sinal.signal });
  canvas.addEventListener('webglcontextlost', (e) => {
    e.preventDefault();
    cancelAnimationFrame(raf);
    canvas.hidden = true;
  }, { signal: sinal.signal });

  atualizar();

  return () => {
    cancelAnimationFrame(raf);
    io.disconnect();
    ro.disconnect();
    mo.disconnect();
    sinal.abort();
  };
}
