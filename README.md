# React Airport Search App

A responsive web application that allows users to search for airports by name, filter by country and timezone, and view details about each airport. The app leverages the Airports API (from API Ninjas) to fetch data and provides an intuitive interface for searching and exploring airport information.

## Features

- **Search Functionality:** Search for airports by name, country, or timezone.
- **Filtering:** Easily filter airports based on country and timezone.
- **Responsive Design:**  The app adapts seamlessly to different screen sizes (desktop, tablet, mobile).
- **Airport Details:** View detailed information about each airport, including:
    - Name
    - City
    - Country
    - Timezone
    - Latitude and Longitude
    - Elevation
- **Load More:**  Fetch additional airports as needed with the "Load More" button (infinite scrolling).
- **Error Handling:** Provides user-friendly error messages in case of API issues.
- **Form Validation:** Uses React Hook Form for input validation and error handling.

## Technologies Used

- **React:** Frontend library for building the user interface.
- **TypeScript:** A superset of JavaScript that adds static types for improved code quality and maintainability.
- **Bootstrap CSS:** A popular CSS framework for responsive and visually appealing design.
- **React Hook Form:** A library for form handling and validation.
- **axios:** A library for making HTTP requests to the Airports API.
- **API Ninjas Airports API:** The data source for airport information.

## Installation

1. **Prerequisites:**
   - Node.js (version 14 or higher):  Download and install from [https://nodejs.org/](https://nodejs.org/)
   - npm (or yarn): Usually comes bundled with Node.js.

2. **Clone the repository:**
   ```bash
   git clone https://github.com/HariKrishna-9885699666/airport-api-react-vite-ts.git
   cd airport-api-react-vite-ts
   npm install
   npm run dev
