// Populate mentors page with all available mentors in mentor table
fetch(`/mentors`, {
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
    console.log("Mentor Data: ", data);
    const mentorContainer = document.getElementById("mentor-container");
    data.forEach((mentor) => {
      const mentorProfile = document.createElement("div");
      mentorProfile.classList.add("mentor-profile");

      const mentor_pfp = document.createElement("img");
      mentor_pfp.src = mentor.pfp_url;
      mentorProfile.appendChild(mentor_pfp);
      console.log(mentor.pfp_url);

      const mentorName = document.createElement("h2");
      mentorName.textContent = mentor.first_name;
      mentorProfile.appendChild(mentorName);

      const jobTitle = document.createElement("p");
      jobTitle.textContent = "Job title: " + mentor.job_title;
      mentorProfile.appendChild(jobTitle);

      const location = document.createElement("p");
      location.textContent = "Location: " + mentor.location;
      mentorProfile.appendChild(location);

      const about = document.createElement("p");
      about.textContent = "About: " + mentor.about;
      mentorProfile.appendChild(about);

      const contactLink = document.createElement("a");
      contactLink.textContent = mentor.email;
      contactLink.href = `mailto:${mentor.email}`;
      mentorProfile.appendChild(contactLink);
      const paragraph = document.createElement("p");
      contactLink.style.color = "blue";
      paragraph.appendChild(contactLink);
      mentorProfile.appendChild(paragraph);

      const requestButton = document.createElement("button");
      requestButton.classList.add("request-button");
      requestButton.textContent = "Add Mentor";
      requestButton.value = mentor.mentor_id;
      mentorProfile.appendChild(requestButton);

      mentorContainer.appendChild(mentorProfile);

      const remindButton = document.createElement("button"); // Create Remind button
      remindButton.classList.add("remind-button");
      remindButton.textContent = "Remind";
      remindButton.value = mentor.mentor_id;
      remindButton.addEventListener("click", () => {
        sendRemindEmail(mentor.email);
      });
      mentorProfile.appendChild(remindButton); // Append Remind button

      mentorContainer.appendChild(mentorProfile);
    });
    // Fetch and update button styles
    fetch("/checkMenteeInPlan")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        if (data.exists) {
          const buttons = document.querySelectorAll(".request-button");
          buttons.forEach((button) => {
            button.classList.add("disabled-button");
            button.disabled = true; // Disable the button
            button.textContent = "Already Have Mentor"; // Change the button text
          });
        }
      })
      .catch((error) => {
        console.error("Error checking mentee in plan:", error);
      });
  })
  .catch((error) => {
    console.error("There was a problem with your fetch operation:", error);
  });

function sendRemindEmail(mentorEmail) {
  fetch("/send-email", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      recipientEmail: mentorEmail,
      subject: "Reminder from MentorMe",
      message: "Don't forget to check in on your mentee!",
    }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.text();
    })
    .then((data) => {
      console.log("Email sent successfully:", data);
      // Handle success, if needed
    })
    .catch((error) => {
      console.error("Error sending email:", error);
      // Handle error, if needed
    });
}

// Create button function to send sql query to add mentor to mentee
document.addEventListener("click", (event) => {
  if (event.target.classList.contains("request-button")) {
    const mentor_id = event.target.value;
    console.log("Mentor ID: ", mentor_id);
    fetch(`/mentorRequest`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        mentor_id: mentor_id,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.text();
      })
      .then((data) => {
        console.log("Mentor added successfully:", data);
        // Handle success, if needed
      })
      .catch((error) => {
        console.error("Error adding mentor:", error);
        // Handle error, if needed
      });
  }
});
