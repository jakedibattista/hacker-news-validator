# Hacker News Validator

A Node.js script using Playwright to validate article sorting on Hacker News.

## Description
This script validates that the first 100 articles on Hacker News/newest are properly sorted from newest to oldest.

## Setup
1. Install dependencies:

bash
npm install
npx playwright install

2. Run the script:

bash
node index.js


## Requirements
- Node.js
- npm

## What it does
- Navigates to news.ycombinator.com/newest
- Collects timestamps for the first 100 articles
- Validates articles are sorted from newest to oldest
- Provides detailed logging of the validation process

## Output
The script will either:
- Pass: Confirm 100 articles are properly sorted
- Fail: Exit with error if articles are not sorted or if unable to find 100 articles

## Notes
- The script uses Playwright to navigate and interact with the Hacker News page
- It validates the sorting by comparing timestamps of consecutive articles
- The script is designed to work with the current Hacker News layout


### How can I help my application stand out?

We've found that our best hires have been the most enthusiastic throughout our process. If you are very excited about working here, please feel free to go above and beyond on this assignment.
