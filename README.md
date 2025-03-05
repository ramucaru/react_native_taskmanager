# React Native Expo Application

## Overview

This is a React Native application built using Expo that integrates JWT token-based authentication and task management functionality.
The app features a file-based navigation system with different pages for user authentication (login, signup, forget password) and 
task management (create, view, edit, and delete tasks). It also incorporates JWT token storage with AsyncStorage,
providing a smooth user experience and session management.

## Prerequisites

To run this project, you will need the following:

- Node.js (LTS version recommended)
- npm (Node Package Manager)
- Expo CLI installed
- Android or iOS simulator (or physical device) for testing

## Setup Instructions

### 1. Install Dependencies

Before running the app, install the necessary dependencies by executing the following command in your terminal:

```bash
npm install
Running the App : 
npm run android
npm run ios
npm run web


JWT Token-Based Navigation : If a token is found, the app navigates to the Home Page. else , the app navigates to the Login Page.
