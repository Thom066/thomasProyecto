const API_EVENTOS = "http://localhost:3000/events";
const API_REGISTROS = "http://localhost:3000/registros";
const user = JSON.parse(localStorage.getItem("user"));

const container = document.getElementById("eventosContainer");
const rolTexto = document.getElementById("rolTexto");

if (!user || user.rol !== "visitante") {
  window.location.href = "login.html";
}

rolTexto.textContent = `Rol: VISITANTE`;

document.getElementById("logoutBtn").addEventListener("click", () => {
  localStorage.removeItem("user");
  window.location.href = "login.html";
});

async function obtenerEventos() {
  const res = await fetch(API_EVENTOS);
  return await res.json();
}

async function obtenerRegistros() {
  const res = await fetch(`${API_REGISTROS}?userId=${user.id}`);
  return await res.json();
}

async function registrarEnEvento(eventoId) {
  // Verificar si ya está registrado
  const registros = await obtenerRegistros();
  const yaRegistrado = registros.find(r => r.eventoId === eventoId);
  if (yaRegistrado) return alert("Ya estás registrado en este evento.");

  // Verificar capacidad
  const eventoRes = await fetch(`${API_EVENTOS}/${eventoId}`);
  const evento = await eventoRes.json();
  const todosRegistros = await fetch(`${API_REGISTROS}?eventoId=${eventoId}`);
  const registrados = await todosRegistros.json();
  if (registrados.length >= evento.capacidad) {
    return alert("Este evento ya está lleno.");
  }

  // Registrar
  await fetch(API_REGISTROS, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ eventoId, userId: user.id })
  });

  alert("Registro exitoso.");
  mostrarEventos();
}

async function mostrarEventos() {
  const eventos = await obtenerEventos();
  const registros = await obtenerRegistros();

  container.innerHTML = `
    <h4 class="mb-4">Eventos Disponibles</h4>
    <div class="row">
      ${eventos.map(ev => {
        const registrado = registros.find(r => r.eventoId === ev.id);
        return `
          <div class="col-md-4 mb-3">
            <div class="card shadow">
              <div class="card-body">
                <h5 class="card-title">${ev.titulo}</h5>
                <p class="card-text">${ev.descripcion}</p>
                <p><strong>Fecha:</strong> ${ev.fecha}</p>
                <p><strong>Capacidad:</strong> ${ev.capacidad}</p>
                ${
                  registrado
                    ? `<span class="badge bg-success">Registrado</span>`
                    : `<button class="btn btn-primary btn-sm registrarseBtn" data-id="${ev.id}">Registrarse</button>`
                }
              </div>
            </div>
          </div>
        `;
      }).join("")}
    </div>
  `;

  document.querySelectorAll(".registrarseBtn").forEach(btn => {
    btn.addEventListener("click", () => {
      const id = parseInt(btn.dataset.id);
      registrarEnEvento(id);
    });
  });
}

mostrarEventos();
