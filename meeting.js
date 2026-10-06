const meetingChoices = document.querySelector("#meeting-choices");
const meetingResponse = document.querySelector("#meeting-response");
const meetingResponseNote = document.querySelector("#meeting-response-note");
const lastPageLink = document.querySelector("#last-page-link");
const changeMeetingButton = document.querySelector("#change-meeting");
const meetingStorageKey = "a-little-meeting-answer";

function renderMeeting(answer) {
  meetingChoices.hidden = Boolean(answer);
  meetingResponse.hidden = !answer;
  lastPageLink.hidden = !answer;

  if (answer === "mesalemya") {
    meetingResponseNote.textContent = "You chose Mesalemya.";
  } else if (answer === "abem") {
    meetingResponseNote.textContent = "You chose Abem.";
  }
}

meetingChoices.querySelectorAll("[data-answer]").forEach((button) => {
  button.addEventListener("click", () => {
    const answer = button.dataset.answer;
    try {
      localStorage.setItem(meetingStorageKey, answer);
    } catch {}
    renderMeeting(answer);
  });
});

changeMeetingButton.addEventListener("click", () => {
  try {
    localStorage.removeItem(meetingStorageKey);
  } catch {}
  renderMeeting(null);
});

try {
  const savedAnswer = localStorage.getItem(meetingStorageKey);
  if (savedAnswer === "mesalemya" || savedAnswer === "abem") renderMeeting(savedAnswer);
} catch {}