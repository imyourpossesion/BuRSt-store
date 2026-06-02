// js/game.js

const zonaDrop = document.getElementById('cartera-zona');

// Permitir arrastrar
document.querySelectorAll('.draggable').forEach(charm => {
    charm.addEventListener('dragstart', (e) => {
        e.dataTransfer.setData('text/plain', e.target.src);
    });
});

// Permitir soltar
zonaDrop.addEventListener('dragover', (e) => e.preventDefault());

zonaDrop.addEventListener('drop', (e) => {
    e.preventDefault();
    const src = e.dataTransfer.getData('text/plain');
    
    const nuevoCharm = document.createElement('img');
    nuevoCharm.src = src;
    nuevoCharm.className = 'charm-puesto';
    // Posicionamiento donde soltaste el mouse
    nuevoCharm.style.position = 'absolute';
    nuevoCharm.style.left = (e.clientX - 100) + 'px'; 
    nuevoCharm.style.top = (e.clientY - 100) + 'px';
    
    zonaDrop.appendChild(nuevoCharm);
});

function limpiar() {
    const charmsPuestos = document.querySelectorAll('.charm-puesto');
    charmsPuestos.forEach(c => c.remove());
}