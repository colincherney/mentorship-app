fetch(`/user-data`, {
  method: "GET",
  credentials: "same-origin",
})
  .then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  })
  .then((data) => {
    console.log("User Data:", data);

    document.getElementById("first_name").value = data[0].first_name;
    document.getElementById("last_name").value = data[0].last_name;
    document.getElementById("email").value = data[0].email;
    document.getElementById("phone").value = data[0].phone;
    document.getElementById("job_title").value = data[0].job_title;
    document.getElementById("location").value = data[0].location;
    document.getElementById("pfp_url").value = data[0].pfp_url;
    document.getElementById("about").value = data[0].about;
  })
  .catch((error) => {
    console.error("There was a problem with your fetch operation:", error);
  });

// Update User Data
document.getElementById("save").addEventListener("click", (event) => {
  fetch(`/update-data`, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      first_name: document.getElementById("first_name").value,
      last_name: document.getElementById("last_name").value,
      email: document.getElementById("email").value,
      phone: document.getElementById("phone").value,
      job_title: document.getElementById("job_title").value,
      location: document.getElementById("location").value,
      about: document.getElementById("about").value,
    }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((response) => {
      if (response.redirected) {
        // Redirect to the login page
        window.location.href = response.url;
      }
    })
    .catch((error) => {
      console.error("There was a problem with your fetch operation:", error);
    });
});
