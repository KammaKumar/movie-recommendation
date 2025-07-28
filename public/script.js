// public/script.js

document.addEventListener("DOMContentLoaded", () => {
    const recommendBtn = document.getElementById("recommendBtn");
    const userInput = document.getElementById("userInput");
    const recommendationDiv = document.getElementById("recommendation");
    const loaderDiv = document.getElementById("loader");

    recommendBtn.addEventListener("click", async () => {
        const inputText = userInput.value.trim();

        if (inputText === "") {
            alert("Please enter your preferences.");
            return;
        }

        // Show loader
        loaderDiv.style.display = "block";

        try {
            const response = await axios.get
                (`/recommend?input=${inputText}`);
            const recommendedMovie = marked.parse(response.data);

            if (recommendedMovie) {
                recommendationDiv.innerHTML = `
                      <h3>Recommended Movie:</h3>
                      <p>${recommendedMovie}</p>
                  `;
            } else {
                recommendationDiv.innerHTML = `
                      <p>No Movie recommendation available.</p>
                  `;
            }
        } catch (error) {
            console.error(error);
            recommendationDiv.innerHTML = `
                  <p>An error occurred while fetching Movie recommendation.</p>
              `;
        } finally {
            // Hide loader
            loaderDiv.style.display = "none";
        }
    });
});