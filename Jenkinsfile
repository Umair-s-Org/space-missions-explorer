pipeline {
    agent any
    tools {
        nodejs 'nodejs-24'
    }
    stages {
        stage ('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }
        stage ('Unit Testing') {
            steps {
                sh 'npm test'
            }
        }
        stage ('Deploy Application') {
            steps {
                sh 'npm start'
            }
        }
    }
}