

let deck = [];
const tipos = ['C','D','H','S'];
const especial = ['A','J','Q','K']

let puntosjugador = 0,
    puntospc = 0;


// referencias html

const nuevo = document.querySelector('#btnnuevo')
const pedir = document.querySelector('#btnpedir')
const denener = document.querySelector('#btndetener')
const contador = document.querySelectorAll('small')
const jugador = document.querySelector('#jugador-cartas')
const pc = document.querySelector('#pc-cartas')

// esta funcion crea nuestro deck de cartas
const crearDeck = () =>{
    for( let i = 2; i <= 10; i++){
        for(let tipo of tipos){

            deck.push(i + tipo)
        }
    }

    for(tipo of tipos){
        for(esp of especial){
            deck.push(esp + tipo)
        }
    
    }

    deck = _.shuffle(deck);
    // console.log(deck);
    return deck
}


crearDeck();


// esta funcion es para dar una carta y borrarla del deck
const pedirCarta = () =>{

    if(deck.length === 0 ){
        throw 'no hay carta en el deck';
    }

    const carta = deck.pop()

    return carta

    // console.log(deck);
}

// pedirCarta();

// esta funcion es para crearle un valor a las cartas para el juego

const valorCarta = (carta) =>{

    const valor = carta.substring(0, carta.length - 1);
    return (isNaN(valor)) ? 
            (valor === 'A') ? 11 : 10
            : valor * 1;

    // let puntos = 0;

    // if(isNaN(valor)){
    //     puntos = (valor === 'A') ?  11 : '10'
    // }else{
    //     puntos = valor * 1;
    // }

    // console.log(puntos);
}

const valor = valorCarta( pedirCarta() );
console.log({ valor });

// turno pc

const turnoPc = (puntosMinimos) =>{

    do{ 
    const carta = pedirCarta();
    puntospc = puntospc + valorCarta(carta);
    contador[1].innerText = puntospc


    const imgCarta = document.createElement('img')
    imgCarta.src = `assets/cartas/${ carta }.png`
    imgCarta.classList.add('carta')
    pc.append(imgCarta)
    
        if(puntosMinimos > 21){
            break;
        }

    }while( (puntospc < puntosMinimos) && (puntosMinimos <= 21) );

    setTimeout(() => {
        if(puntosjugador === puntospc){
            alert('es un empate')
        }if(puntosMinimos > 21){
            alert('gono la pc')
        }if (puntospc > 21){
            alert('gano el player')
        }else{
            alert('computadora gana')
        }
        
    }, 100);

}


// eventos DOM

pedir.addEventListener('click', () =>{

    const carta = pedirCarta();
    puntosjugador = puntosjugador + valorCarta(carta);
    contador[0].innerText = puntosjugador


    const imgCarta = document.createElement('img')
    imgCarta.src = `assets/cartas/${ carta }.png`
    imgCarta.classList.add('carta')
    jugador.append(imgCarta)


    if(puntosjugador > 21){
        console.warn('perdiste');
        pedir.disabled = true
        denener.disabled = true; 
        turnoPc(puntosjugador)
    }if(puntosjugador === 21){
        console.warn('21!!!');
        pedir.disabled = true
        denener.disabled = true;
        turnoPc(puntosjugador)

    }
});

denener.addEventListener('click', ()=>{
    pedir.disabled = true;
    denener.disabled = true;

    turnoPc(puntosjugador)
})


nuevo.addEventListener('click', () =>{

    console.clear();


    deck = [];
    deck = crearDeck();

    puntosjugador = 0
    puntospc = 0
    contador[0].innerText = 0
    contador[1].innerText = 0

    pc.innerHTML = '';
    jugador.innerHTML = '';

    pedir.disabled = false;
    denener.disabled = false;

})