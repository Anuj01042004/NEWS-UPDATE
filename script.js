const categorySelect = document.getElementById('category');
const otherCategoryContainer = document.getElementById('other-category-container');
const otherCategoryInput = document.getElementById('other-category');
const form = document.getElementById('registration-form');
const statusDiv = document.getElementById('status');

// Show/hide "Other" input
categorySelect.addEventListener('change', function() {
  if (this.value === 'other') {
    otherCategoryContainer.style.display = 'block';
    otherCategoryInput.required = true;
  } else {
    otherCategoryContainer.style.display = 'none';
    otherCategoryInput.required = false;
  }
});

// Handle form submission
form.addEventListener('submit', async function(e) {
  e.preventDefault();

  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  let category = categorySelect.value;

  if (category === 'other') {
    category = otherCategoryInput.value.trim();
    if (!category) {
      statusDiv.innerText = "Please enter a category.";
      return;
    }
  }

  // Send data to n8n webhook
  const webhookURL = "YOUR_N8N_WEBHOOK_URL"; // <-- replace with your n8n webhook

  const payload = { name, email, category };

  statusDiv.innerText = "Submitting...";
  
  try {
    const response = await fetch("https://anuj50.app.n8n.cloud/webhook/register-user", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    if (response.ok) {
      statusDiv.innerText = `Thank you, ${name}! You are registered for ${category} news.`;
      form.reset();
      otherCategoryContainer.style.display = 'none';
    } else {
      statusDiv.innerText = "Error submitting your data. Please try again.";
    }
  } catch (error) {
    console.error(error);
    statusDiv.innerText = "Error connecting to server.";
  }
});
