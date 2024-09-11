# Would You Rather App

Welcome to the **Would You Rather App**! This is a simple yet engaging web application that allows users to answer and create "Would You Rather" questions. The app is built with React and Redux, providing a seamless user experience for answering, creating, and viewing questions, as well as tracking user scores.

## Table of Contents
- [Project Overview](#project-overview)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)

## Project Overview

The **Would You Rather App** is a part of the Udacity React Nanodegree program. It demonstrates the use of React for building user interfaces and Redux for state management. Users can log in, answer questions, create new ones, and view a leaderboard that ranks users based on their activity.

## Features

- **User Authentication:** Users can log in to the app using a list of predefined users.
- **Answer Questions:** Choose between two options for each question.
- **Create Questions:** Pose your own "Would You Rather" questions to the community.
- **Leaderboard:** See the ranking of users based on the number of questions answered and created.

## Installation

To get started with the project, follow these steps:

1. **Clone the Repository:**
```bash
   git clone https://github.com/Butanska/would-you-rather-app.git
   cd would-you-rather-app  
```

#### Important: 
Ensure you have Node.js and npm installed. Since the project was set up with lockfileVersion@3, it is recommended to use Node.js 16.x (which comes with npm 7 or later) for better stability and support for the latest features.  

Steps to Switch Node.js version:  
If you're using nvm (Node Version Manager), you can switch to a compatible version by running:

```bash
    nvm install 16.20.2
    nvm use 16.20.2
``` 

2. **Install Dependencies: Make sure you have Node.js installed, then run:**

```bash
    npm install  
```

3. **Run the Application: To start the app locally, use:**

```bash
    npm start  
```
This will launch the app in your default web browser at http://localhost:3000.

## Usage

Once the app is running, you can:

* Log in using one of the predefined users.
* Browse questions and choose between the options presented.
* Create your own questions for others to answer.
* View the leaderboard to see the top users.