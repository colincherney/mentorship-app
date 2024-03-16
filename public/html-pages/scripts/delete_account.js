document
  .getElementById("delete-button")
  .addEventListener("click", function (event) {
    event.preventDefault(); // Prevent the default behavior of the button

    // Show confirmation dialog
    if (
      confirm(
        "Are you sure you want to delete your account? This action cannot be undone."
      )
    ) {
      fetch("/delete_account", {
        method: "POST",
        credentials: "same-origin", // Include cookies in the request
      })
        .then((response) => {
          if (response.redirected) {
            // Redirect to the login page
            window.location.href = response.url;
          } else {
            // Handle other responses
          }
        })
        .catch((error) => {
          console.error("Error deleting account:", error);
          // Handle error
        });
    }
  });
