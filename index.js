//Reproductor

const tituloCancion = document.querySelector('.reproductor h2');
const nombreArtista = document.querySelector('.reproductor p');
const progreso = document.getElementById('progreso');
const cancion = document.getElementById('cancion');

const atras = document.querySelector('.controls button.atras');
const iconoPlay = document.getElementById('icono-play');
const playPause = document.querySelector('.controls button.play');
const adelante = document.querySelector('.controls button.adelante');

const canciones = [
  {
    titulo: 'Ella Usó Mi Cabeza Como Un Revólver',
    artista: 'Soda Stereo',
    fuente: './canciones/Ella Usó Mi Cabeza Como Un Revólver.mp3'
  },
  {
    titulo: 'De Música Ligera',
    artista: 'Soda Stereo',
    fuente: './canciones/De Música Ligera.mp3'
  },
  {
    titulo: 'Cuando Pase el Temblor',
    artista: 'Soda Stereo',
    fuente: './canciones/Cuando Pase el Temblor.mp3'
  },
  {
    titulo: 'En La Ciudad De La Furia',
    artista: 'Soda Stereo',
    fuente: './canciones/En la Ciudad de la Furia.mp3'
  },
  {
    titulo: 'Trátame Suavemente',
    artista: 'Soda Stereo',
    fuente: './canciones/Trátame Suavemente.mp3'
  }
];

let indiceCancionActual = 0;


function actualizarNombreCancion() {
  tituloCancion.textContent = canciones[indiceCancionActual].titulo;
  nombreArtista.textContent = canciones[indiceCancionActual].artista;
  cancion.src = canciones[indiceCancionActual].fuente;
}

cancion.addEventListener('loadedmetadata', function () {
  progreso.max = cancion.duration;
  progreso.value = cancion.currentTime;
});

playPause.addEventListener('click', reproducirPausar);

function reproducirPausar() {
  if (cancion.paused) {
    reproducirCancion();
  } else {
    pausarCancion();
  }
}

function reproducirCancion() {
  cancion.play();
  iconoPlay.classList.add('bi-pause-fill');
  iconoPlay.classList.remove('bi-play-fill');
}

function pausarCancion() {
  cancion.pause();
  iconoPlay.classList.remove('bi-pause-fill');
  iconoPlay.classList.add('bi-play-fill');
}


adelante.addEventListener('click', () => {
  indiceCancionActual = (indiceCancionActual + 1) % canciones.length;
  actualizarNombreCancion();
  reproducirCancion();
});

atras.addEventListener('click', () => {
  indiceCancionActual = (indiceCancionActual - 1 + canciones.length) % canciones.length;
  actualizarNombreCancion();
  reproducirCancion();
});


cancion.addEventListener('timeupdate', function () {
  if (!cancion.paused) {
    progreso.value = cancion.currentTime;
  }
});

progreso.addEventListener('input', function () {
  cancion.currentTime = progreso.value;
});


const cancionesLista = document.querySelectorAll('.cancion-item');

cancionesLista.forEach(item => {
  item.addEventListener('click', () => {
    const nuevaSrc = item.getAttribute('data-src');
    const nuevoTitulo = item.getAttribute('data-titulo');
    const nuevoArtista = item.getAttribute('data-artista');

    cancion.src = nuevaSrc;
    tituloCancion.textContent = nuevoTitulo;
    nombreArtista.textContent = nuevoArtista;

    cancion.load();
    cancion.play();

    iconoPlay.classList.add('bi-pause-fill');
    iconoPlay.classList.remove('bi-play-fill');

    cancionesLista.forEach(li => li.classList.remove('active-song'));
    item.classList.add('active-song');

    document.querySelector('.reproductor').scrollIntoView({ behavior: 'smooth' });
  });
});

actualizarNombreCancion();
const navButtons = document.querySelectorAll(".nav-btn")

function scrollToSection(sectionId){
    const section = document.getElementById(sectionId)
    if (section){
        section.scrollIntoView({
            behavior:"smooth",
            block:"start"
        })
    }
}

navButtons.forEach(button => {
    button.addEventListener("click", function(e){
        e.preventDefault();
        const sectionId = this.getAttribute("data-section");
        scrollToSection(sectionId)
    });
});

window.addEventListener("scroll",function(){
    let current = "";
    const sections = this.document.querySelectorAll("section");

    sections.forEach(section => {
        const sectionTop = section.offsetTop
        const sectionHeight = section.clientHeight
        if(pageYOffset >= (sectionTop - 100)){
            current = section.getAttribute("id")
        }
    })

    navButtons.forEach(button => {
        button.computedStyleMap.backgroundColor = ""
        if(button.getAttribute("data-section") === current){
            button.style.backgroundColor ="#555"
        }
    })
})
