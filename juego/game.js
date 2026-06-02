const zonaDrop = document.getElementById('cartera-zona');
let charmActivo = null;
let offsetX, offsetY;

// Ahora detectamos el toque en los elementos del menú
document.querySelectorAll('.draggable').forEach(charmMenu => {
    charmMenu.onmousedown = (e) => iniciarMovimiento(e, charmMenu.src);
    charmMenu.ontouchstart = (e) => {
        e.preventDefault();
        iniciarMovimiento(e.touches[0], charmMenu.src);
    };
});

function iniciarMovimiento(e, src) {
    // Creamos una copia del charm original
    const nuevoCharm = document.createElement('img');
    nuevoCharm.src = src;
    nuevoCharm.className = 'charm-puesto';
    nuevoCharm.style.position = 'absolute';
    nuevoCharm.style.width = '60px'; // Ajusta el tamaño que quieras
    
    // Posicionamos el clon donde tocastes
    const rect = zonaDrop.getBoundingClientRect();
    nuevoCharm.style.left = (e.clientX - rect.left - 30) + 'px';
    nuevoCharm.style.top = (e.clientY - rect.top - 30) + 'px';
    
    zonaDrop.appendChild(nuevoCharm);
    charmActivo = nuevoCharm;
    
    // Calculamos el desfase para el arrastre
    offsetX = e.clientX - nuevoCharm.getBoundingClientRect().left;
    offsetY = e.clientY - nuevoCharm.getBoundingClientRect().top;
}

// Movimiento global (igual que antes)
document.onmousemove = (e) => {
    if (charmActivo) moverElemento(e.clientX, e.clientY);
};

document.ontouchmove = (e) => {
    if (charmActivo) {
        e.preventDefault();
        moverElemento(e.touches[0].clientX, e.touches[0].clientY);
    }
};

function moverElemento(x, y) {
    const rect = zonaDrop.getBoundingClientRect();
    charmActivo.style.left = (x - rect.left - offsetX) + 'px';
    charmActivo.style.top = (y - rect.top - offsetY) + 'px';
}

document.onmouseup = () => charmActivo = null;
document.ontouchend = () => charmActivo = null;

// Funciones de utilidad
function cambiarCartera(src) { document.getElementById('cartera-fondo').src = src; }
function cambiarFondo(c) { document.body.className = 'bg-' + c; }
function limpiar() { 
    // Solo elimina los que tienen la clase 'charm-puesto'
    document.querySelectorAll('.charm-puesto').forEach(c => c.remove()); 
}
