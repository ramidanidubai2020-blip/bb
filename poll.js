const pollChoices = document.querySelector("#poll-choices");
const pollResponse = document.querySelector("#poll-response");
const pollResponseNote = document.querySelector("#poll-response-note");
const datePlanLink = document.querySelector("#date-plan-link");
const changeAnswerButton = document.querySelector("#change-answer");
const answerStorageKey = "a-little-date-answer";

function renderAnswer(answer) {
  pollChoices.hidden = Boolean(answer);
  pollResponse.hidden = !answer;
  datePlanLink.hidden = answer !== "yes";

  if (answer === "yes") {
    pollResponseNote.textContent = "Yay, it's a date!";
  } else if (answer === "no") {
    pollResponseNote.textContent = "Aww, maybe another time.";
  }
}

pollChoices.querySelectorAll("[data-answer]").forEach((button) => {
  button.addEventListener("click", () => {
    const answer = button.dataset.answer;
    try {
      localStorage.setItem(answerStorageKey, answer);
    } catch {}
    renderAnswer(answer);
  });
});

changeAnswerButton.addEventListener("click", () => {
  try {
    localStorage.removeItem(answerStorageKey);
  } catch {}
  renderAnswer(null);
});

try {
  const savedAnswer = localStorage.getItem(answerStorageKey);
  if (savedAnswer === "yes" || savedAnswer === "no") renderAnswer(savedAnswer);
} catch {
}