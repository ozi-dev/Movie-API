# Movie-API


# Movie Details API

This is a simple Express.js API that retrieves movie details from a database or an external API. It uses MongoDB for data storage and Axios for making HTTP requests.

## Getting Started

To get started with the API, follow the steps below:

### Prerequisites

- Node.js installed on your machine
- MongoDB database
- API key for the movie data source (update the `.env` file)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/movie-details-api.git
   ```

2. Navigate to the project directory:

   ```bash
   cd movie-details-api
   ```

3. Install the dependencies:

   ```bash
   npm install
   ```

4. Configure the environment variables:

   - Rename the `.env.example` file to `.env`.
   - Update the `MONGO_DB_URI` variable with your MongoDB connection URI.
   - Update the `PORT` variable with the desired port number for the API.
   - Update the `url`, `method`, `maxBodyLength`, and `headers` variables with the appropriate values for your movie data source API.

### Usage

1. Start the server:

   ```bash
   npm start
   ```

2. Access the API:

   - Open your browser or a tool like Postman.
   - Make GET requests to `http://localhost:{PORT}/api/details/:id` where `:id` is the movie ID you want to retrieve details for.

   Example: `http://localhost:3000/api/details/1`

   The API will first check if the movie details exist in the database. If found, it will return the details directly. Otherwise, it will fetch the data from the external API, store it in the database, and then return the details.
