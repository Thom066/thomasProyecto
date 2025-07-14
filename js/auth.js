document.getElementById("loginForm")?.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
  
    try {
      const res = await fetch(`http://localhost:3000/users?email=${email}&password=${password}`);
      const users = await res.json();
      if (users.length > 0) {
        const user = users[0];
        localStorage.setItem("user", JSON.stringify(user));
        window.location.href = "dashboard.html";
      } else {
        alert("Credenciales incorrectas.");
      }
    } catch (err) {
      console.error("Error:", err);
      alert("Error en el servidor.");
    }
  });
  document.getElementById("registerForm")?.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    const rol = document.getElementById("rol").value;
  
    try {
      const resCheck = await fetch(`http://localhost:3000/users?email=${email}`);
      const existing = await resCheck.json();
      if (existing.length > 0) {
        return alert("Ya existe un usuario con ese correo.");
      }
  
      const newUser = { email, password, rol };
      await fetch(`http://localhost:3000/users`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser)
      });
      alert("Usuario registrado con éxito. Puedes iniciar sesión.");
      window.location.href = "login.html";
    } catch (err) {
      console.error(err);
      alert("Error en el registro.");
    }
  });
  
  