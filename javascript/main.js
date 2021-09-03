'use strict';

// VARIABLES
const d = document, $btnElegirUsuario = d.getElementById("elegirUsuario"),
    $contLogin = d.getElementById("login"),$contUsuarios = d.getElementById("usuarios"),
    $btnCrearNuevoUsuario = d.getElementById("crearNuevoUsuario"),$inputUsuario = d.getElementById("inputUsuario"),
    $txtError = d.getElementById("error"),$btnCerrarSesion = d.getElementById("cerrarSesion"),
    $contRegistro = d.getElementById("registro"),$contJuego = d.getElementById("juego");

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
        CrearUsuario();
        MostrarUsuarios();
        $contLogin.reset();
    }
}

const CrearUsuario = () => {
    localStorage.setItem($inputUsuario.value,JSON.stringify({
        scoreMax:0,
        lvl:0,
        xp:0
    }));
}

// EVENTOS
window.addEventListener("load",() =>    MostrarUsuarios());

$btnElegirUsuario.addEventListener("click",() => EsconderContRegistro());

$btnCrearNuevoUsuario.addEventListener("click",() => EsconderContRegistro());

$contLogin.addEventListener("submit",() => {
    ($inputUsuario.value === "") ? $txtError.textContent = "Ingresar Usuario" : ComprobarSiExisteUsuario();
});

$btnCerrarSesion.addEventListener("click",() => {
    $contJuego.classList.toggle("esconder");
    $contRegistro.classList.toggle("esconder");
});