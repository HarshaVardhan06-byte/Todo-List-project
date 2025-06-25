document.getElementById('feedbackForm').addEventListener('submit', function(e) {
  e.preventDefault();

  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const course = document.getElementById('course').value.trim();
  const feedback = document.getElementById('feedback').value.trim();

  if (!name || !email || !course || !feedback) {
    alert("Please fill all fields");
    return;
  }

  const feedbackEntry = { name, email, course, feedback };
  let feedbackData = JSON.parse(localStorage.getItem("feedbackData")) || [];
  feedbackData.push(feedbackEntry);
  localStorage.setItem("feedbackData", JSON.stringify(feedbackData));

  showFeedback();
  this.reset();
});

function showFeedback() {
  const feedbackList = document.getElementById('feedbackList');
  const feedbackData = JSON.parse(localStorage.getItem("feedbackData")) || [];

  feedbackList.innerHTML = "";

  feedbackData.forEach(entry => {
    const div = document.createElement('div');
    div.className = "feedback-item";
    div.innerHTML = `<strong>${entry.name}</strong> (${entry.email})<br>
                     <em>${entry.course}</em><br>
                     ${entry.feedback}`;
    feedbackList.appendChild(div);
  });
}

// Load feedback on page load
window.onload = showFeedback;
