import {
    obtenerEventos,
    crearEvento,
    eliminarEvento,
    actualizarEvento,
  } from "./events.js";
  
  const user = JSON.parse(localStorage.getItem("user"));
  const container = document.getElementById("eventosContainer");
  const rolTexto = document.getElementById("rolTexto");
  
  if (!user || user.rol !== "admin") {
    window.location.href = "login.html";
  }
  
  rolTexto.textContent = `Rol: ADMINISTRADOR`;
  
  document.getElementById("logoutBtn").addEventListener("click", () => {
    localStorage.removeItem("user");
    window.location.href = "login.html";
  });
  
  function renderEventos(eventos) {
    container.innerHTML = `
      <h4 class="mb-4">Gestión de Eventos</h4>
      <button class="btn btn-success mb-3" data-bs-toggle="modal" data-bs-target="#modalEvento">Crear Evento</button>
      <table class="table table-bordered">
        <thead class="table-dark">
          <tr>
            <th>Título</th>
            <th>Descripción</th>
            <th>Fecha</th>
            <th>Capacidad</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          ${eventos.map(ev => `
            <tr>
              <td>${ev.titulo}</td>
              <td>${ev.descripcion}</td>
              <td>${ev.fecha}</td>
              <td>${ev.capacidad}</td>
              <td>
                <button class="btn btn-sm btn-primary editarBtn" data-id="${ev.id}">Editar</button>
                <button class="btn btn-sm btn-danger eliminarBtn" data-id="${ev.id}">Eliminar</button>
              </td>
            </tr>
          `).join("")}
        </tbody>
      </table>
    `;
    setBotones(eventos);
  }
  
  async function cargarEventos() {
    const eventos = await obtenerEventos();
    renderEventos(eventos);
  }
  
  function setBotones(eventos) {
    document.querySelectorAll(".eliminarBtn").forEach(btn => {
      btn.addEventListener("click", async () => {
        const id = btn.dataset.id;
        if (confirm("¿Seguro que deseas eliminar este evento?")) {
          await eliminarEvento(id);
          cargarEventos();
        }
      });
    });
  
    document.querySelectorAll(".editarBtn").forEach(btn => {
      btn.addEventListener("click", () => {
        const id = btn.dataset.id;
        const evento = eventos.find(e => e.id == id);
        document.getElementById("idEvento").value = evento.id;
        document.getElementById("titulo").value = evento.titulo;
        document.getElementById("descripcion").value = evento.descripcion;
        document.getElementById("fecha").value = evento.fecha;
        document.getElementById("capacidad").value = evento.capacidad;
        new bootstrap.Modal(document.getElementById("modalEvento")).show();
      });
    });
  }
  
  // Manejo del formulario
  document.getElementById("formEvento").addEventListener("submit", async e => {
    e.preventDefault();
    const id = document.getElementById("idEvento").value;
    const nuevoEvento = {
      titulo: document.getElementById("titulo").value,
      descripcion: document.getElementById("descripcion").value,
      fecha: document.getElementById("fecha").value,
      capacidad: parseInt(document.getElementById("capacidad").value)
    };
  
    if (id) {
      await actualizarEvento(id, nuevoEvento);
    } else {
      await crearEvento(nuevoEvento);
    }
  
    document.getElementById("formEvento").reset();
    bootstrap.Modal.getInstance(document.getElementById("modalEvento")).hide();
    cargarEventos();
  });
  
  cargarEventos();
  
  if (user.rol === "admin") {
    import("./dashboardAdmin.js").then(mod => mod.initAdminDashboard());
  } else if (user.rol === "visitante") {
    import("./visitante.js");
  }
  