# Rocapply Web Scraper

This project is a web scraper designed to extract data from the Rocapply website. Built with TypeScript and Express, it provides an API for scraping relevant content.

## Table of Contents

- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the Project](#running-the-project)
- [Endpoints](#endpoints)
- [Interface](#interface)
- [Technologies Used](#technologies-used)
- [Contributing](#contributing)
- [License](#license)

## Features

- Web scraping using Cheerio
- API for scraping and retrieving data
- Built with modern TypeScript features
- Lightweight and easy to set up

## Getting Started

### Prerequisites

- Node.js (version 16 or later)
- npm or yarn
- TypeScript installed globally (optional)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/unnamed-lab/rocapply-scraper.git
   ```
2. Navigate to the project directory:
   ```bash
   cd rocapply-scraper
   ```
3. Install dependencies:
   ```bash
   pnpm install
   ```

### Running the Project

#### Development Mode

To run the project in development mode:

```bash
pnpm start
```

#### Build and Serve

1. Build the project:
   ```bash
   pnpm run build
   ```
2. Serve the production build:
   ```bash
   pnpm run serve
   ```

#### Access the API

The server runs on `http://localhost:3000` by default. You can access it using the provided endpoints.

## Endpoints

### POST /scrape

- **Description**: Scrapes data from the Rocapply website based on the provided input.
- **Request Body**: JSON object with parameters for scraping.
- **Response**: JSON object containing the scraped data or an error message.

Example:

```bash
POST http://localhost:3000/scrape
Content-Type: application/json

{
  "url": "https://example.com"
}
```

## Interface

This section describes the interfaces and types used for the scraped data, providing a clear structure for managing university and program information.

### Types and Interfaces

#### TContent

Represents a reusable type for textual content with a title and description.

```typescript
type TContent = {
  title: string;
  desc: string;
};
```

#### TableRow

Represents a single row in a table with dynamic keys and string values.

```typescript
type TableRow = {
  [key: string]: string;
};
```

#### UniversityItem

Defines the structure for university-related information.

```typescript
interface UniversityItem {
  school: TContent;
  country: TContent;
  city: TContent;
}
```

#### ProgramItem

Defines the structure for program-related information.

```typescript
interface ProgramItem {
  title: string;
  university: string;
  details: Record<string, string>;
}
```

#### ScrapedData

Combines university and program information into a single structure.

```typescript
interface ScrapedData {
  university: UniversityItem;
  program: ProgramItem;
}
```

### Example Usage

#### Example 1: Representing a University

```typescript
const exampleUniversity: UniversityItem = {
  school: {
    title: "Mozarteum University Salzburg",
    desc: "A prestigious university in Salzburg known for its arts and music programs.",
  },
  country: {
    title: "Austria",
    desc: "Located in Central Europe, Austria is known for its cultural heritage.",
  },
  city: {
    title: "Salzburg",
    desc: "A picturesque city famous for its baroque architecture and musical history.",
  },
};
```

#### Example 2: Representing a Program

```typescript
const exampleProgram: ProgramItem = {
  title: "Master's in Applied Theatre: Artistic Theater Practice & Society",
  university: "Mozarteum University Salzburg",
  details: {
    Degree: "Master's in Applied Theatre",
    "Program Language": "English or German",
    "Admission Semester": "Fall (October), Spring (March)",
    "Start Date": "May Intake",
    "Program Duration": "4 semesters",
  },
};
```

#### Example 3: Representing Scraped Data

```typescript
const exampleData: ScrapedData = {
  university: exampleUniversity,
  program: exampleProgram,
};
```

## Live Server

The API is also hosted at [https://rocapply-scraper.onrender.com](https://rocapply-scraper.onrender.com).

## Technologies Used

- **TypeScript**: For static typing and enhanced development experience.
- **Express**: For building the API server.
- **Cheerio**: For web scraping.

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Commit your changes.
4. Push to your forked repository and submit a pull request.

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.
