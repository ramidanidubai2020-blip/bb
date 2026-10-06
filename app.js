const photoInput = document.querySelector("#photo-input");
const removePhotoButton = document.querySelector("#remove-photo");
const photoStatus = document.querySelector("#photo-status");

const photoStorageKey = document.body.dataset.photoStorageKey || "a-little-hello-background";

function setPhoto(dataUrl) {
  document.documentElement.style.setProperty("--uploaded-background", `url("${dataUrl}")`);
  removePhotoButton.hidden = false;
}

function clearPhoto() {
  document.documentElement.style.removeProperty("--uploaded-background");
  removePhotoButton.hidden = true;
  try {
    localStorage.removeItem(photoStorageKey);
  } catch {
    photoStatus.textContent = "The photo could not be removed from saved browser settings.";
  }
  photoStatus.textContent = "Background photo removed.";
}

function resizePhoto(file) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    const objectUrl = URL.createObjectURL(file);

    image.onload = () => {
      const scale = Math.min(1, 1920 / Math.max(image.naturalWidth, image.naturalHeight));
      const canvas = document.createElement("canvas");
      canvas.width = Math.round(image.naturalWidth * scale);
      canvas.height = Math.round(image.naturalHeight * scale);
      canvas.getContext("2d").drawImage(image, 0, 0, canvas.width, canvas.height);
      URL.revokeObjectURL(objectUrl);
      resolve(canvas.toDataURL("image/jpeg", 0.84));
    };

    image.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      reject(new Error("That image could not be opened."));
    };

    image.src = objectUrl;
  });
}

photoInput.addEventListener("change", async () => {
  const [file] = photoInput.files;
  if (!file) return;

  try {
    const dataUrl = await resizePhoto(file);
    setPhoto(dataUrl);
    try {
      localStorage.setItem(photoStorageKey, dataUrl);
      photoStatus.textContent = "Background photo updated and saved on this device.";
    } catch {
      photoStatus.textContent = "Background photo updated for this visit, but could not be saved.";
    }
  } catch (error) {
    photoStatus.textContent = error.message;
  }
  photoInput.value = "";
});

removePhotoButton.addEventListener("click", clearPhoto);

try {
  let savedPhoto = localStorage.getItem(photoStorageKey);

  if (!savedPhoto && photoStorageKey === "a-little-date-poll-background") {
    const previousPhoto = localStorage.getItem("a-little-date-background");
    if (previousPhoto) {
      localStorage.setItem(photoStorageKey, previousPhoto);
      localStorage.removeItem("a-little-date-background");
      savedPhoto = previousPhoto;
    }
  }

  if (savedPhoto) setPhoto(savedPhoto);
} catch {
  photoStatus.textContent = "Browser storage is unavailable. Your photo will last for this visit.";
}