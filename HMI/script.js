document.addEventListener('DOMContentLoaded', function() {
    const startButton = document.querySelector('.start');
    const stopButton = document.querySelector('.stop');
    const motor = document.querySelector('.motor');
    const rueda = document.querySelector('.rueda');
    const caja1 = document.querySelector('.caja1');
    const caja2 = document.querySelector('.caja2');
    const sensor1 = document.querySelector('.sensor1');
    const sensor2 = document.querySelector('.sensor2');
    const barraEstampado = document.querySelector('.barra_estampado');

    let animationStarted = false;

    startButton.addEventListener('click', function() {
        if (!animationStarted) {
            motor.classList.add('rotating');
            rueda.classList.add('rotating');
            caja1.classList.add('moving');
            caja2.classList.add('moving');
            animationStarted = true;

            // Verifica cuando la caja1 llega al sensor1
            caja1.addEventListener('animationend', function() {
                motor.classList.remove('rotating');
                rueda.classList.remove('rotating');
                caja1.classList.remove('moving');
                caja2.classList.remove('moving');
                animationStarted = false;

                // Asegúrate de que la caja1 se detenga en la posición del sensor1
                caja1.style.left = '410px';
                caja2.style.left = '420px'; // Ajusta esta posición según sea necesario

                // Inicia la animación de la barra de estampado 1 segundo después
                setTimeout(function() {
                    barraEstampado.classList.add('movingDown');

                    // Agrega un evento para detectar cuando la barra de estampado termina de bajar
                    barraEstampado.addEventListener('animationend', function() {
                        // Inicia la animación de la barra de estampado para que suba
                        barraEstampado.classList.remove('movingDown');
                        barraEstampado.classList.add('movingUp');

                        barraEstampado.addEventListener('animationend', function() {
                            // Después de que la barra de estampado suba, mueve la caja1 hasta antes de la rueda
                            caja2.classList.add('movingToRueda');
                            caja1.classList.add('movingRightCaja2');
                            motor.classList.add('rotating');
                            rueda.classList.add('rotating');

                            caja1.addEventListener('animationend', function() {
                                motor.classList.remove('rotating');
                                rueda.classList.remove('rotating');
                                caja1.style.left = '530px';                                
                                barraEstampado.classList.add('movingDownCaja2');

                                // Agrega un evento para detectar cuando la barra de estampado termina de bajar
                                barraEstampado.addEventListener('animationend', function() {
                                    // Inicia la animación de la barra de estampado para que suba de nuevo
                                    barraEstampado.classList.remove('movingDownCaja2');
                                    barraEstampado.classList.add('movingUpCaja2');
                                    caja1.classList.add('movingRightAgainCaja2');
                                    motor.classList.add('rotating');
                                    rueda.classList.add('rotating');
                                    caja1.addEventListener('animationend', function(){
                                        motor.classList.remove('rotating');
                                        rueda.classList.remove('rotating');
                                        caja1.style.left = '615px';
                                    }, { once: true });
                            
                                }, { once: true });

                            }, { once: true });

                          

                        }, { once: true });

                    }, { once: true });
                }, 100);

            }, { once: true });
        }
    });

    stopButton.addEventListener('click', function() {
        motor.classList.remove('rotating');
        rueda.classList.remove('rotating');
        caja1.classList.remove('moving');
        caja2.classList.remove('moving');
        barraEstampado.classList.remove('movingDown');
        barraEstampado.classList.remove('movingUp');
        caja1.classList.remove('movingToRueda');
        caja2.classList.remove('movingToRueda');
        caja1.classList.remove('movingRightCaja2');
        barraEstampado.classList.remove('movingDownCaja2');
        barraEstampado.classList.remove('movingUpCaja2');
        caja1.classList.remove('movingRightAgainCaja2')
        animationStarted = false;
    });
});

