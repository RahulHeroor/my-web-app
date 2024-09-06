pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                // Clone the Git repository
                git url: 'https://github.com/RahulHeroor/my-web-app', branch: 'main'
            }
        }

        stage('Install Dependencies') {
            steps {
                // Install dependencies
                sh 'npm install'
            }
        }

        stage('Test') {
            steps {
                // Run tests
                sh 'npm test'
            }
        }

        stage('Build Docker Image') {
            steps {
                // Build a Docker image for the app
                sh 'docker build -t my-node-app .'
            }
        }

        stage('Run Docker Container') {
            steps {
                // Run the Docker container
                sh 'docker run -d -p 3000:3000 my-node-app'
            }
        }
    }

    post {
        always {
            // Clean up containers after build
            sh 'docker stop $(docker ps -a -q) || true'
            sh 'docker rm $(docker ps -a -q) || true'
        }
        success {
            // Notify success
            echo 'Pipeline completed successfully!'
        }
        failure {
            // Notify failure
            echo 'Pipeline failed!'
        }
    }
}
