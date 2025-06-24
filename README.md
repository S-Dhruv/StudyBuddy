StudyBuddy - AI Study planner leverages Langchain, an AI framework, to use Mistral AI models.

## Setup

1. Clone the repository:

Fork the repository and clone it, if you wish to make any changes to it.

2. Install the Node.js dependencies:

```bash
npm install
```

3. Copy the `.env.example` file to `.env` and update the values:

```bash
cp .env.example .env
```

Update the values of PORT, MONGODB_URI, MISTRAL_API_KEY and JWT_SECRET in the .env file.
You can find a free api key on mistral's official website [[https://console.mistral.ai/api-keys]]
You can find the mongoDB's URI either on compass or atlas

## Usage

1. go to the backend folder

```bash
cd backend
npm start # for nodemon
npm run dev
```

2. go to the frontend folder

```bash
cd frontend
npm install # just to ensure no issues
npm run dev
```

Open both the folders in different terminals to avoid confusion.
