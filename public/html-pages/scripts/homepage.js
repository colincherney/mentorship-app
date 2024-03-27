fetch('/mentor-status')
  .then(response => response.text())
  .then(mentor_status => {
    console.log(mentor_status);
  });