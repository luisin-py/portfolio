/* ==========================================================================
   Interactive Controls, KaTeX Math Rendering, PT/EN Toggle & Monochrome Flow
   ========================================================================== */

(() => {
  // 0. Render LaTeX (.tex) formulas via KaTeX auto-render
  function renderMath() {
    if (typeof window.renderMathInElement === 'function') {
      window.renderMathInElement(document.body, {
        delimiters: [
          { left: '$$', right: '$$', display: true },
          { left: '$', right: '$', display: false },
          { left: '\\(', right: '\\)', display: false },
          { left: '\\[', right: '\\]', display: true },
        ],
        throwOnError: false,
      });
    }
  }

  window.addEventListener('DOMContentLoaded', renderMath);
  window.addEventListener('load', renderMath);

  // 1. Theme toggle
  const htmlEl = document.documentElement;
  const themeBtn = document.getElementById('themeToggle');
  const savedTheme = localStorage.getItem('portfolio_theme') || 'dark';
  htmlEl.setAttribute('data-theme', savedTheme);
  themeBtn.textContent = savedTheme === 'dark' ? '☀' : '☾';

  themeBtn.addEventListener('click', () => {
    const next = htmlEl.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    htmlEl.setAttribute('data-theme', next);
    localStorage.setItem('portfolio_theme', next);
    themeBtn.textContent = next === 'dark' ? '☀' : '☾';
  });

  // 2. Mobile menu
  const menuBtn = document.getElementById('menuToggle');
  const navLinks = document.getElementById('navLinks');
  menuBtn.addEventListener('click', () => navLinks.classList.toggle('open'));
  navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => navLinks.classList.remove('open'));
  });

  // 3. Project filter
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;

      projectCards.forEach((card) => {
        const tags = (card.dataset.tags || '').split(' ');
        const show = filter === 'all' || tags.includes(filter);
        card.classList.toggle('hidden', !show);
      });
    });
  });

  // 4. Publications tabs
  const tabBtns = document.querySelectorAll('.tab-btn');
  const pubLists = document.querySelectorAll('.pub-list');

  tabBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      tabBtns.forEach((b) => b.classList.remove('active'));
      pubLists.forEach((l) => l.classList.remove('active'));
      btn.classList.add('active');
      const target = document.getElementById(`tab-${btn.dataset.tab}`);
      if (target) target.classList.add('active');
    });
  });

  // 5. Copy email button
  const copyBtn = document.getElementById('copyEmailBtn');
  if (copyBtn) {
    copyBtn.addEventListener('click', async () => {
      const email = 'luisfernandessaucedosouza4@gmail.com';
      try {
        await navigator.clipboard.writeText(email);
        const prev = copyBtn.textContent;
        copyBtn.textContent = currentLang === 'en' ? 'Email Copied ✓' : 'E-mail Copiado ✓';
        setTimeout(() => {
          copyBtn.textContent = prev;
        }, 2200);
      } catch {
        window.location.href = `mailto:${email}`;
      }
    });
  }

  // 6. Bilingual PT / EN toggle (using PPGMMat consistently)
  const i18n = {
    pt: {
      nav_about: 'Sobre',
      nav_projects: 'Projetos',
      nav_publications: 'Publicações',
      nav_stack: 'Stack & Ensino',
      nav_contact: 'Contato',
      hero_eyebrow: 'Mestrando em Modelagem Matemática (PPGMMat / UFPel · CAPES) · Engenheiro de IA & BI',
      hero_lead:
        'Unindo <strong>Matemática Aplicada</strong>, <strong>Scientific Machine Learning</strong> (PINNs, PySHRED, ANFIS, LSTM) e <strong>Engenharia de Dados em Nuvem</strong> para modelar fenômenos físicos complexos, séries temporais e problemas reais de decisão.',
      btn_projects: 'Explorar Projetos',
      btn_publications: 'Ver Publicações',
      metric_journals: 'Artigos em Periódicos',
      metric_proceedings: 'Trabalhos em Anais',
      metric_repos: 'Repositórios Públicos',
      metric_courses: 'Minicursos Ministrados',
      eq_caption: 'Equações de Navier–Stokes · PINNs & PySHRED',
      about_title: 'Trajetória Acadêmica & Profissional',
      about_subtitle:
        'Base sólida em Matemática Aplicada conectada diretamente à pesquisa de fronteira em Deep Learning científico e soluções de dados em produção.',
      col_academic: 'Formação & Pesquisa',
      col_industry: 'Engenharia de IA & Dados',
      acad_1_title: 'Mestrado em Modelagem Matemática (PPGMMat)',
      acad_1_desc:
        'Pesquisa em <strong>Redes Neurais Informadas por Física (PINNs)</strong>, <strong>PySHRED (Shallow Recurrent Decoders)</strong>, sistemas neuro-fuzzy (<strong>ANFIS</strong>) e redes recorrentes (<strong>LSTM</strong>) aplicados à modelagem hidrodinâmica (Lagoa dos Patos e Barra de Rio Grande) e equações diferenciais parciais. Orientador: Prof. Dr. Régis Sperotto de Quadros.',
      acad_2_title: 'Bacharelado em Matemática Aplicada',
      acad_2_desc:
        'TCC sobre <em>Redes Neurais Profundas e a Previsão de Preço de Ativos Financeiros</em>. Bolsista PIBIC/PIBITI CNPq (2022–2024) e Voluntário de Pesquisa (2024–2026) no Laboratório de Matemática Aplicada e Computacional; Monitor de Cálculo e Álgebra Linear no Projeto TEMAT (480h). <strong>Prêmio Destaque em Ciências Exatas e da Terra</strong> na 22ª MPU / 32º CIC (2023).',
      ind_1_title: 'Engenheiro de IA & Analista de Business Intelligence',
      ind_1_desc:
        'Arquitetura de pipelines analíticos em nuvem (<strong>Google BigQuery / SQL</strong>), modelos preditivos de séries temporais, <strong>Marketing Mix Modeling (MMM com Robyn & PyMC)</strong>, Machine Learning (LSTM, LightGBM) e dashboards executivos em Looker Studio e Python.',
      ind_2_title: 'Desenvolvedor Full-Stack com IA & Automação',
      ind_2_desc:
        'Desenvolvimento ponta a ponta de aplicações web e fluxos inteligentes com IA, integrando front-end (<strong>TypeScript, HTML/CSS</strong>), back-end (<strong>Python</strong>) e banco de dados relacional (<strong>PostgreSQL</strong>).',
      projects_title: 'Projetos em Destaque',
      projects_subtitle:
        'Repositórios selecionados de modelagem físico-matemática, Deep Learning, engenharia de dados e simuladores interativos.',
      filter_all: 'Todos',
      filter_sciml: 'SciML & Hidrodinâmica',
      filter_ai: 'Deep Learning & IA',
      filter_finance: 'Dados & Finanças',
      filter_sim: 'Simuladores & Ensino',
      pub_title: 'Publicações & Congressos',
      pub_subtitle:
        'Artigos publicados em periódicos revisados por pares e trabalhos completos em congressos nacionais de Modelagem Computacional e Matemática Aplicada.',
      tab_journals: 'Periódicos (4)',
      tab_enmc: 'XXIX ENMC 2026 (4)',
      tab_conf: 'CNMAC, ERMAC & SBM',
      stack_title: 'Stack Técnico, Ensino & Reconhecimentos',
      contact_title: 'Vamos conversar sobre pesquisa, IA ou projetos?',
      contact_subtitle:
        'Aberto a colaborações acadêmicas em Modelagem Computacional / Scientific ML e projetos desafiadores em Inteligência Artificial e Engenharia de Dados.',
    },
    en: {
      nav_about: 'About',
      nav_projects: 'Projects',
      nav_publications: 'Publications',
      nav_stack: 'Stack & Teaching',
      nav_contact: 'Contact',
      hero_eyebrow: 'M.Sc. Student in Mathematical Modeling (PPGMMat / UFPel · CAPES) · AI Engineer & BI Analyst',
      hero_lead:
        'Bridging <strong>Applied Mathematics</strong>, <strong>Scientific Machine Learning</strong> (PINNs, PySHRED, ANFIS, LSTM), and <strong>Cloud Data Engineering</strong> to model complex physical systems, time series, and real-world decision problems.',
      btn_projects: 'Explore Projects',
      btn_publications: 'View Publications',
      metric_journals: 'Journal Articles',
      metric_proceedings: 'Conference Papers',
      metric_repos: 'Public Repositories',
      metric_courses: 'Workshops Taught',
      eq_caption: 'Navier–Stokes Equations · PINNs & PySHRED',
      about_title: 'Academic & Industry Background',
      about_subtitle:
        'Strong foundation in Applied Mathematics directly connected to frontier Scientific Deep Learning research and production data pipelines.',
      col_academic: 'Education & Research',
      col_industry: 'AI & Data Engineering',
      acad_1_title: 'M.Sc. in Mathematical Modeling (PPGMMat)',
      acad_1_desc:
        'Research on <strong>Physics-Informed Neural Networks (PINNs)</strong>, <strong>PySHRED (Shallow Recurrent Decoders)</strong>, neuro-fuzzy systems (<strong>ANFIS</strong>), and recurrent networks (<strong>LSTM</strong>) for hydrodynamic modeling (Lagoa dos Patos & Rio Grande channel) and PDEs. Advisor: Prof. Dr. Régis Sperotto de Quadros.',
      acad_2_title: 'B.Sc. in Applied Mathematics',
      acad_2_desc:
        'Thesis on <em>Deep Neural Networks and Financial Asset Price Forecasting</em>. CNPq PIBIC/PIBITI Research Fellow (2022–2024) and Undergraduate Researcher (2024–2026); Calculus & Linear Algebra TA at Project TEMAT (480h). <strong>Best Paper / Distinction Award in Exact Sciences</strong> at 22nd MPU / 32nd CIC (2023).',
      ind_1_title: 'AI Engineer & Business Intelligence Analyst',
      ind_1_desc:
        'Cloud analytics pipelines (<strong>Google BigQuery / SQL</strong>), time-series forecasting, <strong>Marketing Mix Modeling (Robyn & PyMC)</strong>, Machine Learning (LSTM, LightGBM), and executive dashboards in Looker Studio and Python.',
      ind_2_title: 'Full-Stack Developer (AI & Automation)',
      ind_2_desc:
        'End-to-end web development and AI-powered workflow automation integrating front-end (<strong>TypeScript, HTML/CSS</strong>), back-end (<strong>Python</strong>), and relational databases (<strong>PostgreSQL</strong>).',
      projects_title: 'Featured Projects',
      projects_subtitle:
        'Selected repositories spanning physics-informed modeling, Deep Learning, data engineering, and interactive fluid simulators.',
      filter_all: 'All',
      filter_sciml: 'SciML & Hydrodynamics',
      filter_ai: 'Deep Learning & AI',
      filter_finance: 'Data & Finance',
      filter_sim: 'Simulators & Teaching',
      pub_title: 'Publications & Conferences',
      pub_subtitle:
        'Peer-reviewed journal articles and full conference papers in Computational Modeling and Applied Mathematics.',
      tab_journals: 'Journals (4)',
      tab_enmc: 'XXIX ENMC 2026 (4)',
      tab_conf: 'CNMAC, ERMAC & SBM',
      stack_title: 'Technical Stack, Teaching & Awards',
      contact_title: "Let's talk about research, AI, or data projects?",
      contact_subtitle:
        'Open to academic collaborations in Computational Modeling / Scientific ML and high-impact projects in AI and Data Engineering.',
    },
  };

  let currentLang = 'pt';
  const langBtn = document.getElementById('langToggle');
  langBtn.addEventListener('click', () => {
    currentLang = currentLang === 'pt' ? 'en' : 'pt';
    langBtn.textContent = currentLang === 'pt' ? 'EN' : 'PT';
    htmlEl.setAttribute('lang', currentLang === 'pt' ? 'pt-BR' : 'en');
    document.querySelectorAll('[data-i18n]').forEach((el) => {
      const key = el.dataset.i18n;
      if (i18n[currentLang][key]) {
        el.innerHTML = i18n[currentLang][key];
      }
    });
    renderMath();
  });

  // 7. Dynamic year
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  // 8. Monochrome 2D Fluid Streamline Simulation on Hero Canvas
  const canvas = document.getElementById('fluidCanvas');
  if (!canvas || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const ctx = canvas.getContext('2d');
  let width = 0;
  let height = 0;
  let particles = [];
  const mouse = { x: -9999, y: -9999 };
  let t = 0;

  function resize() {
    width = canvas.width = canvas.offsetWidth;
    height = canvas.height = canvas.offsetHeight;
    const count = Math.min(95, Math.max(40, Math.floor((width * height) / 13000)));
    particles = Array.from({ length: count }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      life: Math.random() * 140 + 40,
      speed: Math.random() * 0.8 + 0.45,
      alpha: Math.random() * 0.22 + 0.14,
    }));
  }

  window.addEventListener('resize', resize);
  window.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
  });

  resize();

  function fieldVelocity(x, y, time) {
    const nx = x * 0.003;
    const ny = y * 0.004;
    const vx = Math.cos(ny * 2.0 + time) + 0.6 * Math.sin(nx * 1.3 - time * 0.65) + 0.85;
    const vy = Math.sin(nx * 1.9 + time * 0.8) * 0.78;
    return { vx, vy };
  }

  function animate() {
    t += 0.005;
    const isLight = htmlEl.getAttribute('data-theme') === 'light';
    ctx.fillStyle = isLight ? 'rgba(250, 250, 249, 0.16)' : 'rgba(9, 9, 11, 0.16)';
    ctx.fillRect(0, 0, width, height);

    for (const p of particles) {
      const { vx, vy } = fieldVelocity(p.x, p.y, t);
      let dx = vx * p.speed;
      let dy = vy * p.speed;

      const mx = p.x - mouse.x;
      const my = p.y - mouse.y;
      const dist2 = mx * mx + my * my;
      if (dist2 < 16000 && dist2 > 1) {
        const force = (1 - dist2 / 16000) * 1.8;
        dx += (mx / Math.sqrt(dist2)) * force;
        dy += (my / Math.sqrt(dist2)) * force;
      }

      const prevX = p.x;
      const prevY = p.y;
      p.x += dx;
      p.y += dy;
      p.life -= 1;

      ctx.strokeStyle = isLight
        ? `rgba(24, 24, 27, ${p.alpha})`
        : `rgba(228, 228, 231, ${p.alpha})`;
      ctx.lineWidth = 1.15;
      ctx.beginPath();
      ctx.moveTo(prevX, prevY);
      ctx.lineTo(p.x, p.y);
      ctx.stroke();

      if (p.life <= 0 || p.x < -10 || p.x > width + 10 || p.y < -10 || p.y > height + 10) {
        p.x = Math.random() * width;
        p.y = Math.random() * height;
        p.life = Math.random() * 140 + 50;
      }
    }

    requestAnimationFrame(animate);
  }

  animate();
})();
