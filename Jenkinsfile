pipeline {
    agent any
    tools {
        nodejs 'nodejs-24'
    }
    environment {
        MONGO_URI = "mongodb://admin:secret@localhost:27017/mydb?authSource=admin"
        MONGO_DB_CREDS = credentials('Mongo-DB-Credentials')
        MONGO_USERNAME = "${MONGO_DB_CREDS_USR}"  // As the app needs environmental variable MONGO_USERNAME instead of MONGO_DB_CREDS_USR which will be created by the above 
        MONGO_PASSWORD = "${MONGO_DB_CREDS_PSW}"  // As the app needs environmental variable MONGO_PASSWORD instead of MONGO_DB_CREDS_PSW which will be created by the MONGO_DB_CREDS
        SONAR_SCANNER_HOME = tool 'sonarqube-scanner-720'
    }

    stages {
        stage ('Install Dependencies') {
            steps {
                sh 'npm install --no-audit'
                sh 'node seed.js' //Add data into DB
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
                            --disableYarnAudit
                            --prettyPrint''', odcInstallation: 'OWASP-DepCheck-12'

                        dependencyCheckPublisher failedTotalCritical: 2, pattern: 'dependency-check-report.xml', stopBuild: true, unstableTotalCritical: 2

                        junit allowEmptyResults: true, keepProperties: true, testResults: 'dependency-check-junit.xml'

                        publishHTML([allowMissing: true, alwaysLinkToLastBuild: true, icon: '', keepAll: true, reportDir: './', reportFiles: 'dependency-check-jenkins.html', reportName: 'Dependency Check HTML Report', reportTitles: '', useWrapperFileDirectly: true])
                    }
                }

            }
        }
        stage ('Unit Testing') {
            steps {
                sh 'npm test'
            }
        }
        stage ('Code Coverage') {
            steps {
                catchError(buildResult: 'SUCCESS', message: 'Code Coverage below threshold. Will be fixed soon!', stageResult: 'UNSTABLE') {
                    sh 'npm run coverage'
                    }
                
            }
        }
        stage ('SAST - SonarQube') {
            steps {
                timeout(time: 120, unit: 'SECONDS') {
                    withSonarQubeEnv('sonar-qube-server') {
                        sh 'echo $SONAR_SCANNER_HOME'
                        sh '''
                        $SONAR_SCANNER_HOME/bin/sonar-scanner \
                            -Dsonar.projectKey=Solar-System-Project \
                            -Dsonar.sources=app.js \
                            -Dsonar.javascript.lcov.reportPaths=./coverage/lcov.info 
                        '''
                    }
                    // waitForQualityGate abortPipeline: true
                }
                
            }
        }
        stage ('Build Docker Image') {
            steps {
                sh 'docker build -t umair112/solar-system:$GIT_COMMIT .'
            }
        }
        // stage ('Deploy Application') {
        //     steps {
        //         sh 'npm start'
        //     }
        // }
    }
    post {
        always {
            junit allowEmptyResults: true, keepProperties: true, testResults: 'test-results.xml'
            publishHTML([allowMissing: true, alwaysLinkToLastBuild: true, icon: '', keepAll: true, reportDir: './coverage/lcov-report', reportFiles: 'index.html', reportName: 'Code Coverage HTML Report', reportTitles: '', useWrapperFileDirectly: true])
        }
}
}