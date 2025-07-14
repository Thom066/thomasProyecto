function getEvents(cb) {
    fetch('http://localhost:3001/events')
      .then(r => r.json())
      .then(cb);
  }
  
  function createEvent(event, cb) {
    fetch('http://localhost:3001/events', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(event)
    }).then(r => r.json()).then(cb);
  }
  
  function updateEvent(id, data, cb) {
    fetch(`http://localhost:3001/events/${id}`, {
      method: 'PATCH',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data)
    }).then(r => r.json()).then(cb);
  }
  
  function deleteEvent(id, cb) {
    fetch(`http://localhost:3001/events/${id}`, {method: 'DELETE'})
      .then(r => r.json()).then(cb);
  }
  const API_URL = "http://localhost:3000/events";

export async function obtenerEventos() {
  const res = await fetch(API_URL);
  return await res.json();
}

export async function crearEvento(data) {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
  return await res.json();
}

export async function eliminarEvento(id) {
  await fetch(`${API_URL}/${id}`, { method: "DELETE" });
}

export async function actualizarEvento(id, data) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
  return await res.json();
}
