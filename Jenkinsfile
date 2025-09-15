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
        stage ('Trivy Vulenarability Scanner') {
            steps {
                sh '''
                    trivy image umair112/solar-system:$GIT_COMMIT \
                    --severity LOW,MEDIUM,HIGH \
                    --exit-code 0 \
                    --quiet \
                    --format json -o trivy-image-MEDIUM-results.json
                    trivy image umair112/solar-system:$GIT_COMMIT \
                    --severity CRITICAL \
                    --exit-code 1 \
                    --quiet \
                    --format json -o trivy-image-CRITICAL-results.json
                '''
            }
            post {
                always {
                    //Second file argument is the Input file which is to be converted to the first specified file
                    sh '''  
                        trivy convert \
                        --format template --template "@/usr/local/share/trivy/templates/html.tpl" \
                        --output trivy-image-MEDIUM-results.html trivy-image-MEDIUM-results.json
                        trivy convert \
                        --format template --template "@/usr/local/share/trivy/templates/html.tpl" \
                        --output trivy-image-CRITICAL-results.html trivy-image-CRITICAL-results.json
                        trivy convert \
                        --format template --template "@/usr/local/share/trivy/templates/junit.tpl" \
                        --output trivy-image-MEDIUM-results.xml trivy-image-MEDIUM-results.json
                        trivy convert \
                        --format template --template "@/usr/local/share/trivy/templates/junit.tpl" \
                        --output trivy-image-CRITICAL-results.xml trivy-image-CRITICAL-results.json
                    '''
                }
            }
        }
        stage ('Push Docker Image') {
            steps {
                withDockerServer(credentialsId: 'docker-hub-credentials', url: "") {
                    sh 'docker push umair112/solar-system:$GIT_COMMIT'
                }
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
            junit allowEmptyResults: true, keepProperties: true, testResults: 'dependency-check-junit.xml'
            junit allowEmptyResults: true, keepProperties: true, testResults: 'trivy-image-MEDIUM-results.xml'
            junit allowEmptyResults: true, keepProperties: true, testResults: 'trivy-image-CRITICAL-results.xml'
            publishHTML([allowMissing: true, alwaysLinkToLastBuild: true, icon: '', keepAll: true, reportDir: './', reportFiles: 'dependency-check-jenkins.html', reportName: 'Dependency Check HTML Report', reportTitles: '', useWrapperFileDirectly: true])
            publishHTML([allowMissing: true, alwaysLinkToLastBuild: true, icon: '', keepAll: true, reportDir: './coverage/lcov-report', reportFiles: 'index.html', reportName: 'Code Coverage HTML Report', reportTitles: '', useWrapperFileDirectly: true])
            publishHTML([allowMissing: false, alwaysLinkToLastBuild: true, icon: '', keepAll: true, reportDir: './', reportFiles: 'trivy-image-CRITICAL-results.html', reportName: 'Trivy Image Critical Vulnerability Report', reportTitles: '', useWrapperFileDirectly: true])
            publishHTML([allowMissing: false, alwaysLinkToLastBuild: true, icon: '', keepAll: true, reportDir: './', reportFiles: 'trivy-image-MEDIUM-results.html', reportName: 'Trivy Image MEDIUM Vulnerability Report', reportTitles: '', useWrapperFileDirectly: true])
        }
}
}