export const scaleFactor = 4;

export const dialogueTree = {
    start: {
        text: "Welcome to Fabricio Guacuto's portfolio site! What would you like to know about?",
        options: [
            { text: "About Fabricio", next: "about" },
            { text: "Projects", next: "projects" },
            { text: "Skills", next: "skills" },
            { text: "Contact", next: "contact" }
        ]
    },

    about: {
        text: "Fabricio is a passionate Full Stack Developer who thrives on solving complex problems and building scalable applications. With strong backend skills and experience in cloud technologies, he is always eager to learn and grow. His discipline and dedication drive him to create impactful software.",
        options: [
            { text: "Projects", next: "projects" },
            { text: "Skills", next: "skills" },
            { text: "Contact", next: "contact" }
        ]
    },

    skills: {
        text:"Fabricio is experienced with JavaScript, Node.js, React, Express, MongoDB, Spring, PostgreSQL, and AWS (with experience in S3, EC2 and DynamoDB), as well as Java and GraphQL.",
        options: [
            { text: "About Fabricio", next: "about" },
            { text: "Projects", next: "projects" },
            { text: "Contact", next: "contact" }]
    },

    contact: {
        text: "You can reach out to Fabricio via phone at (689)-271-8823 or email at guacutofabricio@gmail.com. For more information, check out Fabricio's LinkedIn and GitHub.",
        options: [
            { text: "LinkedIn", link: "https://www.linkedin.com/in/fabricio-guacuto/" },
            { text: "GitHub", link: "https://github.com/fabricioGuac" },
            { text: "Back", next: "start" },
        ]
    },

    projects: {
        text: "There are a list of projects to know about, wich one would you like to learn?",
        options: [
            { text: "Back", next: "start" },
            { text: "Tumorido fittrack", next: "tumorido" },
            { text: "Book api refactor to GraphQL", next: "bookGraphQL" },
            { text: "nosql social network api", next: "nosqlSocialApi" },
            { text: "orm-e-commerce-site", next: "ormEcommerce" },
            { text: "AWS thought", next: "awsThought" },
        ]
    },


    tumorido: {
        text:"Tumorido is a full-stack fitness tracking app built using the MERN stack. The app helps users monitor their fitness activities and track progress through a sleek, mobile-friendly interface. It uses GraphQL for data management and JWT for user authentication. The app is Dockerized for seamless deployment. **Note:** The app may take a few moments to boot up as it is hosted on a free-tier service.",
        options: [
            { text: "GitHub Repository", link: "https://github.com/fabricioGuac/tumorido-fittrack" },
            { text: "Deployed App", link: "https://tumorido-fittrack-docker.onrender.com/" },
            { text: "Back to Projects", next: "projects" }
        ]
    },

    bookGraphQL: {
        text:"This project refactors an existing book list application to replace the RESTful API with GraphQL, enhancing flexibility and scalability. By improving the structure and maintainability of the backend, the app is now more efficient and better equipped to handle future growth. **Note:** The app may take a few moments to boot up as it is hosted on a free-tier service.",
        options: [
            { text: "GitHub Repository", link: "https://github.com/fabricioGuac/book-api-refactor-graphql" },
            { text: "Deployed App", link: "https://book-api-refactor-graphql.onrender.com/" },
            { text: "Back to Projects", next: "projects" }
        ]
    },

    nosqlSocialApi: {
        text:"This API supports a social network app, allowing users to share thoughts, react to others, and manage friends. Built with Express.js, MongoDB, and Mongoose, it provides a scalable backend solution for social networking features.",
        options: [
            { text: "GitHub Repository", link: "https://github.com/fabricioGuac/nosql-social-network-api" },
            { text: "Walkthrough video", link: "https://drive.google.com/file/d/1y4JD8M9ZoaqFnso3jXvrEMlbLEqJLr_y/view" },
            { text: "Back to Projects", next: "projects" }
        ]
    },

    ormEcommerce: {
        text:"This project builds the backend for an e-commerce platform using Express.js and PostgreSQL, with Sequelize as the ORM. It provides a scalable API to manage products, categories, and orders, enabling businesses to compete in the e-commerce space.",
        options: [
            { text: "GitHub Repository", link: "https://github.com/fabricioGuac/orm-e-commerce-site" },
            { text: "Walkthrough video", link: "https://drive.google.com/file/d/1U4vfXULyqnToAuesidZFPH3-Im4-agKF/view" },
            { text: "Back to Projects", next: "projects" }
        ]
    },

    awsThought: {
        text:"This project refactors the Deep Thoughts MERN application to leverage AWS services for scalability and performance. DynamoDB replaces MongoDB for a serverless NoSQL database, S3 handles static asset storage, and EC2 hosts the backend and frontend. These cloud-native improvements enhance reliability, reduce operational complexity, and enable future scalability. **Note:** This project is not currently deployed due to cost constraints.",
        options: [
            { text: "GitHub Repository", link: "https://github.com/fabricioGuac/aws-thought" },
            { text: "Back to Projects", next: "projects" }
        ]
    },

};