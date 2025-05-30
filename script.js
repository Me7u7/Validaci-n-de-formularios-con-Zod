const { z } = window.Zod;

const registerSchema = z.object({
name: z.string().min(1, { message: "Ingresa un nombre" }),
email: z.string().email({ message: "El correo no tiene formato válido" }),
password: z.string().min(6, { message: "La contraseña debe de tener mínimo seis caracteres" }),
});

const form = document.getElementById("registerForm");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");

const nameError = document.getElementById("nameError");
const emailError = document.getElementById("emailError");
const passwordError = document.getElementById("passwordError");

function validateField(fieldName, value) {
try {
    registerSchema.pick({ [fieldName]: true }).parse({ [fieldName]: value });
    document.getElementById(fieldName + "Error").textContent = "";
} catch (err) {
    document.getElementById(fieldName + "Error").textContent = err.errors[0].message;
}
}

nameInput.addEventListener("input", () => validateField("name", nameInput.value));
emailInput.addEventListener("input", () => validateField("email", emailInput.value));
passwordInput.addEventListener("input", () => validateField("password", passwordInput.value));

form.addEventListener("submit", (event) => {
event.preventDefault();

const formData = {
    name: nameInput.value,
    email: emailInput.value,
    password: passwordInput.value,
};

try {
    registerSchema.parse(formData);
    alert("Ya puedes ingresar a tu perfil para ver los detalles de tu curso");
    nameError.textContent = "";
    emailError.textContent = "";
    passwordError.textContent = "";
} catch (error) {
    nameError.textContent = "";
    emailError.textContent = "";
    passwordError.textContent = "";

    error.errors.forEach((e) => {
    document.getElementById(e.path[0] + "Error").textContent = e.message;
    });
}
});
