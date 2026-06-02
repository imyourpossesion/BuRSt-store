const zonaDrop = document.getElementById('cartera-zona');

document.querySelectorAll('.draggable').forEach(charm => {
    charm.addEventListener('dragstart', (e) => {
        e.dataTransfer.setData('text/plain', e.target.src);
    });
});

zonaDrop.addEventListener('dragover', (e) => e.preventDefault());

zonaDrop.addEventListener('drop', (e) => {
    e.preventDefault();
    const src = e.dataTransfer.getData('text/plain');
    const nuevoCharm = document.createElement('img');
    nuevoCharm.src = src;
    nuevoCharm.className = 'charm-puesto';
    
    const rect = zonaDrop.getBoundingClientRect();
    nuevoCharm.style.left = (e.clientX - rect.left - 20) + 'px';
    nuevoCharm.style.top = (e.clientY - rect.top - 20) + 'px';
    
    zonaDrop.appendChild(nuevoCharm);
});

function cambiarCartera(src) { document.getElementById('cartera-fondo').src = src; }
function cambiarFondo(c) { document.body.className = 'bg-' + c; }
function limpiar() { document.querySelectorAll('.charm-puesto').forEach(c => c.remove()); }
