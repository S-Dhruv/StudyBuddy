📚 StudBud – Your AI-Powered Study Planner
StudBud is an intelligent study planning tool built with LangChain and powered by the Mistral API. It helps students and learners create personalized study schedules based on task difficulty, estimated time, and deadlines. StudBud dynamically prioritizes tasks using smart AI logic and adapts in real-time based on your progress — whether you miss a task or finish early.

✨ Key Features:
Generate custom study plans with AI

Prioritize tasks based on urgency and difficulty

Real-time schedule adjustments

Simple, intuitive interface to keep you on track

🧠 Workflow
1. User Input Collection
The user provides the following details for each task:
- Task Name
- Estimated Time to Complete
- Difficulty Level (Easy, Medium, Hard)
- Deadline (Date/Time)

2. Task Prioritization Logic
Using LangChain and the Mistral API, StudBud analyzes all tasks and:

- Scores them based on a combination of urgency (how close the deadline is) and difficulty.
- Balances challenging and easy tasks to avoid burnout.

3. Schedule Generation

- Based on available hours and user preferences, StudBud:
- Creates a daily/weekly study schedule.
- Ensures even distribution of workload, respecting time constraints and priorities.

4. Dynamic Updates

- If a task is missed or completed early, StudBud intelligently reshuffles the remaining tasks.
 
- Keeps the plan updated in real-time without losing focus on deadlines.

5. User-Friendly Output

- Displays the plan in a clean, structured format.

- Allows users to track and adjust their schedule easily.

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
