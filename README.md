# Shreeya's Portfolio

This is a full-stack portfolio website for Shreeya, a software developer. The website showcases her skills, projects, education, and experience. It also includes an admin panel for managing the content of the portfolio.

## Technologies Used

*   **Frontend:**
    *   React
    *   React Router
    *   Tailwind CSS
    *   Axios
*   **Backend:**
    *   FastAPI
    *   MongoDB (with `motor`)
    *   Uvicorn
*   **Testing:**
    *   Requests (for API testing)

## File Structure

```
.
├── backend/            # FastAPI backend
│   ├── server.py       # Main FastAPI application
│   ├── requirements.txt  # Python dependencies
│   └── ...
├── frontend/           # React frontend
│   ├── src/            # Frontend source code
│   ├── package.json    # Node.js dependencies
│   └── ...
├── tests/              # Backend tests
└── README.md
```

## Backend Setup

1.  **Navigate to the backend directory:**
    ```bash
    cd backend
    ```

2.  **Create and activate a virtual environment (recommended):**
    ```bash
    python -m venv venv
    source venv/bin/activate  # On Windows, use `venv\Scripts\activate`
    ```

3.  **Install the dependencies:**
    > **Note:** The `requirements.txt` file is encoded in UTF-16LE. If you have issues with the command below, you may need to convert the file to UTF-8 first.
    ```bash
    pip install -r requirements.txt
    ```

4.  **Set up environment variables:**
    Create a `.env` file in the `backend` directory and add the following variables. You will need to have a MongoDB instance running.
    ```
    MONGO_URI=mongodb://localhost:27017/
    DB_NAME=portfolio
    JWT_SECRET=your_jwt_secret
    ```

5.  **Run the server:**
    ```bash
    uvicorn server:app --reload
    ```
    The backend server will be running at `http://localhost:8000`.

## Frontend Setup

1.  **Navigate to the frontend directory:**
    ```bash
    cd frontend
    ```

2.  **Install the dependencies:**
    This project uses `yarn` as the package manager.
    ```bash
    yarn install
    ```

3.  **Run the development server:**
    ```bash
    yarn start
    ```
    The frontend development server will be running at `http://localhost:3000`.

## Running Tests

The backend tests are located in `backend_test.py` and use the `requests` library to test the API endpoints.

1.  **Ensure the backend server is running.** (See [Backend Setup](#backend-setup))

2.  **Set up the frontend environment:**
    The test script reads the backend URL from the frontend's `.env` file.
    *   Navigate to the `frontend` directory: `cd frontend`
    *   Create a `.env` file if it doesn't exist.
    *   Add the following line to the `.env` file:
        ```
        REACT_APP_BACKEND_URL=http://localhost:8000
        ```

3.  **Run the test script:**
    From the root directory of the project, run the following command:
    ```bash
    python backend_test.py
    ```
