document.addEventListener("DOMContentLoaded", function () {
  const dropzone = document.getElementById("drop-area");
  const fileInput = document.getElementById("input-file");
  const fileList = document.getElementById("fileList");
  const MAX_IMAGES = 5;

  //Write the code of all the dropzone functionality here
  dropzone.addEventListener("dragover", (e) => {
    e.preventDefault();
    console.log("called drag");
  });

  dropzone.addEventListener("drop", (e) => {
    e.preventDefault();
    console.log("called drop");
    console.log(fileInput);
  });

  fileInput.addEventListener("change", uploadImg);

  function uploadImg(){
    console.log(fileInput.files)
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

      //Complete the function here
    };
  }

  //Function to load the data from localStorage
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

      // Write rest of the code here
    });
  }
});


// What is the output of console.log(1 + - + 5 + + - + 1)?