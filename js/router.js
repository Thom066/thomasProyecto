(function () {
    const user = JSON.parse(localStorage.getItem("user"));
    const ruta = window.location.pathname;
  
    const rutasProtegidas = ["/dashboard.html"];
    const rutasPublicas = ["/login.html", "/register.html"];
  
    // 1. Usuario NO autenticado quiere entrar a ruta protegida
    if (!user && rutasProtegidas.includes(ruta)) {
      window.location.href = "not-found.html";
    }
  
    // 2. Usuario autenticado quiere entrar a login o register
    if (user && rutasPublicas.includes(ruta)) {
      window.location.href = "dashboard.html";
    }
  })();
  