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

                        dependencyCheckPublisher failedTotalCritical: 2, pattern: 'dependency-check-report.xml', stopBuild: true, unstableTotalCritical: 2

                        publishHTML([allowMissing: true, alwaysLinkToLastBuild: true, icon: '', keepAll: true, reportDir: './', reportFiles: 'dependency-check-jenkins.html', reportName: 'Dependency Check HTML Report', reportTitles: '', useWrapperFileDirectly: true])
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