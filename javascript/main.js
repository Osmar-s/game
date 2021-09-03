'use strict';

// VARIABLES
const d = document, $btnElegirUsuario = d.getElementById("elegirUsuario"),
    $contLogin = d.getElementById("login"),$contUsuarios = d.getElementById("usuarios"),
    $btnCrearNuevoUsuario = d.getElementById("crearNuevoUsuario"),$inputUsuario = d.getElementById("inputUsuario"),
    $txtError = d.getElementById("error"),$btnCerrarSesion = d.getElementById("cerrarSesion"),
    $contRegistro = d.getElementById("registro"),$contJuego = d.getElementById("juego1"),
    $txtUsuario = d.getElementById("txtUsuario"),$txtMaximaPuntuacion = d.getElementById("txtMaximaPuntuacion"),
    $txtNivel = d.getElementById("txtNivel"),$txtXP = d.getElementById("txtXP"),$contJuego2 = d.getElementById("juego2"),
    $txtModo = d.getElementById("txtModo"),$txtTiempo = d.getElementById("txtTiempo"),$txtVidas = d.getElementById("txtVidas"),
    $btnTerminarJuego = d.getElementById("terminarJuego");


let usuario,modoJuego,tiempo,vidas=3,contador;

// FUNCIONES
const EsconderContRegistro = () => {
    $contLogin.classList.toggle("esconder");
    $contUsuarios.classList.toggle("esconder");
}

const MostrarUsuarios = () => {
    const $f = d.createDocumentFragment();
    for(let $i = 0; $i < localStorage.length; $i++){
        const $btn = d.createElement("button");
        $btn.textContent = localStorage.key($i);
        $f.appendChild($btn);
    }
    d.getElementById("contenedorBtnUsuarios").replaceChildren($f);
}

const ComprobarSiExisteUsuario = () => {
    let a = 0;
    for(let $i = 0; $i < localStorage.length; $i++){
        if($inputUsuario.value === localStorage.key($i)) a++;
    }
    if(a > 0){
        $txtError.textContent = "Este usuario ya Existe"
    }else{
        $txtError.textContent = "";
        usuario = $inputUsuario.value;
        CrearUsuario();
        MostrarUsuarios();
        $contLogin.reset();
        $contRegistro.classList.add("esconder");
        EntrarJuego();
    }
}

const CrearUsuario = () => {
    localStorage.setItem($inputUsuario.value,JSON.stringify({
        scoreMax:0,
        lvl:0,
        xp:0
    }));
}

const EntrarJuego = () => {
    $contJuego.classList.remove("esconder");
    const DatosJugador = JSON.parse(localStorage.getItem(usuario));
    $txtUsuario.textContent = usuario;
    $txtMaximaPuntuacion.textContent = DatosJugador.scoreMax;
    $txtNivel.textContent = DatosJugador.lvl;
    $txtXP.textContent = `${DatosJugador.xp} / 100`; 
}

const IniciarJuego = () => {
    $contJuego.classList.add("esconder");
    $contJuego2.classList.remove("esconder");
    switch(modoJuego){
        case 'facil':
            $txtModo.textContent = "Facíl";
            tiempo = 30;
            break;
        case 'intermedio':
            $txtModo.textContent = "Intermedio";
            tiempo = 20;
            break;
        default:
            $txtModo.textContent = "Difícil";
            tiempo = 15;
            break;
    }
    $txtTiempo.textContent = tiempo;
    $txtVidas.textContent = vidas;
    contador = setInterval(() => {
        tiempo--;
        $txtTiempo.textContent = tiempo;
        if(tiempo === 0) Resetear();
    },1000);
}

const Resetear = () =>{
    tiempo = 0;
    vidas = 3;
    modoJuego = "";
    clearInterval(contador);
}

// EVENTOS
window.addEventListener("load",() =>    MostrarUsuarios());

$btnElegirUsuario.addEventListener("click",() => EsconderContRegistro());

$btnCrearNuevoUsuario.addEventListener("click",() => EsconderContRegistro());

$contLogin.addEventListener("submit",(e) => {
    e.preventDefault();
    ($inputUsuario.value === "") ? $txtError.textContent = "Ingresar Usuario" : ComprobarSiExisteUsuario();
});

$btnCerrarSesion.addEventListener("click",() => {
    $contJuego.classList.toggle("esconder");
    $contRegistro.classList.toggle("esconder");
});

d.addEventListener("click",(e) => {
    if(e.target.matches("#contenedorBtnUsuarios button")){
        $contRegistro.classList.add("esconder");
        usuario = e.target.textContent;
        EntrarJuego();
    }

    if(e.target.matches("#escogerModoJuego button")){
        modoJuego = e.target.value;
        IniciarJuego();
    }
});

$btnTerminarJuego.addEventListener("click", () => {
    Resetear();
    $contJuego2.classList.add("esconder");
    $contJuego.classList.remove("esconder");
});