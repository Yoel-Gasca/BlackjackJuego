const miModulo= ( () => {
    'use strict'
    let deck =[];
    const tipos=['C','D','H','S'];
    const especiales=['A','J','Q','K'];
    
    let puntosJugadores = [];
    //Referencias HTML
    const btnPedir = document.querySelector('#btnPedir'),
     btnDetener = document.querySelector('#btnDetener'),
     btnNuevo = document.querySelector('#btnNuevo'),
     divCartasJugadores = document.querySelectorAll('.divCartas'),
     puntosHTML = document.querySelectorAll('small');

    const iniciaJuejo = (numJugadores = 2) =>{
        deck = crearDeck();
        puntosJugadores = [];
        for (let i = 0; i < numJugadores; i++) {
            puntosJugadores.push(0);
        }
        puntosHTML.forEach( elem => elem.innerText=0);
        divCartasJugadores.forEach( elem => elem.innerHTML='');

        btnPedir.disabled = false;
        btnDetener.disabled = false;
    }
    const pedirCarta= () =>{
        if (deck.length===0){
            throw 'No hay mas cartas';
        }
        return deck.pop();
    }

    //funcion crear baraja
    const crearDeck = () => {
        deck = [];
        for (let i =2; i<=10; i++){
            for(let tipo of tipos){
                deck.push(i + tipo);
            }
        }
        for (let tipo of tipos){
            for(let esp of especiales){
                deck.push(esp + tipo);
            }
        }
    return _.shuffle(deck);
    }

    const valorCarta = (carta) => {
        const valor = carta.substring(0, carta.length-1);
        return ( isNaN (valor) ) ?
                (valor === 'A' ) ? 11 : 10
                : valor * 1;

    }
    
    /*MARCA ERROR
    const valor = valorCarta (pedirCarta()); 
    console.log({valor});*/

    const determinaGanador = () =>{
        //Desestructura de arreglos
        const [puntosMinimos, puntosComputadora] = puntosJugadores;
        setTimeout(() => {
            if ( puntosComputadora===puntosMinimos ) {
                alert('No hay ganador');
            } else if (puntosMinimos>21){
                alert('Computadora Wins');
            } else if (puntosComputadora>21){
                alert('Jugador Wins');
            } else{
                alert('Computadora Wins');
            }
        }, 100 );
    }

    const crearCarta = (carta, turno) =>{
        const imgCarta = document.createElement('img');
        imgCarta.src = `assets/cartas/${carta}.png`;
        imgCarta.classList.add('carta');
        divCartasJugadores[turno].append(imgCarta);
    }
    const acumularPuntos = (carta, turno) =>{
        puntosJugadores[turno] = puntosJugadores [turno] + valorCarta(carta);
        puntosHTML[turno].innerText = puntosJugadores[turno];
        return puntosJugadores[turno];
    }

    //Logica IA
    const turnoComputadora = (puntosMinimos) =>{
        let puntosComputadora = 0;
        do {
            const carta = pedirCarta();
            puntosComputadora = acumularPuntos(carta, puntosJugadores.length-1);
            crearCarta(carta, puntosJugadores.length-1);
        } while ( (puntosComputadora<puntosMinimos) && (puntosMinimos<=21));
        determinaGanador();
    }

    //botones
    btnPedir.addEventListener('click', () =>{
    const carta = pedirCarta()
    const puntosJugador = acumularPuntos(carta, 0);
    crearCarta( carta, 0 );

    if(puntosJugador>21) {
        console.warn('Perdiste');
        btnPedir.disabled = true;
        btnDetener.disabled = true;
        turnoComputadora(puntosJugador);

        } else if (puntosJugador===21){
            console.warn('Bien 21');
            btnPedir.disabled = true;
            btnDetener.disabled = true;
            turnoComputadora(puntosJugador);
        }
    })

    btnDetener.addEventListener('click', () =>{
        btnPedir.disabled = true;
        btnDetener.disabled = true;

        turnoComputadora(puntosJugadores[0]);
    })

    btnNuevo.addEventListener('click', () =>{
        iniciaJuejo();

    })
    return {
        nuevoJuego:iniciaJuejo
    }
}) ();