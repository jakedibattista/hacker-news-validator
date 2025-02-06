// EDIT THIS FILE TO COMPLETE ASSIGNMENT QUESTION 1
const { chromium } = require('@playwright/test');

async function validateHackerNews() {
  console.log('Starting browser...');
  const browser = await chromium.launch({
    headless: true
  });
  const page = await browser.newPage();
  
  try {
    console.log('Navigating to Hacker News...');
    await page.goto('https://news.ycombinator.com/newest');
    
    let timestamps = [];
    let attempts = 0;
    const maxAttempts = 5;
    
    while (timestamps.length < 100 && attempts < maxAttempts) {
      console.log(`Attempt ${attempts + 1}: Collecting timestamps...`);
      
      // Get current timestamps
      const currentTimestamps = await page.$$eval('.age', elements => 
        elements.map(el => ({
          time: el.getAttribute('title'),
          text: el.textContent,
          timestamp: new Date(el.getAttribute('title')).getTime()
        }))
      );
      
      timestamps = [...timestamps, ...currentTimestamps];
      console.log(`Current number of articles: ${timestamps.length}`);
      
      // If we haven't reached 100 articles, click "More" and wait for load
      if (timestamps.length < 100) {
        console.log('Clicking More to load additional articles...');
        await Promise.all([
          page.waitForNavigation(),
          page.click('.morelink')
        ]);
        await page.waitForTimeout(1000);
      }
      
      attempts++;
    }

    if (timestamps.length < 100) {
      throw new Error(`Failed validation: Could only find ${timestamps.length} articles, expected 100`);
    }

    // Slice to exactly 100 and validate sorting
    timestamps = timestamps.slice(0, 100);
    console.log(`Found ${timestamps.length} articles`);
    
    // Validate that articles are sorted from newest to oldest
    for (let i = 1; i < timestamps.length; i++) {
      if (timestamps[i].timestamp > timestamps[i-1].timestamp) {
        throw new Error(`Failed validation: Articles are not properly sorted. Article ${i} is newer than article ${i-1}`);
      }
    }
    
    console.log('VALIDATION PASSED: Found exactly 100 articles sorted from newest to oldest');
    console.log('First article timestamp:', timestamps[0].time);
    console.log('Last article timestamp:', timestamps[99].time);
    
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  } finally {
    console.log('Closing browser...');
    await browser.close();
  }
}

console.log('Script started');
validateHackerNews().catch(error => {
  console.error('Unhandled error:', error);
  process.exit(1);
});
