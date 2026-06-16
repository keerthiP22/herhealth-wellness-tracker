# HerHealth 🌸

A cloud-based wellness tracking platform that helps users track mood, sleep, stress, pain levels, symptoms, and menstrual cycle phases while generating personalized wellness insights.

## Overview

HerHealth is a full-stack wellness tracking application built using React and AWS serverless services. Users can log daily wellness data, view historical trends, analyze symptom patterns, and receive personalized insights based on their wellness history.

## Features

### Wellness Tracking

* Track daily mood
* Monitor sleep hours
* Record stress levels
* Track pain levels
* Log symptoms
* Track cycle phases

### History Management

* View wellness history
* Edit existing logs
* Delete wellness entries
* Persistent cloud storage

### Dashboard Analytics

* Average Sleep Analysis
* Average Stress Analysis
* Average Pain Analysis
* Total Wellness Logs
* Most Common Symptoms
* Wellness Trends

### Personalized Insights

* Sleep vs Stress correlations
* Stress vs Pain pattern detection
* Symptom frequency analysis
* Cycle phase observations
* Wellness trend recommendations

## Tech Stack

### Frontend

* React
* TypeScript
* Tailwind CSS
* Recharts
* React Router

### Backend

* AWS Lambda
* Amazon API Gateway
* Amazon DynamoDB

### Cloud Architecture

User
↓
React Frontend
↓
API Gateway
↓
AWS Lambda
↓
DynamoDB

## AWS Services Used

### Amazon API Gateway

Handles all HTTP requests from the frontend.

### AWS Lambda

Processes Create, Read, Update, and Delete operations.

### Amazon DynamoDB

Stores wellness logs and user wellness data.

## CRUD Operations

* Create Wellness Entry
* Read Wellness History
* Update Existing Entry
* Delete Wellness Entry

## Dashboard Metrics

* Average Sleep
* Average Stress
* Average Pain
* Total Logs
* Most Common Symptom
* Personalized Wellness Insights

## Future Enhancements

* User Authentication
* Wellness Score Prediction
* Cycle Prediction
* Notifications & Reminders
* AI-powered Recommendations
* Export Wellness Reports

## Learning Outcomes

This project demonstrates:

* Full-stack application development
* AWS serverless architecture
* REST API development
* Cloud database integration
* React state management
* Data visualization
* Analytics dashboard design

## Author

Keerthi Prada
