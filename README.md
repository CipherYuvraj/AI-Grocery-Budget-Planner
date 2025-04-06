# AI Grocery Budget Planner

![AI Grocery Budget Planner Logo](/screenshots/image.png)

Welcome to the **AI Grocery Budget Planner**, a smart web application that helps you create grocery lists, manage your budget, and plan meals with the power of artificial intelligence. Built with React for the frontend and a Node.js backend integrated with the Groq API, this project combines user-friendly design with advanced AI capabilities to optimize your grocery shopping experience.

## Table of Contents
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
  - [Prerequisites](#prerequisites)
  - [Clone the Repository](#clone-the-repository)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
- [Usage](#usage)
- [Screenshots](#screenshots)
- [Deployed Links](#deployed-links)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Features
- **AI-Powered Suggestions**: Get personalized grocery lists and meal plans based on your budget and dietary preferences using the Groq API.
- **Budget Tracker**: Visualize your spending with an interactive budget tracker.
- **Meal Planning**: Generate weekly meal plans with breakfast, lunch, and dinner options.
- **Replacement Suggestions**: Find cheaper or healthier alternatives for grocery items.
- **User-Friendly Interface**: Responsive design with a clean, modern look using Tailwind CSS.
- **Manual Additions**: Add custom items to your grocery list with ease.

## Tech Stack
- **Frontend**: React, Vite, Tailwind CSS
- **Backend**: Node.js, Express, Groq API
- **Deployment**: Render
- **Other Tools**: npm, Git, GitHub

## Installation

### Prerequisites
- Node.js (v20 or later recommended)
- npm (comes with Node.js)
- Git (for cloning the repository)

### Clone the Repository
```bash
git clone https://github.com/CipherYuvraj/AI-Grocery-Budget-Planner.git
cd AI-Grocery-Budget-Planner
```

### Backend Setup
Navigate to the backend directory:
```bash
cd backend
```

Install dependencies:
```bash
npm install
```

Set up environment variables:
1. Create a `.env` file in the backend directory.
2. Add your Groq API key:
```
GROQ_API_KEY=your_groq_api_key_here
GROQ_API_URL=https://api.groq.com
```

Start the backend:
```bash
npm start
```

### Frontend Setup
Navigate to the frontend directory:
```bash
cd frontend
```

Install dependencies:
```bash
npm install
```

Start the development server:
```bash
npm run dev
```

Build for production (optional):
```bash
npm run build
```

Serve the production build locally:
```bash
npm run start
```

## Usage
1. Open your browser and go to https://ai-grocery-budget-planner-1.onrender.com (or the port specified by npm run dev).
2. Enter your budget and dietary preferences in the input form.
3. View AI-generated grocery lists, meal plans, or replacement suggestions.
4. Add custom items manually and track your budget usage.
5. For production, deploy to Render (see Deployed Links section).

## Screenshots

![Home Page](/screenshots/image2.png)
![Grocery List](/screenshots/image3.png)
![Budget Tracker](/screenshots/image4.png)


## Deployed Links
Check out the live versions of your project!

- Frontend: https://ai-grocery-budget-planner-1.onrender.com
- Backend API: https://ai-grocery-budget-planner.onrender.com

## Contributing
We welcome contributions! Here's how you can help:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes and commit them (`git commit -m "Add new feature"`).
4. Push to the branch (`git push origin feature-branch`).
5. Open a Pull Request.

## License
This project is licensed under the MIT License. See the LICENSE file for details.

## Contact
- Author: [Your Name] (ronak41924@example.com)
- GitHub: [CipherYuvraj](https://github.com/CipherYuvraj)
- Issues: Report bugs or suggest features [here](https://github.com/CipherYuvraj/AI-Grocery-Budget-Planner/issues)