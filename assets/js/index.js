// Mostrar todos los usuarios en cards (sin botones de acción)
const mostrarUsuarios = async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    const users = await response.json();

    let cardsHTML = '';
    users.forEach(usuario => {
        cardsHTML += generarCard(usuario);
    });
    document.getElementById('cards_container').innerHTML = cardsHTML;
};

const generarCard = (usuario) => {
    return `
        <div class="col-md-4" id="usuario-${usuario.id}">
            <div class="card shadow-lg h-100 border-0">
                <div class="card-body p-4">
                    <h5 class="card-title text-primary fw-bold">${usuario.name}</h5>
                    <p class="card-text"><strong>Id:</strong> ${usuario.id}</p>
                    <p class="card-text"><strong>Username:</strong> ${usuario.username}</p>
                    <p class="card-text"><strong>Email:</strong> <a href="mailto:${usuario.email}" class="text-decoration-none text-dark">${usuario.email}</a></p>
                    <p class="card-text"><strong>Ciudad:</strong> ${usuario.address.city}</p>
                </div>
            </div>
        </div>
    `;
};

const crearUsuario = async (name, username, email, city) => {
    const response = await fetch('https://jsonplaceholder.typicode.com/users', {
        method: 'POST',
        body: JSON.stringify({
            name: name,
            username: username,
            email: email,
            address: {
                city: city
            }
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    });
    const nuevoUsuario = await response.json();
    document.getElementById('cards_container').innerHTML += generarCard(nuevoUsuario);
    alert(`Nuevo Usuario creado con Id: ${nuevoUsuario.id}`);
};

const editarUsuario = async (id, newName, newUsername, newEmail, newCity) => {
    const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
            name: newName,
            username: newUsername,
            email: newEmail,
            address: {
                city: newCity
            }
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    });
    const usuarioEditado = await response.json();

    document.getElementById(`usuario-${id}`).innerHTML = `
        <div class="card shadow-lg h-100 border-0">
            <div class="card-body p-4">
                <h5 class="card-title text-primary fw-bold">${usuarioEditado.name}</h5>
                <p class="card-text"><strong>Username:</strong> ${usuarioEditado.username}</p>
                <p class="card-text"><strong>Email:</strong> <a href="mailto:${usuarioEditado.email}" class="text-decoration-none text-dark">${usuarioEditado.email}</a></p>
                <p class="card-text"><strong>Ciudad:</strong> ${usuarioEditado.address.city}</p>
            </div>
        </div>
    `;
    alert(`Usuario con ID ${id} ha sido actualizado`);
};

const eliminarUsuario = async (id) => {
    await fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
        method: 'DELETE',
    });
    alert(`Usuario con Id ${id} ha sido eliminado`);
    document.getElementById(`usuario-${id}`).remove(); 
};

window.addEventListener('load', function () {
    mostrarUsuarios();
});

document.getElementById('postForm').addEventListener('submit', function (event) {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const city = document.getElementById('city').value;
    crearUsuario(name, username, email, city);
});

document.getElementById('putForm').addEventListener('submit', function (event) {
    event.preventDefault();
    const id = document.getElementById('usuarioPut').value;
    const newName = document.getElementById('newName').value;
    const newUsername = document.getElementById('newUsername').value;
    const newEmail = document.getElementById('newEmail').value;
    const newCity = document.getElementById('newCity').value;
    editarUsuario(id, newName, newUsername, newEmail, newCity);
});

document.getElementById('deleteForm').addEventListener('submit', function (event) {
    event.preventDefault();
    const id = document.getElementById('usuarioDelete').value;
    eliminarUsuario(id);
});
