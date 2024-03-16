document.getElementById("logout").addEventListener("click", function (event) {
  event.preventDefault(); // Prevent the default link behavior

  fetch("/logout", {
    method: "GET",
    credentials: "same-origin", // Include cookies in the request
  })
    .then((response) => {
      if (response.redirected) {
        // Redirect to the login page
        window.location.href = response.url;
      }
    })
    .catch((error) => {
      console.error("Error logging out:", error);
      // Handle error
    });
});
