'use strict';

//VARIABLES
const d = document,$principal = d.getElementById("principal"),$formulario = d.getElementById("login"),
    $inputLogin = d.getElementById("inputLogin"),$escoger = d.getElementById("escoger"),
    $elegir = d.getElementById("elegir"),$cambiarUser = d.getElementById("cambiarUser");


let usuario;
//FUNCIONES

const ERRORLOGIN = () => {
    if($inputLogin.value === ""){
        d.getElementById("error").textContent = "Ingresa un usuario :)";
        d.getElementById("nice").textContent = ""
    }
}

const FECHA = () => {
    const fec = new Date();
    return `${fec.getDate()}/${fec.getMonth() + 1}/${fec.getFullYear()} ${fec.getHours()}:${fec.getMinutes()}:${fec.getSeconds()}`;
}

const ESCONDER = () => {
    $formulario.classList.toggle("esconder");
    $escoger.classList.toggle("esconder");
}

const GETUSUARIOS = () => {
    if(localStorage.length > 0){
        SHOWUSUARIOS();
    }
}

const SALUDAR = () => {
    console.log(usuario)
}

const SHOWUSUARIOS = () => {
    const $fragmento = d.createDocumentFragment();
    for(let $i = 0;$i < localStorage.length;$i++){
        const $boton = d.createElement("button");
        $boton.textContent = localStorage.key($i);
        $fragmento.appendChild($boton);
    }
    $escoger.insertBefore($fragmento,$cambiarUser);
}

const CREARUSUARIO = () => {
    $principal.classList.add("esconder");
    const DATOS = {
        scoreMax:0,
        recordQ:0,
        ultimaVez:FECHA()
    };
    localStorage.setItem($inputLogin.value,JSON.stringify(DATOS));
    ENTRAR();
}

const VERIFICAR = () => {
    let a = 0;
    for(let $i = 0;$i < localStorage.length;$i++){
        if($inputLogin.value === localStorage.key($i)) a++;
    }
    if(a>0){
        d.getElementById("error").textContent = "Este usuario ya existe :(" 
        d.getElementById("nice").textContent = ""
    }else{
        d.getElementById("nice").textContent = "Genial Nickname"; 
        d.getElementById("error").textContent = "";
        return 1;
    }
}

const ENTRAR = () => {
    $principal.classList.add("esconder");
    usuario = $inputLogin.value;
}

//EVENTOS
window.addEventListener("load",() => GETUSUARIOS());

$formulario.addEventListener("submit",(e)=>{
    e.preventDefault();
    let a = 0;
    ($inputLogin.value === "") ? ERRORLOGIN() : a = VERIFICAR();
    if(a===1) CREARUSUARIO();
});

$inputLogin.addEventListener("blur",() => {
    ($inputLogin.value === "") ? ERRORLOGIN() : VERIFICAR();
});

$elegir.addEventListener("click",() => {
    ESCONDER();
});

$cambiarUser.addEventListener("click",() => {
    ESCONDER();
});

d.addEventListener("click",(e) => {
    if(e.target.matches('#escoger button')){
        ENTRAR();
        usuario = e.target.textContent;
    }
});