pipeline {
    agent any
    tools {
        nodejs 'nodejs-24'
    }
    stages {
        stage ('Install Dependencies') {
            steps {
                sh 'npm install --no-audit'
            }
        }
        stage ('Dependency Scanning') {
            parallel {
                stage ('NPM Dependency Audit') {
                    steps {
                        sh '''
                            npm audit --audit-level=crirtical
                            echo $?
                        '''
                    }
                }
                stage ('OWASP Dependency Check') {
                    steps {
                        dependencyCheck additionalArguments: '''
                            --scan ./
                            --out ./
                            --format ALL
                            --prettyPrint''', odcInstallation: 'OWASP-DepCheck-12'
                            
                        dependencyCheckPublisher failedTotalCritical: 4, pattern: 'dependency-check-junit.xml', stopBuild: true, unstableTotalCritical: 2
                    }
                }

            }
        }
        // stage ('Unit Testing') {
        //     steps {
        //         sh 'npm test'
        //     }
        // }
        // stage ('Deploy Application') {
        //     steps {
        //         sh 'npm start'
        //     }
        // }
    }
}