const formulario = document.forms["formularioCliente"];

// Clase Factura
class Factura {
    constructor() {
        this.nombreCliente = this.obtenerNombre();
        this.trabajos = this.obtenerTrabajo();
        this.numeroHoras = this.obtenerNumeroHoras();
        this.precio = this.precioHora(); 
    }

    obtenerNombre() {
        let nombreCliente = formulario.elements["nombreCliente"];
        return nombreCliente.value; 
    }

    obtenerTrabajo() {
        let posiblesTrabajos = formulario.elements["trabajos"];
        return posiblesTrabajos.value;
    }

   
    obtenerNumeroHoras() {
        let numeroHoras = formulario.elements["numeroHoras"];
        return parseInt(numeroHoras.value) ; 
    }

    precioHora() {
        let numeroHoras = this.obtenerNumeroHoras();
        let precioHoras = formulario.elements["precioHoras"];
        let objetoTrabajo = {
            Albañilería: 15,
            Fontanería: 16,
            Electricidad: 17,
            Carpintería: 30
        };
        let trabajoSeleccionado = this.trabajos;

        if (objetoTrabajo[trabajoSeleccionado] !== undefined && numeroHoras > 0) {
            let precioTotal = objetoTrabajo[trabajoSeleccionado] * numeroHoras;
            precioHoras.value = objetoTrabajo[trabajoSeleccionado]; 
            return precioTotal; 
        }
        return 0; 
    }

  
    eleccionIva() {
        const radio = formulario.elements["radioIva"];
        const total = formulario.elements["total"];
        const importeTotal = formulario.elements["importeTotal"];

        
        let precioTotal = this.precioHora();
        let horas = this.obtenerNumeroHoras();
        let precioPorHora = formulario.elements["precioHoras"].value;

        
        importeTotal.value = horas * precioPorHora; 

        for (let i = 0; i < radio.length; i++) {
            if (radio[i].checked) {
                if (radio[i].value = "conIva") {
                    this.calcularIva(precioTotal);
                } else if (radio[i].value = "sinIva") {
                    total.value = importeTotal.value;
                }
            }
          
        }
    }

    calcularIva(precioTotal) {
        const lugarIva = formulario.elements["ivaPagar"];
        const total = formulario.elements["total"];
        let calculoIva = precioTotal * 0.21; 

        lugarIva.value = calculoIva; 
        total.value = (calculoIva + precioTotal); 
    }
}

function llamarVariable() {
    const conforme = formulario.elements["botonConforme"];
    if (!conforme.checked) {
        alert("Datos de conformidad primero");
    } else {
        let factura = new Factura();
        factura.eleccionIva(); 

        mostrarCamposOcultos();
    }
}

function mostrarCamposOcultos() {
    const camposOcultos = [
        formulario.elements["precioHoras"].parentElement,
        formulario.elements["importeTotal"].parentElement,
        formulario.elements["ivaPagar"].parentElement,
        formulario.elements["total"].parentElement
    ];

    
    camposOcultos.forEach(campo => {
        campo.style.display = "block"; 
    });
}
