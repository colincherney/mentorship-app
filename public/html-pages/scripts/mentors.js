const mentee_id = '';

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
        jobTitle.textContent = 'Job title: ' + mentor.job_title;
        mentorProfile.appendChild(jobTitle);

        const location = document.createElement('p');
        location.textContent = 'Location: ' + mentor.location;
        mentorProfile.appendChild(location);

        const about = document.createElement('p');
        about.textContent = 'About: ' + mentor.about;
        mentorProfile.appendChild(about);

        const contactLink = document.createElement('a');
        contactLink.textContent = mentor.email;
        contactLink.href = `mailto:${mentor.email}`;
        mentorProfile.appendChild(contactLink);
        const paragraph = document.createElement('p');
        contactLink.style.color = 'blue';
        paragraph.appendChild(contactLink);
        mentorProfile.appendChild(paragraph);

        const requestButton = document.createElement('button');
        requestButton.classList.add('request-button');
        requestButton.textContent = 'Add Mentor';
        requestButton.value = mentor.mentor_id;
        mentorProfile.appendChild(requestButton);

        mentorContainer.appendChild(mentorProfile);

        const remindButton = document.createElement('button'); // Create Remind button
        remindButton.classList.add('remind-button');
        remindButton.textContent = 'Remind';
        remindButton.value = mentor.mentor_id;
        remindButton.addEventListener('click', () => {
          sendRemindEmail(mentor.email);
        });
        mentorProfile.appendChild(remindButton); // Append Remind button

        mentorContainer.appendChild(mentorProfile);
      }) })
      .catch((error) => {
        console.error("There was a problem with your fetch operation:", error);
      });
      
      function sendRemindEmail(mentorEmail) {
        fetch('/send-email', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            recipientEmail: mentorEmail,
            subject: 'Reminder from MentorMe',
            message: 'Don\'t forget to check in on your mentee!'
          })
        })
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.text();
        })
        .then(data => {
          console.log('Email sent successfully:', data);
          // Handle success, if needed
        })
        .catch(error => {
          console.error('Error sending email:', error);
          // Handle error, if needed
        });
      }
  
        


// Pull mentee table (IN PROGRESS, need to fix the req.session.user_id in here)
fetch(`/mentees`, {
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
    console.log("Mentee Data: ", data)
    const mentee_sess_id = '';
    data.forEach(mentee => {
    const user_id = req.session.user_id;

    if (user_id == mentee.user_id){
      mentee_sess_id = mentee.mentee_id;
      console.log(mentee_sess_id);
    }
    })
    
    })
  .catch((error) => {
    console.error("There was a problem with your fetch operation:", error);
  });

// Create button function to send sql query to add mentor

// Find some way to grab mentor and mentee id to insert into the fetch call

