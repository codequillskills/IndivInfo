# IndivInfo

- IndivInfo is a web application built using React.js, Node.js, Express, and MongoDB. It allows users to manage their contacts and projects efficiently.

## Table of Contents

- [Features](#features)
- [Requirements](#requirements)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Features

- Manage contacts with details like name, phone number, email, and description and their respective tags (like family, friends, college, etc.).
- Track projects with details like clientDetails (refered from contacts), project name, description, startDate, status, personsInvolved, paymentStatus, paymentReceived, paymentDue, and paymentDistributionStatus.

## Requirements

- Node.js
- MongoDB
- Github

## Installation

- Clone the repository using `git clone https://github.com/codequillskills/IndivInfo.git`
- Navigate to the project directory using `cd IndivInfo`
    - Ensure to update the `.env` file with the correct details for both (client and server).
    - Frontend: `cd client`
        - Install dependencies using `npm install`
        - Start the frontend server using `npm run dev`
    - Backend: `cd server`
        - Install dependencies using `npm install`
        - Start the server using `npm start`

## Usage

- Open your browser and navigate to `http://localhost:5173` to access the application.
- Register and Login to manage your contacts and projects.
- Add, Edit, Delete contacts and projects as per your requirements.

## Contributing

- Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

## License

- This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
