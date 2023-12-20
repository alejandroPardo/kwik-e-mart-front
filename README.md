# Cash Register Frontend

## Overview

This is a simple React application that calls the main technical interview challenge backend. It helps explain and visualize how the API-first application works.
For that backend, please refer to https://github.com/alejandroPardo/kwik-e-mart

## Technologies Utilized

- React
- Bootstrap

## Requirements

Please, refer to the specific versions mentioned in the `package.json` for specific versions.

## Local Development Setup

1. **Clone the project:**

```bash
git clone git@github.com:alejandroPardo/kwik-e-mart-front.git
```

2. **Install Dependencies:**

```bash
npm install
```

3. **Initialize .env file:**

The app must have the backend url defined in the .env file as follows.

```bash
REACT_APP_BACKEND_URL=http://localhost:3000
```

4. **Start the Server:**

```bash
npm start
```

4. **Dockerized Application:**

I also added a DockerFile for easily deployment of it. Just run:

```bash
sudo docker build -t cart .
sudo docker run -p 3333:80 cart
```

and the application should be started on port 3333. Remember to add the .env file before building the docker container

6. **Access the Web App at:** [http://localhost:3000/api-docs/index.html](http://localhost:3000/api-docs/index.html)

## Deployed Version

### Live Link

- [Web App Live Link](https://cart.alejandropardo.dev/)
- [OpenAPI specification](https://cart-back.alejandropardo.dev/)

## Improvements

- This frontend by no means aims to be perfect. It is just an interface of the API first backend.
- Tests should be added to assert that everything works as expected
- Field validation, because I'm expecting correct data, I'm not throwing errors when things go bad.
- Alerts and notifications. Not enough feedback now, needs to be improved
- User handling and security for different roles
- Invoices exploration, now I just show the ones created.
