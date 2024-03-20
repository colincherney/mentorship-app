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

    document.getElementById("welcome").innerText =
      "Welcome, " + data[0].first_name + " " + data[0].last_name;
  })
  .catch((error) => {
    console.error("There was a problem with your fetch operation:", error);
  });

