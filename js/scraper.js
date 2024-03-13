import puppeteer from "puppeteer";

const getProducts = async () => {
  // Start a Puppeteer session with:
  // - a visible browser (`headless: false` - easier to debug because you'll see the browser in action)
  // - no default viewport (`defaultViewport: null` - website page will in full width and height)
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null,
  });

  // Open a new page
  const page = await browser.newPage();

  // On this new page:
  // - open the "https://cenoteka.rs/maxi-akcija/" website
  // - wait until the dom content is loaded (HTML is ready)
  await page.goto("https://cenoteka.rs/maxi-akcija/", {
    waitUntil: "domcontentloaded",
  });

// Get page data
  const products = await page.evaluate(() => {
    // Fetch the first element with class "quote"
    // Get the displayed text and returns it
    const quoteList = document.querySelectorAll(".product_product_wrap__eTgHL");

    // Convert the quoteList to an iterable array
    // For each quote fetch the text and author
    return Array.from(quoteList).map((product) => {
      // Fetch the sub-elements from the previously fetched quote element
      // Get the displayed text and return it (`.innerText`)
      const name = product.querySelector(".product_product_info__VrB66").innerText;
      const price = product.querySelector(".product_action_tooltip__cAqkj").innerText;
      const image = product.querySelector("img").src;
      const imageSrc = image.replaceAll("https://cenoteka.rs/_next/image/?url=", "").replaceAll("%3A", ":").replaceAll("%2F", "/").replaceAll("&w=3840&q=75", "");

      return { name, price, image, imageSrc };
    });
  });

  // Display the quotes
  console.log(products);

  // Close the browser
  await browser.close();
};
// Start the scraping
getProducts();
