//Variables
const formulario = document.querySelector("#formulario");
const listaTweets = document.querySelector("#lista-tweets");
let tweets = [];

//Event Listeners
eventListeners();

function eventListeners() {
  //Cuando el usuario agrega un nuevo tweet
  formulario.addEventListener("submit", agregarTweet);
  //Cuando el documento esta listo
  document.addEventListener("DOMContentLoaded", () => {
    tweets = JSON.parse(localStorage.getItem("tweets")) || [];

    crearHTML();
  });
}
//Funciones
function agregarTweet(e) {
  e.preventDefault();

  //Textarea donde el usuario escribe
  const tweet = document.querySelector("#tweet").value;

  //Validacion de que escriben o no
  if (tweet === "") {
    mostrarError("Un mensaje no puede ir vacio");
    return; // Se evita que se ejecute mas lineas de codigo
  }
  const tweetObj = {
    id: Date.now(),
    tweet, // esto es igual a tweet: tweet   como son iguales ponemos solo tweet
  };
  //Añadir al arreglo de tweets
  tweets = [...tweets, tweetObj];
  //Una vez agregado vamos a crear el HTML
  crearHTML();

  //Reiniciar el formulario
  formulario.reset();
}

//Muestra mensaje de error
function mostrarError(error) {
  const mensajeError = document.createElement("p");
  mensajeError.textContent = error;
  mensajeError.classList.add("error");

  //Insertarlo el alerta en HTML
  const contenido = document.querySelector("#contenido");
  contenido.appendChild(mensajeError);
  //Elimina el alerta despues de 3segundos
  setTimeout(() => {
    mensajeError.remove();
  }, 3000);
}

//Muestra un listado de los tweets
function crearHTML() {
  limpiarHTML();

  if (tweets.length > 0) {
    tweets.forEach((tweet) => {
      //Agregar un boton de eliminar
      const btnEliminar = document.createElement("a");
      btnEliminar.classList.add("borrar-tweet");
      btnEliminar.innerText = "X";

      //Añadir la funcion de eliminar
      btnEliminar.onclick = () => {
        borrarTweet(tweet.id);
      };

      //Crear el HTML
      const li = document.createElement("li");

      // Añadir el texto
      li.innerText = tweet.tweet;

      //Asignar el boton
      li.appendChild(btnEliminar);

      //Insertarlo en el HTML
      listaTweets.appendChild(li);
    });
  }

  sincronizarStorage();
}

//Agrega los Tweets actuales a LocalStorage
function sincronizarStorage() {
  localStorage.setItem("tweets", JSON.stringify(tweets));
}

//Elimina un tweet
function borrarTweet(id) {
  tweets = tweets.filter((tweet) => tweet.id !== id);
  crearHTML();
}

//Limpiar el HTML
function limpiarHTML() {
  while (listaTweets.firstChild) {
    listaTweets.removeChild(listaTweets.firstChild);
  }
}
