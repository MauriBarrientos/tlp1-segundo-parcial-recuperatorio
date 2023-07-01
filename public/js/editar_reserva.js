// Referencia al formulario
const formEditar = document.querySelector('#formEditar');
const nombre = document.querySelector('#nombre');
const apellido = document.querySelector('#apellido');
const fechaEntrada = document.querySelector('#fechaEntrada');
const fechaSalida = document.querySelector('#fechaSalida');
const numero = document.querySelector('#numero');
const reservaId = formEditar.dataset.id;

// Funcion para obtener los datos de la tarea cuando se carga la página
document.addEventListener('DOMContentLoaded', async () => {

    console.log('DOM cargado');
    
    try {
        const response = await fetch(`http://127.0.0.1:4000/api/reserva/${reservaId}`);

        // Si hubo un error al obtener los datos de un usuario
        if (!response.ok) {
            throw ({
                message: 'Error al obtener datos de la reserva'
            })
        }

        // Se obtienen los datos de la respuesta (fetch)
        const { nombre, apellido, fechaEntrada, fechaSalida, numero } = await response.json();

        console.log({nombre, apellido, fechaEntrada, fechaSalida, numero})

        // username.value = username;
        // email.value = email;

        const nombreInput = document.getElementById('nombre')
        const apellidoInput = document.getElementById('apellido')
        const fechaEntradaInput = document.getElementById('fechaEntrada')
        const fechaSalidaInput = document.getElementById('fechaSalida')
        const numeroInput = document.getElementById('numero')


        nombreInput.value = nombre;
        apellidoInput.value = apellido;
        fechaEntradaInput.value = fechaEntrada;
        fechaSalidaInput.value = fechaSalida;
        numeroInput.value = numero;

    } catch (error) {
        console.log(error);
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: error.message,
        })
    }

});


// Escuchar el evento submit
formEditar.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Se crea un objeto con los datos del formulario
    const formData = {
        nombre: e.target.nombre.value,
        apellido: e.target.apellido.value,
        fechaEntrada: e.target.fechaEntrada.value,
        fechaSalida: e.target.fechaSalida.value,
        numero: e.target.numero.value,
    }

    try {
        // Se envia la peticion al servidor
        const resp = await fetch(`http://localhost:4000/api/reserva/${usuarioId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })

        if (resp.status !== 200) {
            throw ({
                message: 'Error al editar la reserva'
            })
        }

        const data = await resp.json();

        Swal.fire({
            icon: 'success',
            title: data.message,
            showConfirmButton: false,
            timer: 1500
        })
        setTimeout(() => {
            window.location.href = '/reservas';
        }, 1500);

    } catch (error) {
        Swal.fire({
            icon: 'error',
            title: error.message,
            timer: 2000,
        })
    }
});