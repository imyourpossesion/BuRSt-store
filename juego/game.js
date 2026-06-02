const zonaDrop = document.getElementById('cartera-zona');
let charmActivo = null;

// Lógica para crear el charm
function crearCharm(src, x, y) {
    const nuevo = document.createElement('img');
    nuevo.src = src;
    nuevo.className = 'charm-puesto';
    actualizarPosicion(nuevo, x, y);
    nuevo.onmousedown = (e) => { charmActivo = nuevo; };
    nuevo.ontouchstart = (e) => { charmActivo = nuevo; };
    zonaDrop.appendChild(nuevo);
}

// Eventos de selección desde el menú
document.querySelectorAll('.draggable').forEach(c => {
    c.onclick = (e) => crearCharm(c.src, e.clientX, e.clientY);
    c.ontouchstart = (e) => {
        const t = e.touches[0];
        crearCharm(c.src, t.clientX, t.clientY);
    };
});

// Movimiento global (para PC y Celular)
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

function cambiarCartera(src) { document.getElementById('cartera-fondo').src = src; }
function cambiarFondo(c) { document.body.className = 'bg-' + c; }
function limpiar() { document.querySelectorAll('.charm-puesto').forEach(c => c.remove()); }
