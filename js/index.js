const operation = document.getElementById("operation"); //Seccion de la pantalla que muestra la operacion.
const result = document.getElementById("result"); //Seccion de la pantalla que muestra el resultado de la operacion.
const buttons = document.getElementById("buttons"); //llamamos a los botones.

//estado de la operacion.
let oComplete = false;

function lastValue(){
    //Guarda el ultimo elemento de la cadena guardada en "operation".
    const lv= operation.textContent.slice(-1);
    return lv;
};

function writeOperation(text){
    
    //Si el contenido de la constante "operation" es “0”.
    //Se remplazara por el contenido del botón clicado.  
    if(operation.textContent == "0" && text != "."){
        operation.textContent = "";
    };
    
    //Si la operacion esta concluida y se ingresa un simbolo matematico
    //El resultado de la operacion pasa a ser parte de una nueva operacion.
    //Y se cambia el estado de la operacion de completo a incompleto.
    if (oComplete && isNaN(text)){
        operation.textContent = result.textContent;
        oComplete= false;
    };
    //Si la operacion esta terminada e ingresamos un numero.
    //Se reinicia tanto el resultado como la operacion, iniciando una nueva.
    if (oComplete==true && isNaN(text)==false){
        operation.textContent = "";
        result.textContent="0";
        oComplete=false;
    };

    //Si el ultimo elemento de la cadena guardada en "operation" no es un valor numerico.
    //Y tampoco lo es el contenido del boton clicado, eliminara el ultimo elemento de la cadena.
    //Y lo remplazamos por el por el valor del boton clicado.
    if(isNaN(lastValue()) && isNaN(text) && lastValue()!==")"){
        operation.textContent = operation.textContent.slice(0,-1);
        operation.textContent += text;
    }
    else{
        operation.textContent += text;
    }

    //Si los digitos de la cuenta son mas de 14 se detiene toda operacion.
    if(operation.textContent.length>14){
        operation.textContent = "Demasiados digitos"
        operation.textContent = operation.textContent.slice(0,-1)
        result.textContent = "Error!";
    }
};

function writeResult(){
    try {
        //Usaremos la función “eval” 
        //Que evalúa un conjunto de String.
        //Si el mismo es una operaciones matemáticas,
        //lo tratará como tal y ejecutará la operación.
        //Transformando el contenido de “result”
        // en el resultado de la operación guardada en "operation".
        if(isNaN(lastValue()) && lastValue()!==")"){
            operation.textContent= operation.textContent.slice(0,-1)
            result.textContent = eval(operation.textContent);
        }else{
            result.textContent = eval(operation.textContent);
        }
        
    } catch {
        result.textContent = "Error!";
        //De no ser posible, el contenido se transformará en “Error!”.
    };
    
    //Al mostrar el resultado de la operacion se da por concpliuda la misma.
    oComplete= true;

    //Se reduce el tamaño de fuente de "result" para que no sobresalga de la pantalla.
    if(result.textContent.length>8){
        result.style.fontSize="20px"
    };
};

function changeSign(){
    let lastN="";
    let position = 0;

    if(!isNaN(lastValue())){
        for (let i = operation.textContent.length-1; i > 0; i--){
            if(isNaN(operation.textContent[i])){
                position = i + 1;
                break;
            };
        };
    };

    lastN = operation.textContent.substring(position);
    operation.textContent = operation.textContent.replace(lastN,`(-${lastN})`)

};

function delette(){
    //Remplazará el vlaor de "operation" por “0” Si el de "result" es “Error!” 
    //O su longitud es de 1 elemento.
    if(operation.textContent.length ==1 || operation.textContent=="Error!"){
        operation.textContent = "0";
    }else{
        operation.textContent = operation.textContent.slice(0,-1);
        //De lo contrario borrará el último elemento.
    };
};

function reset(){
    //Restablece los valores de las constantes "operation" y Result a "0".
    operation.textContent = "0";
    result.textContent = "0"
    return
};


buttons.addEventListener("click", e =>{

    switch (e.target.textContent) {
        case "C":
            reset();break;
        case "=":
            writeResult();break;
        case ",":
            writeOperation(".");break;
        case"←":
            delette();break;
        case"+/-":
            changeSign();break;
        default:
            writeOperation(e.target.textContent);break;
    };    
});