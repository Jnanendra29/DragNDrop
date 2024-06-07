document.addEventListener("DOMContentLoaded", function () {
  const dropzone = document.getElementById("dropzone");
  const fileInput = document.getElementById("fileInput");
  const fileList = document.getElementById("fileList");
  const MAX_IMAGES = 5;

  // Carousel Functionality
  let currentIndex = 0;

  function showNextSlide() {
    const slides = document.querySelector(".carousel-items");
    const totalSlides = document.querySelectorAll(".carousel-item").length;
    currentIndex = (currentIndex + 1) % totalSlides;
    slides.style.transform = `translateX(-${currentIndex * 100}%)`;
  }

  setInterval(showNextSlide, 3000);

  // Dropzone functionality
  dropzone.addEventListener("click", () => fileInput.click());
  fileInput.addEventListener("change", handleFiles);
  dropzone.addEventListener("dragover", (e) => {
    e.preventDefault();
    dropzone.classList.add("dragover");
  });
  dropzone.addEventListener("dragleave", () =>
    dropzone.classList.remove("dragover")
  );
  dropzone.addEventListener("drop", (e) => {
    e.preventDefault();
    dropzone.classList.remove("dragover");
    const files = e.dataTransfer.files;
    handleFiles({ target: { files } });
  });

  function handleFiles(event) {
    const files = event.target.files;
    console.log(files);
    let currentImages = null;
    if (fileList.getElementsByClassName("file-name").length == 0) {
      currentImages = 0;
    } else {
      currentImages = fileList.getElementsByClassName("file-name").length;
    }
    if (currentImages + files.length > MAX_IMAGES) {
      alert(`You can only upload up to ${MAX_IMAGES} images.`);
      return;
    }

    Array.from(files).forEach((file) => {
      if (!file.type.startsWith("image/")) {
        alert("File " + file.name + " is not an image file.");
        return;
      }
      if (file.size > 1024 * 1024) {
        alert("File " + file.name + " is larger than 1MB.");
        return;
      }
      displayFile(file);
    });
  }

  function displayFile(file) {
    const reader = new FileReader();

    reader.onload = function (e) {
      const div = document.createElement("div");
      div.className = "file-name";

      const img = document.createElement("img");
      img.src = e.target.result;
      img.alt = file.name;
      img.className = "thumbnail";
      div.appendChild(img);

      const textarea = document.createElement("textarea");
      textarea.placeholder = "Add a description...";
      div.appendChild(textarea);

      const iconsDiv = document.createElement("div");
      iconsDiv.className = "icons";

      const checkIcon = document.createElement("span");
      checkIcon.className = "des-added";
      checkIcon.innerHTML = '<img src="./assets/checked.png">'; // Check icon
      checkIcon.addEventListener("click", () => {
        if (textarea.value == "") {
          alert("Description is required");
          return;
        }
        textarea.addEventListener("change", (e) => {
          const desc = e.target.value;
          textarea.value = desc;
        });
        textarea.setAttribute("disabled", "true");
        checkIcon.style.pointerEvents = "none";
        saveToLocalStorage();
        alert("Description has been added.");
      });

      const deleteIcon = document.createElement("span");
      deleteIcon.className = "delete";
      deleteIcon.innerHTML = '<img src="./assets/delete.png">'; // Delete icon
      deleteIcon.addEventListener("click", () => {
        div.remove();
        saveToLocalStorage();
      });

      iconsDiv.appendChild(checkIcon);
      iconsDiv.appendChild(deleteIcon);

      div.appendChild(iconsDiv);
      fileList.appendChild(div);
    };

    reader.readAsDataURL(file);
  }

  function saveToLocalStorage() {
    const imagesData = [];
    const files = fileList.getElementsByClassName("file-name");

    Array.from(files).forEach((file) => {
      const img = file.querySelector("img");
      const description = file.querySelector("textarea").value;
      console.log("description: ", description);
      imagesData.push({ src: img.src, description });
    });

    localStorage.setItem("storedImagesData", JSON.stringify(imagesData));
  }

  // Load the data from localStorage
  function loadFromLocalStorage() {
    const storedImagesData = JSON.parse(
      localStorage.getItem("storedImagesData") || "[]"
    );
    console.log("Loaded from localStorage:", storedImagesData);

    storedImagesData.forEach((data) => {
      const div = document.createElement("div");
      div.className = "file-name";

      const img = document.createElement("img");
      img.src = data.src;
      img.className = "thumbnail";
      div.appendChild(img);

      const textarea = document.createElement("textarea");
      textarea.value = data.description;
      textarea.setAttribute("disabled", "true");
      div.appendChild(textarea);

      const iconsDiv = document.createElement("div");
      iconsDiv.className = "icons";

      const checkIcon = document.createElement("span");
      checkIcon.className = "des-added";
      checkIcon.innerHTML = '<img src="./assets/checked.png">'; // Check icon
      checkIcon.style.pointerEvents = "none"; // Disable click

      const deleteIcon = document.createElement("span");
      deleteIcon.className = "delete";
      deleteIcon.innerHTML = '<img src="./assets/delete.png">';
      deleteIcon.addEventListener("click", () => {
        div.remove();
        saveToLocalStorage();
      });

      iconsDiv.appendChild(checkIcon);
      iconsDiv.appendChild(deleteIcon);

      div.appendChild(iconsDiv);
      fileList.appendChild(div);
    });
  }

  loadFromLocalStorage();
});
