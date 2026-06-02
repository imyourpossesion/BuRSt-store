const zonaDrop = document.getElementById('cartera-zona');

// Soporte PC
document.querySelectorAll('.draggable').forEach(charm => {
    charm.addEventListener('dragstart', (e) => e.dataTransfer.setData('text/plain', e.target.src));
});

zonaDrop.addEventListener('dragover', (e) => e.preventDefault());
zonaDrop.addEventListener('drop', (e) => {
    e.preventDefault();
    colocarCharm(e.dataTransfer.getData('text/plain'), e.clientX, e.clientY);
});

// Soporte Móvil (Touch)
document.querySelectorAll('.draggable').forEach(charm => {
    charm.addEventListener('touchstart', (e) => {
        const touch = e.touches[0];
        const nuevoCharm = colocarCharm(charm.src, touch.clientX, touch.clientY);
        
        // Hacer que el charm siga el dedo mientras se mueve
        nuevoCharm.ontouchmove = (ev) => {
            const t = ev.touches[0];
            nuevoCharm.style.left = (t.clientX - zonaDrop.getBoundingClientRect().left - 20) + 'px';
            nuevoCharm.style.top = (t.clientY - zonaDrop.getBoundingClientRect().top - 20) + 'px';
        };
    });
});

function colocarCharm(src, x, y) {
    const nuevoCharm = document.createElement('img');
    nuevoCharm.src = src;
    nuevoCharm.className = 'charm-puesto';
    const rect = zonaDrop.getBoundingClientRect();
    nuevoCharm.style.left = (x - rect.left - 20) + 'px';
    nuevoCharm.style.top = (y - rect.top - 20) + 'px';
    zonaDrop.appendChild(nuevoCharm);
    return nuevoCharm;
}

function cambiarCartera(src) { document.getElementById('cartera-fondo').src = src; }
function cambiarFondo(c) { document.body.className = 'bg-' + c; }
function limpiar() { document.querySelectorAll('.charm-puesto').forEach(c => c.remove()); }
