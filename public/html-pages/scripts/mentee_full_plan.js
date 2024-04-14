document.addEventListener("DOMContentLoaded", function () {
  fetch("/getProgress")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      // Set the checked state of the checkboxes based on the progress data
      const checkboxes = document.querySelectorAll('input[type="checkbox"]');
      checkboxes.forEach((checkbox, index) => {
        checkbox.checked = data.progress[index] === 1;
      });
    })
    .catch((error) => {
      console.error("There was a problem with your fetch operation:", error);
    });
});

document.getElementById("save").addEventListener("click", function () {
  // Get the values of the checkboxes
  const checkboxes = document.querySelectorAll('input[type="checkbox"]');
  const values = Array.from(checkboxes).map((cb) => (cb.checked ? 1 : 0));

  // Send the values to the server
  fetch("/saveProgress", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ values: values }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.text();
    })
    .then((data) => {
      alert("Progress saved successfully!");
    })
    .catch((error) => {
      console.error("There was a problem with your fetch operation:", error);
    });
});
