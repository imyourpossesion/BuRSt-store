const zonaDrop = document.getElementById('cartera-zona');
let charmActivo = null;
let offsetX, offsetY;

// Hacemos que todos los elementos con clase .draggable sean movibles
document.querySelectorAll('.draggable').forEach(charm => {
    // Para mouse
    charm.onmousedown = (e) => {
        charmActivo = charm;
        charm.style.position = 'absolute';
        const rect = charm.getBoundingClientRect();
        offsetX = e.clientX - rect.left;
        offsetY = e.clientY - rect.top;
    };

    // Para táctil
    charm.ontouchstart = (e) => {
        charmActivo = charm;
        charm.style.position = 'absolute';
        const touch = e.touches[0];
        const rect = charm.getBoundingClientRect();
        offsetX = touch.clientX - rect.left;
        offsetY = touch.clientY - rect.top;
    };
});

// Movimiento global
document.onmousemove = (e) => {
    if (charmActivo) {
        charmActivo.style.left = (e.clientX - offsetX) + 'px';
        charmActivo.style.top = (e.clientY - offsetY) + 'px';
    }
};

document.ontouchmove = (e) => {
    if (charmActivo) {
        e.preventDefault();
        const touch = e.touches[0];
        charmActivo.style.left = (touch.clientX - offsetX) + 'px';
        charmActivo.style.top = (touch.clientY - offsetY) + 'px';
    }
};

document.onmouseup = () => charmActivo = null;
document.ontouchend = () => charmActivo = null;

// Funciones de utilidad
function cambiarCartera(src) { document.getElementById('cartera-fondo').src = src; }
function cambiarFondo(c) { document.body.className = 'bg-' + c; }
