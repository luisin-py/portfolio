# Portfólio — Luís Fernandes Saucedo Souza

Site de portfólio acadêmico e profissional pronto para hospedagem imediata no **Netlify (`*.netlify.app`)**, sem necessidade de etapa de build (`HTML5 + CSS3 + JS` puro).

## Recursos
- **Simulação interativa de campo vetorial de fluidos** (HTML5 Canvas) no topo, inspirada em Navier-Stokes, PINNs e PySHRED.
- **Alternância de idioma (PT / EN)** e **Tema Escuro / Claro**.
- **Filtros de projetos** (*SciML & Hidrodinâmica*, *Deep Learning & IA*, *Dados & Finanças*, *Simuladores & Ensino*) com links verificados para o GitHub e o simulador live de Mecânica dos Fluidos.
- **Abas de publicações científicas** (*Periódicos*, *XXIX ENMC 2026* e *CNMAC / ERMAC / SBM*) com DOIs e links diretos.

## Como publicar no Netlify (2 formas)

### Opção 1 — Mais rápida (10 segundos, Drag & Drop)
1. Acesse [https://app.netlify.com/drop](https://app.netlify.com/drop).
2. Arraste a pasta `G:\Meu Drive\Currículo\Códigos\portfolio` inteira para a tela.
3. Em segundos o site estará no ar em `https://seu-nome.netlify.app` (você pode personalizar o subdomínio em *Site configuration → Change site name*).

### Opção 2 — Deploy automático via GitHub
1. Crie um repositório (ex.: `portfolio`) no GitHub e envie os arquivos desta pasta.
2. No Netlify, clique em **Add new site → Import an existing project → GitHub** e selecione o repositório.
3. O arquivo `netlify.toml` já configura `publish = "."` automaticamente — clique em **Deploy site**.
