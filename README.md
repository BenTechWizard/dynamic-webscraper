# Dynamic Web Scraper

A flexible TypeScript-based web scraping tool built with Playwright that allows you to configure scraping actions and data collection through a simple JSON configuration file.

## Features

- **Configurable scraping**: Define scraping actions and data collection through `config.json`
- **Pre-scrape actions**: Perform clicks, form inputs, and other interactions before data collection
- **Flexible data extraction**: Extract any HTML attribute from elements using CSS selectors
- **Headless/headed browser support**: Choose between visible or headless browser execution
- **TypeScript support**: Full type safety and modern JavaScript features
- **Error handling**: Comprehensive error handling with detailed logging

## Prerequisites

- Node.js (version 16 or higher)
- npm or yarn package manager

## Installation

1. Clone the repository:
```bash
git clone https://github.com/BenTechWizard/dynamic-webscraper.git
cd dynamic-webscraper
```

2. Install dependencies:
```bash
npm install
```

3. Install Playwright browsers:
```bash
npx playwright install
```

## Configuration

The scraper is configured through the `utils/config.json` file. This file defines the target URL, browser settings, pre-scrape actions, and data collection rules.

### Configuration Structure

```json
{
    "url": "https://example.com",
    "headless": false,
    "preScrapeActions": [
        {
            "selector": "#cookie-accept",
            "action": "click",
            "value": ""
        },
        {
            "selector": "#search-input",
            "action": "sendKeys",
            "value": "search term"
        }
    ],
    "collections": [
        {
            "name": "title",
            "selector": "h1",
            "attribute": "textContent"
        },
        {
            "name": "price",
            "selector": ".price",
            "attribute": "textContent"
        }
    ]
}
```

### Configuration Options

#### Basic Settings
- **`url`** (string): The target website URL to scrape
- **`headless`** (boolean): 
  - `true`: Run browser in headless mode (no visible window)
  - `false`: Run browser with visible window (useful for debugging)

#### Pre-Scrape Actions
The `preScrapeActions` array defines actions to perform before data collection:

- **`selector`** (string): CSS selector to target the element
- **`action`** (string): Action to perform
  - `"click"`: Click the element
  - `"sendKeys"`: Type text into the element
- **`value`** (string): Text to type (only used with `"sendKeys"` action)

#### Data Collections
The `collections` array defines what data to extract:

- **`name`** (string): Key name for the extracted data
- **`selector`** (string): CSS selector to target the element
- **`attribute`** (string): HTML attribute to extract
  - Common attributes: `"textContent"`, `"innerHTML"`, `"href"`, `"src"`, `"value"`, `"aria-label"`, etc.

### Example Configurations

#### E-commerce Product Scraping
```json
{
    "url": "https://example-store.com/product/123",
    "headless": true,
    "preScrapeActions": [
        {
            "selector": "#accept-cookies",
            "action": "click",
            "value": ""
        }
    ],
    "collections": [
        {
            "name": "productName",
            "selector": ".product-title",
            "attribute": "textContent"
        },
        {
            "name": "price",
            "selector": ".price-current",
            "attribute": "textContent"
        },
        {
            "name": "availability",
            "selector": ".stock-status",
            "attribute": "textContent"
        },
        {
            "name": "imageUrl",
            "selector": ".product-image img",
            "attribute": "src"
        }
    ]
}
```

#### Form Interaction Example
```json
{
    "url": "https://example.com/search",
    "headless": false,
    "preScrapeActions": [
        {
            "selector": "#search-input",
            "action": "sendKeys",
            "value": "TypeScript tutorial"
        },
        {
            "selector": "#search-button",
            "action": "click",
            "value": ""
        }
    ],
    "collections": [
        {
            "name": "resultCount",
            "selector": ".results-count",
            "attribute": "textContent"
        },
        {
            "name": "firstResultTitle",
            "selector": ".search-result:first-child h3",
            "attribute": "textContent"
        }
    ]
}
```

## Running the Script

### Basic Usage
```bash
npm start
```

### Alternative Methods
```bash
# Using tsx directly
npx tsx src/index.ts

# Using ts-node
npx ts-node src/index.ts
```

## Output

The script will output the scraped data in JSON format to the console:

```json
Data Scraped:

{
  "productName": "Example Product",
  "price": "$29.99",
  "availability": "In Stock",
  "imageUrl": "https://example.com/image.jpg"
}
```

## Troubleshooting

### Common Issues

1. **Element not found errors**: 
   - Verify CSS selectors are correct
   - Check if elements load dynamically (may need to add waits)
   - Use browser developer tools to test selectors

2. **Timeout errors**:
   - Increase timeout values in the code if needed
   - Ensure the website loads completely before scraping

3. **Browser launch issues**:
   - Ensure Playwright browsers are installed: `npx playwright install`
   - Check system permissions for browser execution

### Debugging Tips

1. **Set `headless: false`** to see the browser in action
2. **Use browser developer tools** to test CSS selectors
3. **Add console.log statements** in the code for debugging
4. **Check network tab** for dynamic content loading

## Project Structure

```
dynamic-webscraper/
├── src/
│   └── index.ts          # Main scraping script
├── lib/
│   ├── playwrightManagment.ts  # Playwright browser operations
│   └── fileManagement.ts       # File I/O operations
├── utils/
│   └── config.json       # Configuration file
├── types.ts              # TypeScript type definitions
├── package.json          # Project dependencies
└── README.md            # This file
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

ISC License - see package.json for details

## Support

For issues and questions:
- Create an issue on GitHub: https://github.com/BenTechWizard/dynamic-webscraper/issues
- Check the troubleshooting section above
- Review the configuration examples
