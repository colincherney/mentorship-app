fetch("/mentor-status")
  .then((response) => response.text())
  .then((mentor_status) => {
    if (mentor_status == "mentor") {
      document.getElementById("content").innerHTML =
        "<h1>Manage Your Mentees</h1>";
    }
    if (mentor_status == "mentee") {
      document.getElementById("content").innerHTML = "<h1>My Mentee Plan</h1>";
      fetch("/checkMenteeInPlan")
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          if (data.exists) {
            console.log("test");
            fetch("/mentorName", {
              method: "GET",
              credentials: "same-origin", // Include this option to send cookies (including session ID)
            })
              .then((response) => {
                if (!response.ok) {
                  throw new Error("Network response was not ok");
                }
                return response.json();
              })
              .then((data) => {
                console.log(data);
                document.getElementById("content").innerHTML +=
                  "<h3>Your Mentor: " +
                  data.first_name +
                  " " +
                  data.last_name +
                  "</h3>";
                document.getElementById("content").innerHTML +=
                  "<a id='button' href='mentee_full_plan.html'>View Full Plan</a> <br>";
              })
              .catch((error) => {
                console.error(
                  "There was a problem with your fetch operation:",
                  error
                );
              });
          } else {
            document.getElementById("content").innerHTML =
              "<h1>You Do Not Have a Mentor Yet</h1>" +
              "<p>Click <a href='mentors.html'>here</a> to find a mentor</p>";
          }
        })
        .catch((error) => {
          console.error("Error checking mentee in plan:", error);
        });
    }
  });
