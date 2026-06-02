const zonaDrop = document.getElementById('cartera-zona');
let charmActivo = null;

// Crear charm al hacer clic/tocar desde el menú
document.querySelectorAll('.draggable').forEach(c => {
    c.onclick = () => crearCharm(c.src);
    c.ontouchstart = (e) => {
        e.preventDefault();
        crearCharm(c.src);
    };
});

function crearCharm(src) {
    const nuevo = document.createElement('img');
    nuevo.src = src;
    nuevo.className = 'charm-puesto';
    // Posición inicial en el centro
    nuevo.style.left = "150px";
    nuevo.style.top = "150px";
    
    nuevo.onmousedown = (e) => charmActivo = nuevo;
    nuevo.ontouchstart = (e) => charmActivo = nuevo;
    
    zonaDrop.appendChild(nuevo);
}

// Movimiento global
document.onmousemove = (e) => {
    if (charmActivo) moverElemento(charmActivo, e.clientX, e.clientY);
};
document.ontouchmove = (e) => {
    if (charmActivo) {
        e.preventDefault();
        moverElemento(charmActivo, e.touches[0].clientX, e.touches[0].clientY);
    }
};

document.onmouseup = () => charmActivo = null;
document.ontouchend = () => charmActivo = null;

function moverElemento(el, x, y) {
    const rect = zonaDrop.getBoundingClientRect();
    el.style.left = (x - rect.left - 30) + 'px';
    el.style.top = (y - rect.top - 30) + 'px';
}

function cambiarCartera(src) { document.getElementById('cartera-fondo').src = src; }
function cambiarFondo(c) { document.body.className = 'bg-' + c; }
function limpiar() { document.querySelectorAll('.charm-puesto').forEach(c => c.remove()); }
function cambiarCartera(src) { document.getElementById('cartera-fondo').src = src; }
function cambiarFondo(c) { document.body.className = 'bg-' + c; }
function limpiar() { document.querySelectorAll('.charm-puesto').forEach(c => c.remove()); }
