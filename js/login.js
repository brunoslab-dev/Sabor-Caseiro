const API_URL = "http://localhost:3333";

const form = document.querySelector("#login-form");
const errorMessage = document.querySelector("#login-error");

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  errorMessage.hidden = true;
  errorMessage.textContent = "";

  const email = document.querySelector("#email").value.trim();
  const password = document.querySelector("#password").value;

  try {
    const response = await fetch(`${API_URL}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Não foi possível fazer login.");
    }

    localStorage.setItem("adminToken", data.token);

    window.location.href = "admin.html";
  } catch (error) {
    errorMessage.textContent =
      error instanceof Error
        ? error.message
        : "Erro ao fazer login.";

    errorMessage.hidden = false;
  }
});
