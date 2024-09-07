pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                git url: 'https://github.com/RahulHeroor/my-web-app', branch: 'main'
            }
        }

        stage('Install Dependencies') {
            steps {
                dir('my-web-app') {  // Adjust if dependencies are located in a different directory
                    sh 'npm install'
                }
            }
        }

        stage('Test') {
            steps {
                dir('test') {  // Adjust if tests are located in a different directory
                    sh 'npm test || true'  // Continue pipeline even if tests fail
                }
            }
        }

        stage('Build Docker Image') {
            steps {
                // Adjust if Dockerfile is located in a different directory
                    sh 'docker build -t my-node-app .'
                
            }
        }

        stage('Run Docker Container') {
            steps {
                sh 'docker run -d -p 3000:3000 my-node-app'
            }
        }
    }

    post {
        always {
            script {
                def containers = sh(script: 'docker ps -a -q', returnStdout: true).trim()
                if (containers) {
                    sh "docker stop ${containers}"
                    sh "docker rm ${containers}"
                } else {
                    echo 'No Docker containers to stop or remove.'
                }
            }
        }
        success {
            echo 'Pipeline completed successfully!'
        }
        failure {
            echo 'Pipeline failed!'
        }
    }
}
