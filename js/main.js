const ruleta_img = document.getElementById('img-ruleta');
const btn_ruleta = document.getElementById('btn-ruleta');
const modal = document.getElementById('modal-tarjeta');
const titulo = document.getElementById('titulo');
const categoria = document.getElementById('categoria');
const btnReinicio = document.getElementById('btn-reinicio');
const carta = document.getElementById('carta');
const fondo = document.getElementById('fondo');
const tiempo = document.getElementById('timer');
const modalTarjeta = document.getElementById('modal-tarjeta');
let categorias = [30, 85, 130, 200, 250, 320];

// Mapa de ángulos y sus categorías correspondientes
const mapaCategorias = {
    320: ["Sustantivos comunes:", "sustantivosComunes"],
    250: ["Palabras que contengan MP", "palabrasMP"],
    130: ["Sustantivos propios:", "nombresLugares"],
    30: ["Sustantivos propios:", "nombresPersonas"],
    200: ["Palabras que contengan MB", "palabrasMB"],
    85: ["Palabras que contengan NV", "palabrasNV"]
};

function toggleBlur(toggle) {
    const elementsToBlur = document.querySelectorAll('.contenedor-ruleta');
    elementsToBlur.forEach(element => {
        if (toggle) {
            element.classList.add('blur');
            fondo.classList.add('blur');

        } else {
            element.classList.remove('blur');
            fondo.classList.remove('blur');
        }
    });
}

function startCountdown(duration) {
    let timer = duration;
    let timerElement = document.getElementById('numero');
    timerElement.innerText = '';

    let countdown = setInterval(function () {
        timerElement.textContent = timer; // Mostrar el tiempo restante

        // Reiniciar la animación
        timerElement.classList.remove('numero');
        void timerElement.offsetWidth; // Forzar el reflow para reiniciar la animación
        timerElement.classList.add('numero');

        if (timer <= 0) {
            clearInterval(countdown); // Detener el temporizador cuando llegue a 0
            modal.classList.remove('show');
            carta.src = "";
            toggleBlur(false); // Quitar el desenfoque
        } else {
            timer--; // Disminuir el contador
        }
    }, 1000); // Ejecutar cada segundo
}

function girar() {
    // Verificar si la lista de categorías está vacía
    if (categorias.length === 0) {
        console.log("El juego ha terminado. No quedan más categorías.");
        tiempo.style.display = 'none';
        titulo.innerText = "";
        const btnReinicioClonado = btnReinicio.cloneNode(true);
        modalTarjeta.appendChild(btnReinicioClonado);
        btnReinicioClonado.addEventListener('click', () => {
            window.location.reload();
        });
        setTimeout(() => {

            carta.src = `./res/img/final2.png`;
            modal.classList.add('show');

            toggleBlur(true); // Aplicar el desenfoque

        }, 500);
        return;
    }

    // Seleccionar un ángulo aleatorio de la lista
    let indiceSeleccionado = Math.floor(Math.random() * categorias.length);
    let anguloSeleccionado = categorias[indiceSeleccionado];

    // Eliminar el ángulo seleccionado de la lista
    categorias.splice(indiceSeleccionado, 1);

    // Incrementar el número de vueltas para dar muchas más
    let vueltasCompletas = 360 * (Math.floor(Math.random() * 10) + 10); // 10 a 20 vueltas aleatorias
    let rotacionFinal = vueltasCompletas + anguloSeleccionado;

    calcular(rotacionFinal, anguloSeleccionado);

    document.getElementById('audio').play();

    btn_ruleta.classList.add('hidden');
    setTimeout(() => {
        btn_ruleta.classList.remove('hidden');
    }, 7000);
}

function calcular(rotacionFinal, anguloSeleccionado) {
    ruleta_img.style.transition = "transform 5s ease-out"; // Animación suave de 5 segundos
    ruleta_img.style.transform = "rotate(" + rotacionFinal + "deg)";

    setTimeout(() => {
        // Obtener el nombre de la categoría usando el mapa
        let nombreCategoria = mapaCategorias[anguloSeleccionado];
        console.log("Categoría seleccionada: " + nombreCategoria);

        // Esperar 2 segundos antes de iniciar la cuenta regresiva
        setTimeout(() => {
            //modal.style.display = 'block';
            titulo.innerText = nombreCategoria[0];
            carta.src = `./res/img/${nombreCategoria[1]}.png`;
            modal.classList.add('show');
            toggleBlur(true); // Aplicar el desenfoque
            startCountdown(59); // Iniciar el temporizador de 60 segundos
        }, 1500);
    }, 5000);
}

btnReinicio.addEventListener('click', () => {
    window.location.reload();
});

btn_ruleta.addEventListener('click', girar);
