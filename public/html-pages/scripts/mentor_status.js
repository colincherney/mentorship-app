fetch('/mentor-status')
  .then(response => response.text())
  .then(mentor_status => {
    if (mentor_status == "mentor") {
      document.getElementById("mentor").remove()
    }
  });