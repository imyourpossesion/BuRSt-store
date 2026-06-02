const zonaDrop = document.getElementById('cartera-zona');
let charmActivo = null;
let offsetX, offsetY;

// Lógica de inicio (al tocar el charm del menú, creamos el clon)
document.querySelectorAll('.draggable').forEach(charmMenu => {
    charmMenu.onmousedown = (e) => iniciarMovimiento(e, charmMenu.src);
    charmMenu.ontouchstart = (e) => {
        e.preventDefault();
        iniciarMovimiento(e.touches[0], charmMenu.src);
    };
});

function iniciarMovimiento(e, src) {
    const nuevoCharm = document.createElement('img');
    nuevoCharm.src = src;
    nuevoCharm.className = 'charm-puesto';
    nuevoCharm.style.position = 'absolute';
    nuevoCharm.style.width = '60px';
    
    // Posición inicial dentro de la zona
    const rect = zonaDrop.getBoundingClientRect();
    nuevoCharm.style.left = (e.clientX - rect.left - 30) + 'px';
    nuevoCharm.style.top = (e.clientY - rect.top - 30) + 'px';
    
    zonaDrop.appendChild(nuevoCharm);
    charmActivo = nuevoCharm;
    
    offsetX = e.clientX - nuevoCharm.getBoundingClientRect().left;
    offsetY = e.clientY - nuevoCharm.getBoundingClientRect().top;
}

// Movimiento con límites estrictos
document.onmousemove = (e) => {
    if (charmActivo) limitarMovimiento(e.clientX, e.clientY);
};

document.ontouchmove = (e) => {
    if (charmActivo) {
        e.preventDefault();
        limitarMovimiento(e.touches[0].clientX, e.touches[0].clientY);
    }
};

function limitarMovimiento(x, y) {
    const rect = zonaDrop.getBoundingClientRect();
    
    // Calcular posición relativa al contenedor
    let nuevoX = x - rect.left - offsetX;
    let nuevoY = y - rect.top - offsetY;

    // LÍMITES: Impedir que se salga del área 400x400 (o 300x300 en móvil)
    const limiteX = rect.width - 60; // 60 es el ancho del charm
    const limiteY = rect.height - 60;

    if (nuevoX < 0) nuevoX = 0;
    if (nuevoY < 0) nuevoY = 0;
    if (nuevoX > limiteX) nuevoX = limiteX;
    if (nuevoY > limiteY) nuevoY = limiteY;

    charmActivo.style.left = nuevoX + 'px';
    charmActivo.style.top = nuevoY + 'px';
}

document.onmouseup = () => charmActivo = null;
document.ontouchend = () => charmActivo = null;

// Funciones de utilidad que ya tenías
function cambiarCartera(src) { document.getElementById('cartera-fondo').src = src; }
function cambiarFondo(c) { document.body.className = 'bg-' + c; }
function limpiar() { document.querySelectorAll('.charm-puesto').forEach(c => c.remove()); }
