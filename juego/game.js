const zonaDrop = document.getElementById('cartera-zona');
let charmActivo = null;

// Crear charm al arrastrar desde el menú hacia la bolsa
zonaDrop.addEventListener('dragover', (e) => e.preventDefault());
zonaDrop.addEventListener('drop', (e) => {
    e.preventDefault();
    const src = e.dataTransfer.getData('text/plain');
    crearCharm(src, e.clientX, e.clientY);
});

// Crear charm al tocar desde el menú en celular
document.querySelectorAll('.draggable').forEach(c => {
    c.addEventListener('touchstart', (e) => {
        const touch = e.touches[0];
        crearCharm(c.src, touch.clientX, touch.clientY);
    }, {passive: false});
});

function crearCharm(src, x, y) {
    const nuevo = document.createElement('img');
    nuevo.src = src;
    nuevo.className = 'charm-puesto';
    
    // Posicionamiento inicial
    actualizarPosicion(nuevo, x, y);
    
    // Hacer que se pueda mover después de puesto
    nuevo.onmousedown = (e) => charmActivo = nuevo;
    nuevo.ontouchstart = (e) => charmActivo = nuevo;
    
    zonaDrop.appendChild(nuevo);
}

// Mover el charm activo
document.onmousemove = (e) => {
    if (charmActivo) actualizarPosicion(charmActivo, e.clientX, e.clientY);
};
document.ontouchmove = (e) => {
    if (charmActivo) {
        e.preventDefault();
        actualizarPosicion(charmActivo, e.touches[0].clientX, e.touches[0].clientY);
    }
};

document.onmouseup = () => charmActivo = null;
document.ontouchend = () => charmActivo = null;

function actualizarPosicion(el, x, y) {
    const rect = zonaDrop.getBoundingClientRect();
    el.style.left = (x - rect.left - 30) + 'px';
    el.style.top = (y - rect.top - 30) + 'px';
}

// Funciones básicas
function cambiarCartera(src) { document.getElementById('cartera-fondo').src = src; }
function cambiarFondo(c) { document.body.className = 'bg-' + c; }
function limpiar() { document.querySelectorAll('.charm-puesto').forEach(c => c.remove()); }
