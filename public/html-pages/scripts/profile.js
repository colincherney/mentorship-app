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

    document.getElementById("pfp").src = 
    data[0].pfp_url

    document.getElementById("name").innerText =
      data[0].first_name + " " + data[0].last_name;

    document.getElementById("email").innerText = "Email: " + data[0].email;

    document.getElementById("location").innerText =
      "Location: " + data[0].location;

    document.getElementById("job").innerText =
      "Job Title: " + data[0].job_title;

    document.getElementById("about").innerText = data[0].about;
  })
  .catch((error) => {
    console.error("There was a problem with your fetch operation:", error);
  });
