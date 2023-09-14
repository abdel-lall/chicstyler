# ChicStyler

[ChicStyler Link](https://www.chicstyler.store)


Welcome to ChicStyler, a demo e-commerce website that offers a wide range of clothing products. ChicStyler is designed and built using a microservices architecture, providing a scalable and efficient solution for selling clothing online.

## Table of Contents

- [Overview](#overview)
- [Microservices Architecture](#microservices-architecture)
- [Technologies Used](#technologies-used)
- [Deployment](#deployment)
- [Continuous Integration and Deployment (CI/CD)](#continuous-integration-and-deployment-cicd)

## Overview

ChicStyler is a modern e-commerce website where users can browse, search for, and purchase clothing items. It is built with a microservices architecture to ensure scalability, resilience, and maintainability. Each service runs within a Docker container, and Kubernetes is used for orchestration. The Kubernetes cluster is hosted on DigitalOcean, and an Ingress controller is set up for routing incoming traffic to the appropriate services.

## Microservices Architecture

ChicStyler is divided into several microservices:

1. **Client Service**: The front-end of the website is built using Next.js. It provides a user-friendly interface for customers to view and purchase clothing items. It incorporates Sass for styling, Framer Motion for animations, and state management using Redux and Redux Toolkit.

2.**Auth Service**: ChicStyler employs a robust authentication service to securely manage user authentication using JSON Web Tokens (JWT). This service ensures that user data and transactions are protected and provides a seamless login and authorization experience.
3.
4. **Products Service**: This service handles all aspects related to products. It is built with TypeScript and utilizes MongoDB as the database. Express is used for the API, and Express Validator ensures data integrity.

5. **Order Service**: The order service is responsible for managing customer orders. It is built with TypeScript and MongoDB and provides endpoints for creating and tracking orders.

6. **Payment Service**: Still in development.

Each of these services runs independently within a Docker container, allowing for scaling and updates without affecting the entire application.

## Technologies Used

- **Front-end**: Next.js, React, Sass, Framer Motion, Redux, Redux Toolkit
- **Back-end**: TypeScript, Node.js, Express, Express Validator
- **Database**: MongoDB
- **Message Broker**: NATS Streaming Server
- **Containerization**: Docker
- **Orchestration**: Kubernetes
- **Cloud Hosting**: DigitalOcean
- **CI/CD**: GitHub Actions

## Deployment

ChicStyler is deployed using Kubernetes on a DigitalOcean cluster. Each microservice runs as a deployment within the cluster, ensuring high availability and reliability. An Ingress controller is set up to route traffic from the internet to the appropriate services based on domain and path routing.

## Continuous Integration and Deployment (CI/CD)

We use GitHub Actions for our CI/CD pipeline. Whenever changes are pushed to the GitHub repository, the CI/CD process is triggered. It includes steps for building, testing, and deploying the microservices to the Kubernetes cluster. This automated pipeline ensures that our application is continuously delivered with high quality.

Thank you for exploring ChicStyler! If you have any questions or feedback, please feel free to reach out to me.

## Screenshots

![Screenshot 2023-09-14 125446](https://github.com/abdel-lall/chicstyler/assets/49083865/6af3f562-4a93-492b-a3f8-fbf988c4adff)

![Screenshot 2023-09-14 125527](https://github.com/abdel-lall/chicstyler/assets/49083865/1118cd63-eda8-4d7f-b572-c915be7a1fb7)

![Screenshot 2023-09-14 125644](https://github.com/abdel-lall/chicstyler/assets/49083865/acf45ec1-6a3d-4ad8-a041-4d3ef7384a04)

![Screenshot 2023-09-14 125724](https://github.com/abdel-lall/chicstyler/assets/49083865/05caafc3-92bc-4ec8-9799-70dd4fb06e34)



