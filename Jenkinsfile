pipeline {
    agent any
    tools {
        nodejs 'nodejs-24'
    }
    environment {
        MONGO_URI = "mongodb://admin:secret@localhost:27017/mydb?authSource=admin"
        MONGO_URI_DOCKER = "mongodb://admin:secret@my-mongo:27017/mydb?authSource=admin"
        MONGO_DB_CREDS = credentials('Mongo-DB-Credentials')
        MONGO_USERNAME = "${MONGO_DB_CREDS_USR}"  // As the app needs environmental variable MONGO_USERNAME instead of MONGO_DB_CREDS_USR which will be created by the above 
        MONGO_PASSWORD = "${MONGO_DB_CREDS_PSW}"  // As the app needs environmental variable MONGO_PASSWORD instead of MONGO_DB_CREDS_PSW which will be created by the MONGO_DB_CREDS
        SONAR_SCANNER_HOME = tool 'sonarqube-scanner-720'
        GIT_TOKEN = credentials('github-api-token')
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
                timeout(time: 60, unit: 'SECONDS') {
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
                withDockerRegistry(credentialsId: 'docker-hub-credentials', url: "") {
                    sh 'docker push umair112/solar-system:$GIT_COMMIT'
                }
            }
        }
        stage ('Deploy - EC2 Instance') {
            when {
                branch 'feature/enabling-cicd'
            }
            steps {
                script {
                    sshagent(['aws-dev-deploy-ec2-instance']) {
                        sh '''
                            ssh -o StrictHostKeyChecking=no ec2-user@13.232.230.153 "
                                if sudo docker ps -a | grep -i 'solar-system'; then
                                    echo 'Container found. Stopping...'
                                    sudo docker stop 'solar-system' && sudo docker rm 'solar-system'
                                    echo 'Container stopped and removed.'
                                fi
                                    docker run --name solar-system \
                                        -e MONGO_URI=$MONGO_URI_DOCKER \
                                        -e MONGO_USERNAME=$MONGO_USERNAME \
                                        -e MONGO_PASSWORD=$MONGO_PASSWORD \
                                        -p 3000:3000 -d umair112/solar-system:$GIT_COMMIT
                            "
                        '''
                    }
                }
            }
        }
        stage ('K8s Update Image Tag') {
            when {
                branch 'PR*'
            }
            steps {
                sh 'git clone -b main https://github.com/Umair-s-Org/solar-system-gitops-argocd-gitea.git'
                dir("solar-system-gitops-argocd-gitea/kubernetes") {
                    sh '''
                        ### Replace Docker Tag ###
                        git checkout main
                        git checkout -b feature-$BUILD_ID
                        sed -i "s#umair112.*#umair112/solar-system:$GIT_COMMIT#g" deployment.yml
                        cat deployment.yml

                        ### Commit and Push to Feature Branch ###
                        git config --global user.email "Jenkins-CI@BOT.com"
                        git remote set-url origin http://$GIT_TOKEN@github.com/Umair-s-Org/solar-system-gitops-argocd-gitea
                        git add .
                        git commit -am "Update Docker Image"
                        git push -u origin feature-$BUILD_ID
                    '''
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
            //Script to remove directory to make the pull successful each time in the K8s update image tag 
            script {
                if (fileExists('solar-system-gitops-argocd-gitea')) {
                    sh 'rm -rf solar-system-gitops-argocd-gitea'
                }
            }
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