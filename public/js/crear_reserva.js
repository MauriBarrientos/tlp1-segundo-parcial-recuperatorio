const formNuevaReserva = document.querySelector('#formNuevaReserva');

formNuevaTarea.addEventListener('submit', async (e) => {
    e.preventDefault();

    
    const nombre = document.querySelector('#nombre').value;
    const apellido = document.querySelector('#apellido').value;
    const fechaEntrada = document.querySelector('#fechaEntrada').value;
    const fechaSalida = document.querySelector('#fechaSalida').value;
    const numero = document.querySelector('#numero').value;

    const nuevaReserva = {
        nombre,
        apellido,
        fechaEntrada,
        fechaSalida,
        numero
    }

    try {
        const res = await fetch('http://localhost:4000/api/reserva', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token')
            },
            body: JSON.stringify(nuevaReserva)
        });

        const data = await res.json();
        console.log({ data });
        formNuevaReserva.reset();
        
        Swal.fire({
            icon: 'success',
            title: 'Reserva creada',
            text: 'La reserva se ha creado correctamente'
        })

      setTimeout(() => {
        window.location.href = '/reservas';
      }, 2000);
    } catch (error) {
        console.log(error);
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: error.message
        })
    }
})