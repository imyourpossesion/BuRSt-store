const zonaDrop = document.getElementById('cartera-zona');

// Lógica para permitir mover charms ya puestos
let charmSeleccionado = null;

function colocarCharm(src, x, y, esNuevo) {
    let nuevoCharm;
    
    if (esNuevo) {
        nuevoCharm = document.createElement('img');
        nuevoCharm.src = src;
        nuevoCharm.className = 'charm-puesto';
        zonaDrop.appendChild(nuevoCharm);
    } else {
        nuevoCharm = src; // En este caso src es el elemento DOM mismo
    }

    const rect = zonaDrop.getBoundingClientRect();
    nuevoCharm.style.left = (x - rect.left - 30) + 'px';
    nuevoCharm.style.top = (y - rect.top - 30) + 'px';
    return nuevoCharm;
}

// PC: Drag and Drop
document.querySelectorAll('.draggable').forEach(charm => {
    charm.addEventListener('dragstart', (e) => {
        e.dataTransfer.setData('text/plain', e.target.src);
    });
});

zonaDrop.addEventListener('dragover', (e) => e.preventDefault());

zonaDrop.addEventListener('drop', (e) => {
    e.preventDefault();
    colocarCharm(e.dataTransfer.getData('text/plain'), e.clientX, e.clientY, true);
});

// Mover charms ya existentes (PC y Móvil)
zonaDrop.addEventListener('mousedown', (e) => {
    if (e.target.classList.contains('charm-puesto')) {
        charmSeleccionado = e.target;
    }
});

zonaDrop.addEventListener('mousemove', (e) => {
    if (charmSeleccionado) {
        colocarCharm(charmSeleccionado, e.clientX, e.clientY, false);
    }
});

zonaDrop.addEventListener('mouseup', () => { charmSeleccionado = null; });

// Mover charms ya existentes (Móvil)
zonaDrop.addEventListener('touchstart', (e) => {
    if (e.target.classList.contains('charm-puesto')) {
        charmSeleccionado = e.target;
    }
}, {passive: false});

zonaDrop.addEventListener('touchmove', (e) => {
    if (charmSeleccionado) {
        e.preventDefault();
        const touch = e.touches[0];
        colocarCharm(charmSeleccionado, touch.clientX, touch.clientY, false);
    }
}, {passive: false});

zonaDrop.addEventListener('touchend', () => { charmSeleccionado = null; });

// Funciones auxiliares
function cambiarCartera(src) { document.getElementById('cartera-fondo').src = src; }
function cambiarFondo(c) { document.body.className = 'bg-' + c; }
function limpiar() { document.querySelectorAll('.charm-puesto').forEach(c => c.remove()); }
