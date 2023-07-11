const screen = document.querySelector(".screen"); //llamamos a la pantalla
const buttons = document.querySelectorAll(".btn"); //llamamos a los botones

buttons.forEach(button => {

    //Utilizando la función “forEach” agregamos un eventListener “click” a los botones.
    button.addEventListener("click",() =>{

        //Guardamos el "contenido" del botón clicado en una constante más fácil de evaluar.
        const clickbutton = button.textContent; 
        
        // Si el id del boton es “c” transformará el contenido de la constante “screen” en “0”.        
        if(button.id=="c"){
            screen.textContent = "0";
            return
        }


        // Si el id del boton es “delete”
        if(button.id=="delete"){
            // Remplazará el vlaor de "screen" por “0” Si el mismo es “Error!” 
            // o su longitud es de 1 elemento.
            if(screen.textContent.length ==1 || screen.textContent=="Error!"){
                screen.textContent = "0";
            }else{
                screen.textContent = screen.textContent.slice(0,-1);
                //De lo contrario borrará el último elemento.
            }
            return
        }
        //Si el id del botón clicado es “equal” ...
        if(button.id=="equal"){
            
            try {
                //Usaremos la función “eval” 
                //Que evalúa un conjunto de String.
                //Si el mismo hay operaciones matemáticas,
                //lo tratará como una cadena de números y ejecutará la operación.
                //Transformando el contenido de “screen” en el resultado de dicha operación.
                screen.textContent = eval(screen.textContent);
            } catch {
                screen.textContent = "Error!"
                //De no ser posible, el contenido se transformará en “Error!”
            }
            
            return
        }

        if(screen.textContent == "0" || screen.textContent=="Error!"){
            screen.textContent = clickbutton;
            //Si el contenido de la constante “screen” es “0” o “Error!”.
            //Se remplazara por el contenido del botón clicado.  

        } else{
            screen.textContent += clickbutton;
            //De lo contrario se sumara a su contenido el del botón clicado.
        }
        
    })
})