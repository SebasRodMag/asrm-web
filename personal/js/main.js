document.addEventListener('DOMContentLoaded', () => {
    // ===== Idioma actual =====
    const DEFAULT_LANG = 'es';
    const langSelects = document.querySelectorAll('#langSelect, #langSelectMobile');
    const savedLang = localStorage.getItem('lang');
    let currentLang = savedLang || ((navigator.language || 'es').toLowerCase().startsWith('es') ? 'es' : 'en');

    // Inicializa ambos selects
    langSelects.forEach(s => { if (s) s.value = currentLang; });
    document.documentElement.lang = currentLang;

    const I18N = {
        es: {
            'nav.experience': 'Experiencia',
            'nav.projects': 'Proyectos',
            'nav.contact': 'Contacto',
            'nav.view': 'Ver proyectos',
            'hero.cta.copy': 'Copiar email',
            'hero.cta.developer': 'Desarrollador Full-Stack · Laravel · Angular · Docker',
            'section.projects': 'Proyectos',
            'section.projects.lead': 'Vista rápida de la selección de proyectos, pueden verse más en profundidad.',
            'section.contact': 'Contacto',
            'section.experience': 'Experiencia',
            'section.experience.lead': 'Un resumen de roles y responsabilidades destacadas.',
            'actions.theme': 'Tema',
            'actions.quick': 'Vista rápida',
            'actions.detail': 'Ver detalle',
            'badge.available': 'Disponible',
            'filter.all': 'Todos', 'filter.laravel': 'Laravel', 'filter.angular': 'Angular', 'filter.docker': 'Docker',
            'modal.quick.gc': 'Gestión Clinica MV',
            'modal.quick.cm': 'Centro Médico',
            'actions.bg.on': 'Fondo: ON',
            'actions.bg.off': 'Fondo: OFF',
            'actions.menu': 'Menú',


            // Cards (descripciones breves)
            'card.mv.title': 'Gestión Clinica MV',
            'card.cm.title': 'Centro Médico',
            'card.mv.desc': 'Gestión de citas clínicas, videollamada Jitsi, control por roles y auditoría.',
            'card.cal.title': 'Calendario Interactivo',
            'card.cal.desc': 'FullCalendar + Angular, modales accesibles y filtros.',
            'card.tr.title': 'Stack Traefik',
            'card.vj.title': 'Videollamadas con Jitsi',
            'card.op.title': 'Documentación mediante Open-API Swagger',
            'card.tr.desc': 'Reverse proxy, TLS automático y CI/CD con GitHub Actions.',
            'card.text.gc': 'Plataforma para la gestión de citas clínicas, optimizando la atención y el seguimiento entre especialistas y pacientes. La solución combina una API REST (Laravel) con una SPA (Angular) integrando Jitsi Meet para la realización de conferencias.',
            'card.text.cm': 'Es una aplicación web, que consta de un backend (API Rest) con Laravel y el front (SPA) en Angular gestionado desde contenedores Docker con base de datos en MySQL. La aplicación consiste en un sistema de gestión de citas médicas para un centro que realiza reconocimientos médicos para empresas.',
            'card.item.gc.1': 'API REST con autenticación y roles.',
            'card.item.gc.2': 'Calendario y modales accesibles.',
            'card.item.gc.3': 'Despliegue Docker y proxy inverso.',
            'card.item.cm.1': 'API REST con autenticación y roles.',
            'card.item.cm.2': 'SPA Angular con gestión de citas.',
            'card.item.cm.3': 'Gestión de roles por Spatie y Autentificación por token mediante Laravel Sanctum',
            'card.item.cm.4': 'Despliegue Docker.',
            'card.item.tr.1': 'TLS automático, routing por host/path.',
            'card.item.tr.2': 'Build/push de imágenes en GitHub.',
            'card.item.ci.1': 'Filtros por estado y acciones rápidas.',
            'card.item.ci.2': 'Focus trap y accesibilidad real.',
            'card.item.vj.1': 'Salas seguras con token.',
            'card.item.vj.2': 'Join en un clic desde la cita.',
            'card.vj.subtitle': 'Integración embebida',
            'card.op.subtitle': 'Documentación de la API',
            'card.item.op.1': 'Documentación del código',
            'card.item.op.2': 'Presentación de la documentación',
            'card.item.op.3': 'Test de end-points desde la misma presentación',
        },
        en: {
            'nav.experience': 'Experience',
            'nav.projects': 'Projects',
            'nav.contact': 'Contact',
            'nav.view': 'See projects',
            'hero.cta.copy': 'Copy email',
            'hero.cta.developer': 'Full-Stack Developer · Laravel · Angular · Docker',
            'section.projects': 'Projects',
            'section.projects.lead': 'Quick view of selected projects, more details available.',
            'section.contact': 'Contact',
            'section.experience': 'Experience',
            'section.experience.lead': 'A summary of key roles and responsibilities.',
            'actions.theme': 'Theme',
            'actions.quick': 'Quick view',
            'actions.detail': 'View details',
            'badge.available': 'Available',
            'filter.all': 'All', 'filter.laravel': 'Laravel', 'filter.angular': 'Angular', 'filter.docker': 'Docker',
            'modal.quick.gc': 'Clinic Management MV',
            'modal.quick.cm': 'Medical Center',
            'actions.bg.on': 'Background: ON',
            'actions.bg.off': 'Background: OFF',
            'actions.menu': 'Menu',

            // Cards
            'card.mv.title': 'MV Clinic Management',
            'card.cm.title': 'Medical Center',
            'card.mv.desc': 'Appointments, Jitsi videocalls, role-based access and auditing.',
            'card.cal.title': 'Interactive Calendar',
            'card.cal.desc': 'FullCalendar + Angular, accessible modals and filters.',
            'card.tr.title': 'Traefik Stack',
            'card.vj.title': 'Jitsi Videocalls',
            'card.op.title': 'Open-API Swagger Documentation',
            'card.tr.desc': 'Reverse proxy, automatic TLS and CI/CD with GitHub Actions.',
            'card.text.gc': 'Platform for managing clinical appointments, optimizing care and follow-up between specialists and patients. The solution combines a REST API (Laravel) with a SPA (Angular) integrating Jitsi Meet for conferencing.',
            'card.text.cm': 'It is a web application, which consists of a backend (API Rest) with Laravel and the front (SPA) in Angular managed from Docker containers with a MySQL database. The application consists of a medical appointment management system for a center that performs medical examinations for companies.',
            'card.item.gc.1': 'REST API with authentication and roles.',
            'card.item.gc.2': 'Accessible calendar and modals.',
            'card.item.gc.3': 'Docker deployment and reverse proxy.',
            'card.item.cm.1': 'REST API with authentication and roles.',
            'card.item.cm.2': 'Angular SPA with appointment management.',
            'card.item.cm.3': 'Role management by Spatie and Token Authentication using Laravel Sanctum',
            'card.item.cm.4': 'Docker deployment.',
            'card.item.tr.1': 'Automatic TLS, routing by host/path.',
            'card.item.tr.2': 'Image build/push on GitHub.',
            'card.item.ci.1': 'Filters by status and quick actions.',
            'card.item.ci.2': 'Focus trap and real accessibility.',
            'card.item.vj.1': 'Secure rooms with token.',
            'card.item.vj.2': 'One-click join from the appointment.',
            'card.vj.subtitle': 'Embedded integration',
            'card.op.subtitle': 'API documentation',
            'card.item.op.1': 'Code documentation',
            'card.item.op.2': 'Documentation presentation',
            'card.item.op.3': 'End-point testing from the same presentation',
        }
    };

    //Precedencia del .md
    function toFinalMdUrl(baseOrFull, lang) {
        if (/\.md$/i.test(baseOrFull)) return baseOrFull.replace(/^\/+/, '');
        return `${baseOrFull}.${lang}.md`.replace(/^\/+/, '');
    }

    // Aplicar textos UI
    function applyI18n(lang) {
        console.log('Applying i18n for lang:', lang);
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            const txt = I18N[lang]?.[key] ?? I18N[DEFAULT_LANG]?.[key];
            console.log('Key:', key, 'Text:', txt);
            if (txt) el.textContent = txt;
        });
        document.documentElement.lang = lang;
    }

    function setLang(lang) {
        currentLang = lang;
        localStorage.setItem('lang', lang);
        langSelects.forEach(s => { if (s) s.value = lang; });
        applyI18n(lang);
        syncBgButtonLabel(); // por si el botón “Fondo” cambia ES/EN
    }

    applyI18n(currentLang);

    // escucha cambios en cualquiera de los dos selects
    langSelects.forEach(s => s?.addEventListener('change', (e) => setLang(e.target.value)));

    // ========== Tema persistente ==========
    const root = document.documentElement;
    const themeButtons = document.querySelectorAll('#themeToggle, #themeToggle1'); // <-- ambos
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) root.setAttribute('data-theme', savedTheme);

    function toggleTheme() {
        const now = root.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
        root.setAttribute('data-theme', now);
        localStorage.setItem('theme', now);
    }
    themeButtons.forEach(btn => btn?.addEventListener('click', toggleTheme));

    // Copiar email (no fallar si no existe)
    const btnCopy = document.getElementById('copyEmail');
    if (btnCopy) {
        btnCopy.addEventListener('click', async () => {
            try {
                await navigator.clipboard.writeText('sebastian@asrm.dev');
                const prev = btnCopy.textContent;
                btnCopy.textContent = 'Copiado ✔';
                setTimeout(() => (btnCopy.textContent = prev), 1500);
            } catch (e) {
                console.warn('Clipboard no disponible:', e);
            }
        });
    }

    // ========== Modal + Markdown ==========
    const modal = document.getElementById('modal');
    const box = modal?.querySelector('.modal-box');
    const content = document.getElementById('modalContent');

    if (!modal || !box || !content) {
        console.warn('[Modal] Falta #modal/.modal-box/#modalContent en el DOM.');
        return; // sin modal, salimos limpamente
    }

    const parseMd = (md) => {
        const m = window.marked;
        if (!m) throw new Error('Marked no cargado');
        return (typeof m.parse === 'function') ? m.parse(md) : m(md);
    };
    const purify = (html) => {
        const dp = window.DOMPurify;
        if (!dp) throw new Error('DOMPurify no cargado');
        return dp.sanitize(html, { USE_PROFILES: { html: true } });
    };

    let lastFocus = null;
    const getTabbables = () => {
        const sel = 'a[href],button:not([disabled]),select,textarea,input,[tabindex]:not([tabindex="-1"])';
        return Array.from(box.querySelectorAll(sel)).filter(el => el.offsetParent !== null);
    };

    async function fetchWithFallback(baseOrFull) {
        const tryOnce = async (u) => {
            const res = await fetch(u, { cache: 'no-store' });
            if (!res.ok) throw new Error(`HTTP ${res.status} al cargar ${u}`);
            return res.text();
        };

        const first = toFinalMdUrl(baseOrFull, currentLang);
        try {
            return await tryOnce(first);
        } catch (err) {
            const fallback = toFinalMdUrl(baseOrFull, 'es');
            if (fallback === first) throw err;   // ya intentamos ES
            return await tryOnce(fallback);
        }
    }

    async function openFromMarkdown(baseOrFull) {
        try {
            lastFocus = document.activeElement;
            modal.hidden = false;
            document.body.classList.add('lock-scroll');
            content.innerHTML = '<p class="muted">Cargando…</p>';

            const md = await fetchWithFallback(baseOrFull);
            const raw = parseMd(md);
            const safe = purify(raw);
            content.innerHTML = safe;

            const tabb = getTabbables();
            (tabb[0] || box).focus();
        } catch (err) {
            console.error('[MD] Error:', err);
            content.innerHTML = `<p class="muted">Error cargando el contenido. ${String(err.message || err)}</p>`;
        }
    }



    function close() {
        modal.hidden = true;
        document.body.classList.remove('lock-scroll');
        content.innerHTML = '';
        lastFocus?.focus();
    }

    document.getElementById('mnav')?.addEventListener('click', (e) => {
        if (e.target.closest('.menu a')) e.currentTarget.open = false;
    });

    // Delegación: abrir por data-modal-md
    document.addEventListener('click', (e) => {
        const opener = e.target.closest('[data-modal-md]');
        if (opener) {
            e.preventDefault();
            const url = opener.getAttribute('data-modal-md');
            if (url) openFromMarkdown(url);
            return;
        }
        if (e.target.closest('[data-close-modal]')) {
            e.preventDefault();
            close();
        }
    });

    // Fondo y teclado
    modal.addEventListener('click', e => { if (e.target === modal) close(); });
    document.addEventListener('keydown', (e) => {
        if (modal.hidden) return;
        if (e.key === 'Escape') { e.preventDefault(); close(); }
        else if (e.key === 'Tab') {
            const tabb = getTabbables();
            if (tabb.length === 0) { e.preventDefault(); box.focus(); return; }
            const first = tabb[0], last = tabb[tabb.length - 1];
            const back = e.shiftKey;
            if (back && document.activeElement === first) { e.preventDefault(); last.focus(); }
            else if (!back && document.activeElement === last) { e.preventDefault(); first.focus(); }
        }
    });

    // Año en footer (si existe)
    const yr = document.getElementById('yr');
    if (yr) yr.textContent = new Date().getFullYear();

    // Filtro de proyectos
    const buttons = document.querySelectorAll('[data-filter]');
    const cards = document.querySelectorAll('.project-card');
    buttons.forEach(b => b.addEventListener('click', () => {
        const tag = b.getAttribute('data-filter');
        buttons.forEach(x => x.classList.remove('active')); b.classList.add('active');
        cards.forEach(c => {
            const tags = c.getAttribute('data-tags').split(',');
            c.style.display = (tag === 'all' || tags.includes(tag)) ? '' : 'none';
        });
    }));

    // ===== Fondo “reflejo” con parallax =====
    (() => {
        const ghost = document.getElementById('bg-ghost');
        const source = document.querySelector('.wrap');
        if (!ghost || !source) return;

        // Clonamos el contenido principal
        const clone = source.cloneNode(true);

        // Higiene: evita conflictos de IDs/JS en el clon
        clone.querySelectorAll('[id]').forEach(el => el.removeAttribute('id'));
        // Desactiva enlaces/inputs dentro del clon
        clone.querySelectorAll('a, button, input, select, textarea').forEach(el => {
            el.setAttribute('tabindex', '-1');
            el.removeAttribute('href');
            el.disabled = true;
        });

        // Opcional: elimina el modal del clon si lo tuviera
        clone.querySelectorAll('#modal').forEach(el => el.remove());

        ghost.appendChild(clone);

        // Parallax suave (≈30–50% de la velocidad del scroll)
        const factor = 0.45; // ajusta a gusto (0.2 = más lejano, 0.5 = más cercano)
        let ticking = false, lastY = 0;

        const update = () => {
            document.documentElement.style.setProperty('--bg-parallax', `${-lastY * factor}px`);
            ticking = false;
        };

        const onScroll = () => {
            lastY = window.scrollY || window.pageYOffset;
            if (!ticking) {
                requestAnimationFrame(update);
                ticking = true;
            }
        };

        // Inicializa posición
        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
    })();

    // ===== Toggle fondo “reflejo” ON/OFF =====

    // Estado inicial del efecto de fondo
    const BG_KEY = 'bgghost';
    const bgButtons = document.querySelectorAll('#bgToggle, #bgToggle1'); // <-- ambos
    const savedBg = localStorage.getItem(BG_KEY); // 'on' | 'off' | null
    document.documentElement.setAttribute('data-bgghost', savedBg === 'off' ? 'off' : 'on');

    function syncBgButtonLabel() {
        const isOn = document.documentElement.getAttribute('data-bgghost') !== 'off';
        bgButtons.forEach(btn => {
            if (!btn) return;
            btn.setAttribute('aria-pressed', String(isOn));
            const span = btn.querySelector('[data-i18n]');
            if (span) {
                const key = isOn ? 'actions.bg.on' : 'actions.bg.off';
                span.setAttribute('data-i18n', key);
                // actualiza texto según idioma actual
                span.textContent = I18N[currentLang]?.[key] ?? (isOn ? 'Fondo: ON' : 'Fondo: OFF');
            } else {
                btn.textContent = isOn ? 'Fondo: ON' : 'Fondo: OFF';
            }
        });
    }

    function toggleBg() {
        const isOn = document.documentElement.getAttribute('data-bgghost') !== 'off';
        const next = isOn ? 'off' : 'on';
        document.documentElement.setAttribute('data-bgghost', next);
        localStorage.setItem(BG_KEY, next);
        syncBgButtonLabel();
    }

    bgButtons.forEach(btn => btn?.addEventListener('click', toggleBg));
    syncBgButtonLabel();


    // ===== Cerrar el menú al hacer click en un enlace (UX) =====
    document.getElementById('mnav')?.addEventListener('click', (e) => {
        if (e.target.closest('.menu a')) e.currentTarget.open = false;
    });
    const mnav = document.getElementById('mnav');
    function closeMenuIfInside(target) {
        if (!mnav?.open) return;
        if (target.closest('#mnav .menu')) mnav.open = false;
    }
    themeButtons.forEach(b => b?.addEventListener('click', e => closeMenuIfInside(e.target)));
    bgButtons.forEach(b => b?.addEventListener('click', e => closeMenuIfInside(e.target)));
    langSelects.forEach(s => s?.addEventListener('change', e => closeMenuIfInside(e.target)));

});
