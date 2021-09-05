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
    $btnTerminarJuego = d.getElementById("terminarJuego"),$txtPregunta = d.getElementById("txtPregunta"),
    $txtNumeroPregunta = d.getElementById("txtNumeroPregunta"),$contRespuestas = d.getElementById("respuestas"),
    $txtPuntuacion = d.getElementById("txtPuntuacion"),$btnRegresarInicio = d.getElementById("regresarInicio"),
    $contFinalizarJuego = d.getElementById("finalizarJuego");


let usuario,modoJuego,tiempo,vidas=3,contador,pregunta = 0,operaciones = ["+","-","*"],respuesta,puntuacion = 0,
    newScoreMax,nivel,xpJugador;

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
        if(tiempo === 0){
            ReiniciarJuego();
        }
    },1000);
}

const ReiniciarJuego = () => {
    $contFinalizarJuego.classList.remove("esconder");
    GuardarDatos();
    Resetear();
}

const Resetear = () =>{
    tiempo = 0;
    vidas = 3;
    modoJuego = "";
    pregunta = 0;
    puntuacion = 0;
    $txtPuntuacion.textContent = 0;
    clearInterval(contador);
}

const NumeroRandom = () => Math.floor(Math.random() * 3);

const Facil = () => {
    let num1 = Math.floor(Math.random() * 10);
    let num2 = Math.floor(Math.random() * 10);
    let r = NumeroRandom();
    let ope = `${num1} ${operaciones[r]} ${num2}`;
    $txtPregunta.textContent = ope;
    respuesta = Resolver(ope);
    PosiblesRespuestas();
}


const Intermedio = () => {
    let num1 = Math.floor(Math.random() * 10);
    let num2 = Math.floor(Math.random() * 10);
    let num3 = Math.floor(Math.random() * 10);
    let r = NumeroRandom();
    let rr = NumeroRandom();
    let ope = `${num1} ${operaciones[r]} ${num2} ${operaciones[rr]} ${num3}`;
    $txtPregunta.textContent = ope;
    respuesta = Resolver(ope);
    PosiblesRespuestas();

}

const Dificil = () => {
    let num1 = Math.floor(Math.random() * 10);
    let num2 = Math.floor(Math.random() * 10);
    let num3 = Math.floor(Math.random() * 10);
    let num4 = Math.floor(Math.random() * 10);
    let r = NumeroRandom();
    let rr = NumeroRandom();
    let rrr = NumeroRandom();
    let ope = `${num1} ${operaciones[r]} ${num2} ${operaciones[rr]} ${num3} ${operaciones[rrr]} ${num4}`;
    $txtPregunta.textContent = ope;
    respuesta = Resolver(ope);
    PosiblesRespuestas();

}

const ModoJuegoElegido = () => {
    pregunta++;
    switch(modoJuego){
        case 'facil':
            Facil();
            break;
        case 'intermedio':
            Intermedio();
            break;
        default:
            Dificil();
            break;
    }
    $txtNumeroPregunta.textContent = pregunta;
}

const Resolver = (ope) => {
    return new Function('return ' + ope)();
}

const PosiblesRespuestas = () => {
    const $f = d.createDocumentFragment();
    let btn1 = d.createElement("button");
    let btn2 = d.createElement("button");
    let btn3 = d.createElement("button");
    btn1.textContent = `${respuesta + 1}`;
    btn2.textContent = `${respuesta}`;
    btn3.textContent = `${respuesta - 1}`;
    $f.appendChild(btn1);
    $f.appendChild(btn2);
    $f.appendChild(btn3);
    $contRespuestas.replaceChildren($f);
}

const VerificarRespuestas = (respuestaUsuario) => {
    if(respuestaUsuario === respuesta){
        switch(modoJuego){
            case 'facil':
                tiempo+=2;
                puntuacion+=2;
                break;
            case 'intermedio':
                tiempo += 3;
                puntuacion+=5;
                break;
            default:
                tiempo += 5;
                puntuacion += 10;
                break;
        }
        $txtTiempo.textContent = tiempo;
        $txtPuntuacion.textContent = puntuacion;
    }else{
        tiempo -= 2;
        vidas -= 1;
        $txtVidas.textContent = vidas;
        if(vidas === 0) ReiniciarJuego();
    }
    ModoJuegoElegido();
}

const GuardarDatos = () => {
    let Datos = JSON.parse(localStorage.getItem(usuario));
    if(Datos.scoreMax < puntuacion) newScoreMax = puntuacion;
    else newScoreMax = Datos.scoreMax;

    xpJugador = Datos.xp + puntuacion;
    nivel = Math.floor(xpJugador/100)+ Datos.lvl;

    if(xpJugador/100 >= 1){
        xpJugador-= (100*Math.floor(xpJugador/100));
    }

    let newDatos = {
        scoreMax:newScoreMax,
        lvl:nivel,
        xp:xpJugador
    };
    localStorage.removeItem(usuario);
    localStorage.setItem(usuario,JSON.stringify(newDatos));

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
    $txtError.textContent = "";
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
        ModoJuegoElegido();
    }

    if(e.target.matches("#respuestas button")){
        VerificarRespuestas(parseInt(e.target.textContent));
    }
});

$btnTerminarJuego.addEventListener("click", () => {
    GuardarDatos();
    Resetear();
    $contJuego2.classList.add("esconder");
    $contJuego.classList.remove("esconder");
    EntrarJuego();
});

$btnRegresarInicio.addEventListener("click",() => {
    $contFinalizarJuego.classList.add("esconder");
    EntrarJuego();
    Resetear();
    $contJuego2.classList.add("esconder");
});

