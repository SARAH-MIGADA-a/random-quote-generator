const quoteText = document.getElementById('quoteText');
const quoteAuthor = document.getElementById('quoteAuthor');
const newQuoteButton = document.getElementById('newQuoteButton');

async function getQuote() {
    quoteText.textContent = "Loading quote...";
    try {
        // Use the allorigins proxy
        const response = await fetch('https://api.allorigins.win/get?url=' + encodeURIComponent('https://zenquotes.io/api/random'));

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        const quoteData = JSON.parse(data.contents); // Parse the contents from the proxy response

        if (quoteData.length > 0) {
            const quote = quoteData[0];
            quoteText.textContent = `"${quote.q}"`;
            quoteAuthor.textContent = `- ${quote.a || "Unknown"}`;
        } else {
            throw new Error("No quotes found");
        }
    } catch (error) {
        quoteText.textContent = "Oops! Couldn't fetch a quote.";
        quoteAuthor.textContent = '';
        console.error("Fetch error: ", error);
    }
}

// Add event listener for button
newQuoteButton.addEventListener('click', getQuote);

// Fetch a quote on page load
getQuote();
