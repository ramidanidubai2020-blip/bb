const dateForm = document.querySelector("#date-form");
const dateStatus = document.querySelector("#date-status");
const dateFields = {
  date: document.querySelector("#date-value"),
  time: document.querySelector("#time-value"),
  place: document.querySelector("#place-value"),
  note: document.querySelector("#note-value"),
};
const dateStorageKey = "a-little-date-details";

dateForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const plan = Object.fromEntries(
    Object.entries(dateFields).map(([name, field]) => [name, field.value.trim()]),
  );

  try {
    localStorage.setItem(dateStorageKey, JSON.stringify(plan));
    dateStatus.textContent = "Date details saved on this device.";
  } catch {
    dateStatus.textContent = "Could not save these details in this browser.";
  }
});

try {
  const savedPlan = JSON.parse(localStorage.getItem(dateStorageKey) || "null");
  if (savedPlan && typeof savedPlan === "object") {
    Object.entries(dateFields).forEach(([name, field]) => {
      if (typeof savedPlan[name] === "string") field.value = savedPlan[name];
    });
  }
} catch {
  dateStatus.textContent = "Saved date details could not be loaded.";
}