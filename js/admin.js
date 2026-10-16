const API_BASE_URL = "http://localhost:3333";

const statusElement = document.querySelector("#dashboard-status");
const reservationsList = document.querySelector("#reservations-list");

const token = localStorage.getItem("adminToken");

if (!token) {
  window.location.href = "login.html";
}

const authHeaders = {
  Authorization: `Bearer ${token}`,
};

async function loadReservations() {
  try {
    statusElement.textContent = "Loading reservations...";

    const response = await fetch(`${API_BASE_URL}/api/reservations`, {
      headers: authHeaders,
    });

    if (response.status === 401) {
      localStorage.removeItem("adminToken");
      window.location.href = "login.html";
      return;
    }

    if (!response.ok) {
      throw new Error("Failed to load reservations.");
    }

    const data = await response.json();

    renderReservations(data.reservations);

    statusElement.textContent =
      `${data.reservations.length} reservation(s) found.`;
  } catch (error) {
    console.error(error);

    statusElement.textContent =
      "Unable to load reservations. Check if the API is running.";
  }
}

function renderReservations(reservations) {
  reservationsList.replaceChildren();

  if (!reservations.length) {
    const emptyMessage = document.createElement("p");
    emptyMessage.textContent = "No reservations found.";
    reservationsList.appendChild(emptyMessage);
    return;
  }

  reservations.forEach((reservation) => {
    const card = document.createElement("article");
    card.className = "reservation-card";

    const title = document.createElement("h2");
    title.textContent = reservation.name;

    const email = document.createElement("p");
    email.innerHTML = "<strong>Email:</strong> ";
    email.appendChild(document.createTextNode(reservation.email));

    const date = document.createElement("p");
    date.innerHTML = "<strong>Date:</strong> ";
    date.appendChild(
      document.createTextNode(
        new Date(reservation.date).toLocaleDateString("en-GB")
      )
    );

    const time = document.createElement("p");
    time.innerHTML = "<strong>Time:</strong> ";
    time.appendChild(
      document.createTextNode(reservation.time || "Not specified")
    );

    const guests = document.createElement("p");
    guests.innerHTML = "<strong>Guests:</strong> ";
    guests.appendChild(document.createTextNode(String(reservation.guests)));

    const status = document.createElement("span");
    status.className = `reservation-status status-${String(
      reservation.status
    ).toLowerCase()}`;
    status.textContent = reservation.status;

    card.append(title, email, date, time, guests, status);

    if (reservation.message) {
      const message = document.createElement("p");
      message.innerHTML = "<strong>Message:</strong> ";
      message.appendChild(document.createTextNode(reservation.message));
      card.appendChild(message);
    }

    const actions = document.createElement("div");
    actions.className = "reservation-actions";

    const confirmButton = document.createElement("button");
    confirmButton.type = "button";
    confirmButton.dataset.action = "confirm";
    confirmButton.dataset.id = reservation.id;
    confirmButton.textContent = "Confirm";

    const cancelButton = document.createElement("button");
    cancelButton.type = "button";
    cancelButton.dataset.action = "cancel";
    cancelButton.dataset.id = reservation.id;
    cancelButton.textContent = "Cancel";

    const deleteButton = document.createElement("button");
    deleteButton.type = "button";
    deleteButton.dataset.action = "delete";
    deleteButton.dataset.id = reservation.id;
    deleteButton.textContent = "Delete";

    actions.append(confirmButton, cancelButton, deleteButton);
    card.appendChild(actions);

    reservationsList.appendChild(card);
  });
}

async function updateReservationStatus(id, status) {
  const response = await fetch(
    `${API_BASE_URL}/api/reservations/${id}/status`,
    {
      method: "PATCH",
      headers: {
        ...authHeaders,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status }),
    }
  );

  if (response.status === 401) {
    localStorage.removeItem("adminToken");
    window.location.href = "login.html";
    return;
  }

  if (!response.ok) {
    throw new Error("Failed to update reservation.");
  }
}

async function deleteReservation(id) {
  const response = await fetch(
    `${API_BASE_URL}/api/reservations/${id}`,
    {
      method: "DELETE",
      headers: authHeaders,
    }
  );

  if (response.status === 401) {
    localStorage.removeItem("adminToken");
    window.location.href = "login.html";
    return;
  }

  if (!response.ok) {
    throw new Error("Failed to delete reservation.");
  }
}

reservationsList.addEventListener("click", async (event) => {
  const button = event.target.closest("button[data-action]");

  if (!button) {
    return;
  }

  const { action, id } = button.dataset;

  try {
    button.disabled = true;

    if (action === "confirm") {
      await updateReservationStatus(id, "CONFIRMED");
    }

    if (action === "cancel") {
      await updateReservationStatus(id, "CANCELLED");
    }

    if (action === "delete") {
      const confirmed = window.confirm(
        "Are you sure you want to delete this reservation?"
      );

      if (!confirmed) {
        button.disabled = false;
        return;
      }

      await deleteReservation(id);
    }

    await loadReservations();
  } catch (error) {
    console.error(error);
    window.alert("Could not complete the operation.");
    button.disabled = false;
  }
});

loadReservations();

const logoutButton = document.querySelector("#logout-button");

logoutButton?.addEventListener("click", () => {
  localStorage.removeItem("adminToken");
  window.location.href = "login.html";
});
