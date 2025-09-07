pipeline {
    agent any
    tools {
        nodejs 'nodejs-24'
    }
    stages {
        stage ('VM Node Version') {
            steps {
                sh 'node -v'
                sh 'npm -v'
            }
        }
    }
}