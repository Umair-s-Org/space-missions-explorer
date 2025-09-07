pipeline {
    agent any
    tools {
        nodejs 'nodejs-24'
    }
    stages {
        stage ('VM Node Version') {
            steps {
                sh 'echo Just Checking if Webhook Works'
                sh 'node -v'
                sh 'npm -v'
            }
        }
    }
}