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
      console.log("Mentor Data: ", data)
      const mentorContainer = document.getElementById('mentor-container');
      data.forEach(mentor => {
        const mentorProfile = document.createElement('div');
        mentorProfile.classList.add('mentor-profile');

        const mentorName = document.createElement('h2');
        mentorName.textContent = mentor.first_name;
        mentorProfile.appendChild(mentorName);

        const jobTitle = document.createElement('p');
        jobTitle.textContent = mentor.job_title;
        mentorProfile.appendChild(jobTitle);

        const about = document.createElement('p');
        about.textContent = mentor.about;
        mentorProfile.appendChild(about);

        const contactLink = document.createElement('a');
        contactLink.textContent = 'Contact Mentor';
        contactLink.href = `mailto:${mentor.email}`;
        mentorProfile.appendChild(contactLink);

        const requestButton = document.createElement('button');
        requestButton.classList.add('request-button');
        requestButton.textContent = 'Request';
        mentorProfile.appendChild(requestButton);

        mentorContainer.appendChild(mentorProfile);
      })
      })
    .catch((error) => {
      console.error("There was a problem with your fetch operation:", error);
    });
  