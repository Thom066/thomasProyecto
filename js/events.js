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