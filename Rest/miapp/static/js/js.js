let loginAttempts = {}; // Almacena intentos fallidos por usuario
const maxAttempts = 5;
const lockoutTime = 15 * 60 * 1000; // 15 minutos en milisegundos

document.getElementById("btn").addEventListener("click", function (e) {
    e.preventDefault();

    const usernameInput = document.getElementById("Username").value.trim();
    const passwordInput = document.getElementById("Password").value.trim();

    // Validar si el usuario está bloqueado
    if (loginAttempts[usernameInput]?.lockedUntil > Date.now()) {
        alert("Usuario bloqueado. Intenta nuevamente después de 15 minutos.");
        return;
    }

    // Expresión regular para validar caracteres alfanuméricos
    const usernameRegex = /^[a-zA-Z0-9]+$/;

    if (!usernameRegex.test(usernameInput)) {
        alert("El nombre de usuario no debe contener caracteres especiales.");
        return;
    }

    if (!usernameRegex.test(passwordInput)) {
        alert("La contraseña no debe contener caracteres especiales.");
        return;
    }

    // Realizar la validación con el servidor
    fetch('/validate_user/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': getCookie('csrftoken') // CSRF Token
        },
        body: JSON.stringify({
            username: usernameInput,
            password: passwordInput
        })
    })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                window.location.href = "/home/";
            } else {
                // Manejar intentos fallidos
                alert(data.error || "Usuario o contraseña incorrectos.");
                if (!loginAttempts[usernameInput]) {
                    loginAttempts[usernameInput] = { attempts: 0, lockedUntil: 0 };
                }

                loginAttempts[usernameInput].attempts += 1;

                if (loginAttempts[usernameInput].attempts >= maxAttempts) {
                    loginAttempts[usernameInput].lockedUntil = Date.now() + lockoutTime;
                    alert("Usuario bloqueado por demasiados intentos fallidos. Intenta en 15 minutos.");
                }
            }
        })
        .catch(error => console.error("Error en la solicitud:", error));
});

// Función para obtener el token CSRF
function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}