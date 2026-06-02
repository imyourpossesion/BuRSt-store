const zonaDrop = document.getElementById('cartera-zona');

// Crear un charm al soltarlo en la zona
zonaDrop.addEventListener('dragover', (e) => e.preventDefault());

zonaDrop.addEventListener('drop', (e) => {
    e.preventDefault();
    const src = e.dataTransfer.getData('text/plain');
    crearCharm(src, e.clientX, e.clientY);
});

// Función para crear el elemento en la zona
function crearCharm(src, x, y) {
    const nuevoCharm = document.createElement('img');
    nuevoCharm.src = src;
    nuevoCharm.className = 'charm-puesto';
    
    // Posicionamiento
    const rect = zonaDrop.getBoundingClientRect();
    nuevoCharm.style.left = (x - rect.left - 30) + 'px';
    nuevoCharm.style.top = (y - rect.top - 30) + 'px';
    
    // Hacerlo arrastrable (mover una vez puesto)
    nuevoCharm.onmousedown = iniciarArrastre;
    nuevoCharm.ontouchstart = iniciarArrastre;
    
    zonaDrop.appendChild(nuevoCharm);
}

// Lógica de movimiento (mover ya puesto)
let seleccionado = null;
function iniciarArrastre(e) {
    seleccionado = e.target;
}

document.onmousemove = (e) => {
    if (seleccionado) {
        const rect = zonaDrop.getBoundingClientRect();
        seleccionado.style.left = (e.clientX - rect.left - 30) + 'px';
        seleccionado.style.top = (e.clientY - rect.top - 30) + 'px';
    }
};

document.onmouseup = () => { seleccionado = null; };

// Asegurar que los originales tengan el dragstart
document.querySelectorAll('.draggable').forEach(c => {
    c.ondragstart = (e) => e.dataTransfer.setData('text/plain', e.target.src);
});

function cambiarCartera(src) { document.getElementById('cartera-fondo').src = src; }
function cambiarFondo(c) { document.body.className = 'bg-' + c; }
function limpiar() { document.querySelectorAll('.charm-puesto').forEach(c => c.remove()); }
