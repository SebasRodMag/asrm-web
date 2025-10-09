document.addEventListener('DOMContentLoaded', () => {
    // Referencias a los elementos principales del DOM
    const mainPresentationContent = document.getElementById('main-presentation-content');
    const rotateDeviceMessage = document.querySelector('.rotate-device-message');

    // --- 1. Lógica de Detección de Orientación (Responsive) ---
    // Esta función verifica la orientación del dispositivo y el ancho de la ventana.
    // Si es un dispositivo pequeño en modo retrato, muestra el mensaje de rotación
    // y oculta el contenido principal de la presentación.
    const checkOrientation = () => {
        // matchMedia es un método robusto para detectar las características del viewport.
        // window.innerWidth < 900 se usa para apuntar a teléfonos y tabletas pequeñas,
        // excluyendo monitores grandes en orientación vertical.
        if (window.matchMedia("(orientation: portrait)").matches && window.innerWidth < 900) {
            if (mainPresentationContent) mainPresentationContent.style.display = 'none';
            if (rotateDeviceMessage) rotateDeviceMessage.style.display = 'flex'; // Usamos flex para centrar el mensaje
        } else {
            // Si no está en modo retrato o es una pantalla grande, muestra el contenido
            if (mainPresentationContent) mainPresentationContent.style.display = 'block'; // O el display original (flex/grid) que uses para tu contenedor
            if (rotateDeviceMessage) rotateDeviceMessage.style.display = 'none';
        }
    };

    // Ejecutar la verificación de orientación al cargar la página.
    checkOrientation();
    // Añadir listeners para re-evaluar la orientación cuando el dispositivo cambie o se redimensione la ventana.
    window.addEventListener('orientationchange', checkOrientation);
    window.addEventListener('resize', checkOrientation);

    // --- 2. Carga Dinámica de Contenido en cada Bloque ---
    // Esta función asíncrona carga el contenido HTML de un archivo dado
    // y lo inserta en el elemento de bloque correspondiente.
    const loadContentIntoBlock = async (blockId, filePath) => {
        const blockElement = document.getElementById(blockId);
        if (!blockElement) {
            console.warn(`Elemento con ID '${blockId}' no encontrado. No se pudo cargar el contenido de ${filePath}.`);
            return;
        }

        try {
            const response = await fetch(filePath);
            // Si la respuesta HTTP no es exitosa (ej. 404 Not Modified, 200 OK), lanza un error.
            // NOTA: Un 304 Not Modified es una respuesta OK, se maneja como `response.ok`.
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status} for ${filePath}`);
            }
            const htmlContent = await response.text();
            blockElement.innerHTML = htmlContent; // Inserta el HTML en el bloque
            console.log(`Contenido de '${filePath}' cargado en '${blockId}'.`);

        } catch (error) {
            console.error(`Error al cargar el contenido de ${filePath} en ${blockId}:`, error);
            // Muestra un mensaje de error visible para el usuario en el bloque afectado.
            blockElement.innerHTML = `<p style="color: red; padding: 20px;">Error al cargar el contenido de esta sección. Por favor, verifica la ruta: <code>${filePath}</code></p>`;
        }
    };

    // --- 3. Carga Principal de Bloques Dinámicos (basado en config.json) ---
    // Esta función es la que inicia el proceso: lee config.json, crea los bloques
    // y luego configura las animaciones.
    const loadDynamicBlocks = async () => {
        if (!mainPresentationContent) {
            console.error('Contenedor #main-presentation-content no encontrado en el DOM.');
            return;
        }

        try {
            // Realiza una petición para obtener el archivo de configuración.
            const response = await fetch('config.json'); // Asegúrate que la ruta a config.json sea correcta
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status} for config.json`);
            }
            const blocksConfig = await response.json(); // Parsea la respuesta JSON

            // Limpia el contenido actual del contenedor principal, si lo hubiera.
            mainPresentationContent.innerHTML = '';

            // Crea un array de Promesas, donde cada promesa representa la carga de contenido de un bloque.
            const loadContentPromises = blocksConfig.map(block => {
                const section = document.createElement('section');
                section.id = block.id;
                section.classList.add('full-screen-block');
                mainPresentationContent.appendChild(section);

                // loadContentIntoBlock es una función async y devuelve una Promesa.
                // Guardamos esa Promesa en el array.
                return loadContentIntoBlock(block.id, block.htmlFile);
            });

            // Espera a que TODAS las promesas de carga de contenido se resuelvan.
            // Esto asegura que todos los elementos HTML (incluyendo las imágenes) estén en el DOM
            // antes de intentar animarlos con GSAP.
            await Promise.all(loadContentPromises);

            console.log(`Todos los ${blocksConfig.length} bloques dinámicos creados y su contenido cargado.`);

            // --- 4. Inicializar Animaciones de Scroll con GSAP ---
            // Una vez que todos los bloques están en el DOM y su contenido cargado,
            // podemos registrar el plugin ScrollTrigger e inicializar las animaciones.
            gsap.registerPlugin(ScrollTrigger); // Asegúrate de que GSAP y ScrollTrigger estén cargados en index.html
            initializeGSAPAnimations();

        } catch (error) {
            console.error('Error crítico al cargar la configuración de bloques:', error);
            // Muestra un mensaje de error central si la carga de config.json falla.
            mainPresentationContent.innerHTML = '<p style="color: red; padding: 50px; text-align: center;">No se pudo cargar la presentación. Verifica el archivo <code>config.json</code> y la conexión del servidor (Live Server).</p>';
        }
    };

    // --- 5. Lógica de Animación al Hacer Scroll (GSAP con ScrollTrigger) ---
    const initializeGSAPAnimations = () => {
        const fullScreenBlocks = document.querySelectorAll('.full-screen-block');

        fullScreenBlocks.forEach((block, index) => {
            const img = block.querySelector('.image-container img');

            if (!img) {
                console.warn(`Bloque ${block.id} no contiene una imagen para animar.`);
                return;
            }

            // Determine the starting X percentage for GSAP based on the block's position.
            // Remember: GSAP's fromTo animates from a "from" state TO a "to" state.
            // We want it to animate from OFF-SCREEN to its FINAL position (which is xPercent: 0).

            let initialXPercentGSAP;
            // index % 2 === 0  significa que es el primer bloque (index 0), el tercero (index 2), etc.
            // Estos son los bloques IMPARES visualmente (block-1, block-3...) por nth-child(odd).
            // En estos bloques, la imagen está a la DERECHA. Para que venga de FUERA por la DERECHA:
            if (index % 2 === 0) { // block-1, block-3 (CSS: nth-child(odd) -> imagen a la DERECHA)
                initialXPercentGSAP = 100; // La imagen empieza 100% de su ancho a la derecha.
            }
            // index % 2 !== 0 significa que es el segundo bloque (index 1), el cuarto (index 3), etc.
            // Estos son los bloques PARES visualmente (block-2, block-4...) por nth-child(even).
            // En estos bloques, la imagen está a la IZQUIERDA. Para que venga de FUERA por la IZQUIERDA:
            else { // block-2, block-4 (CSS: nth-child(even) -> imagen a la IZQUIERDA)
                initialXPercentGSAP = -100; // La imagen empieza 100% de su ancho a la izquierda.
            }


            gsap.fromTo(img,
                { opacity: 0, xPercent: initialXPercentGSAP }, // Estado inicial de la imagen
                {
                    opacity: 1,
                    xPercent: 0, // Estado final: en su posición natural (Flexbox la posicionará)
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: block,
                        start: "top bottom",
                        end: "center center",
                        scrub: true,
                        // markers: true // ¡Descomenta para depurar!
                    }
                }
            );

            // Opcional: Animación del contenido de texto (si lo necesitas)
            const textContent = block.querySelector('.block-wrapper .text-content');
            if (textContent) {
                let initialTextXValue;
                 // Si el bloque es IMPAR (index 0, 2, ...), el texto está a la IZQUIERDA.
                 // Para que venga de FUERA por la IZQUIERDA, le damos un valor negativo.
                 if (index % 2 === 0) { // block-1, block-3 (Texto a la IZQUIERDA)
                     initialTextXValue = -50; // Ejemplo: 50px a la izquierda
                }
                 // Si el bloque es PAR (index 1, 3, ...), el texto está a la DERECHA.
                 // Para que venga de FUERA por la DERECHA, le damos un valor positivo.
                 else { // block-2, block-4 (Texto a la DERECHA)
                     initialTextXValue = 50; // Ejemplo: 50px a la derecha
                }

                gsap.fromTo(textContent,
                    { opacity: 0, x: initialTextXValue }, // Empieza ligeramente desplazado y oculto
                    {
                        opacity: 1,
                        x: 0, // Termina en su posición natural
                        ease: "power2.out",
                        scrollTrigger: {
                            trigger: block,
                            start: "top bottom",
                            end: "center center",
                            scrub: true,
                            // markers: true
                        }
                    }
                );
            }
        });
    };

    // --- Llamada inicial para cargar los bloques cuando el DOM esté completamente listo ---
    loadDynamicBlocks();

    
});