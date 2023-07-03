const listadoReservas = document.querySelector('#listadoReservas');
const reservas = {};

const obtenerReservas = async () => {
    const res = await fetch('http://localhost:4000/api/reservas', {
        headers: {
            'Authorization': localStorage.getItem('token')
        }
    });

    if(res.status === 404 ) {
        return [];
    }

    const data = await res.json();
    return data;
}

const eliminarReserva = async (event) => {
    const id = event.target.dataset.id;

    try {
        const res = await fetch(`http://localhost:4000/api/reserva/${id}`, {
            method: 'DELETE'
        });

        const data = await res.json();

        console.log(data);

        Swal.fire({
            icon: 'success',
            title: 'Reserva eliminada',
            text: data.message,
        });
        
        setTimeout(() => {
            window.location.reload();
        }, 2200);

    } catch (error) {
        console.log(error);
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: error.message,
        })
    }

}

const mostrarReservas = (reservas) => {

    // Si no hay tareas, mostrar un mensaje
    if(reservas.length === 0){
        listadoReservas.innerHTML = `
            <tr>
                <td colspan="3" class="text-center">No hay reservas registradas</td>
            </tr>
        `;
        return;
    };

    reservas.forEach(reserva => {
        listadoReservas.innerHTML += `
                    <tr>
                        <td>${reserva.nombre}</td>
                        <td>${reserva.apellido}</td>
                        <td>${reserva.fechaEntrada}</td>
                        <td>${reserva.fechaSalida}</td>
                        <td>${reserva.numero}</td>
                        <td>${reserva.codigoReserva}</td>
                        <td>
                            <button onclick=eliminarReserva(event) class="btn btn-danger btn-sm" data-id="${reserva.id}">Eliminar</button>
                            <a href="/reserva/editar/${reserva.id}" class="btn btn-warning btn-sm">Editar</a>
                        </td>
                    </tr>
                `;
    });
}

// Obtener las tareas automáticamente cuando se carga la página
document.addEventListener('DOMContentLoaded', async () => {

    console.log('DOM cargado')

    // Dentro de try se coloca el código que se quiere ejecutar
    try {
        const reservas = await obtenerReservas();     
        mostrarReservas(reservas);
    } catch (error) {  // Dentro de catch se coloca el código que se ejecutará en caso de que haya un error
        console.log({ error });

        // Mensaje para el usuario
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: error.message,
        });
    }
});