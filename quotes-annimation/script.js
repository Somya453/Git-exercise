const quoteElement = document.getElementById("quote");
const authorElement = document.getElementById("author");
const newQuoteButton = document.getElementById("new-quote");
const url = 'https://quotes-api12.p.rapidapi.com/quotes';
const options = {
	method: 'GET',
	headers: {
		'x-rapidapi-key': window.env.API_KEY,
		'x-rapidapi-host': 'quotes-api12.p.rapidapi.com'
	}
};

async function fetchQuote() {
  try {
    const response = await await fetch(url, options);
    const data = await response.json();
    return {
      quote: data?.response?.quote || "No quote available",
      author: data?.response?.author || "Unknown Author",
    };
  } catch (error) {
    console.error("Error fetching quote:", error);
    return {
      quote: "Could not fetch quote. Please try again.",
      author: "",
    };
  }
}

function animateText(element, text) {
  return new Promise((resolve) => {
    let i = 0;
    const interval = setInterval(() => {
      element.textContent += text[i];
      i++;
      if (i === text.length) {
        clearInterval(interval);
        resolve();
      }
    }, 50); 
  });
}

function removeText(element) {
  return new Promise((resolve) => {
    const text = element.textContent || ""; 
    if (text.length === 0) {
      resolve(); 
      return;
    }
    let i = text.length;
    const interval = setInterval(() => {
      if (i > 0) {
        element.textContent = text.substring(0, i - 1);
        i--;
      } else {
        clearInterval(interval);
        resolve(); 
      }
    }, 30); 
  });
}

async function displayNewQuote() {
  const { quote, author } = await fetchQuote();

  await removeText(authorElement);
  await removeText(quoteElement);
  
  
  await animateText(quoteElement, quote);
  await animateText(authorElement, `- ${author}`);
}

newQuoteButton.addEventListener("click", displayNewQuote);

document.addEventListener("DOMContentLoaded", displayNewQuote);
