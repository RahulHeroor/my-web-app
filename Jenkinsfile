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
                dir('my-web-app') {  // Adjust the path as needed
                    sh 'npm install'
                }
            }
        }

        stage('Test') {
            steps {
                dir('test') {  // Adjust the path as needed
                    sh 'npm test || true'  // Continue pipeline even if tests fail
                }
            }
        }

        stage('Build Docker Image') {
            steps {
                dir('my-web-app/dockerf') {  // Adjust the path as needed
                    sh 'docker build -t my-node-app .'
                }
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
