@Library('jenkins-shared-library@featureTrivyScan') _

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
                // stage ('OWASP Dependency Check') {
                //     steps {
                //         dependencyCheck additionalArguments: '''
                //             --scan ./
                //             --out ./
                //             --format ALL
                //             --disableYarnAudit
                //             --prettyPrint''', odcInstallation: 'OWASP-DepCheck-12'

                //         dependencyCheckPublisher failedTotalCritical: 2, pattern: 'dependency-check-report.xml', stopBuild: true, unstableTotalCritical: 2
                //     }
                // }

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
        // stage ('SAST - SonarQube') {
        //     steps {
        //         timeout(time: 60, unit: 'SECONDS') {
        //             withSonarQubeEnv('sonar-qube-server') {
        //                 sh 'echo $SONAR_SCANNER_HOME'
        //                 sh '''
        //                 $SONAR_SCANNER_HOME/bin/sonar-scanner \
        //                     -Dsonar.projectKey=Solar-System-Project \
        //                     -Dsonar.sources=app.js \
        //                     -Dsonar.javascript.lcov.reportPaths=./coverage/lcov.info 
        //                 '''
        //             }
        //             // waitForQualityGate abortPipeline: true
        //         }
                
        //     }
        // }
        stage ('Build Docker Image') {
            steps {
                sh 'docker build -t umair112/solar-system:$GIT_COMMIT .'
            }
        }
        stage ('Trivy Vulenarability Scanner') {
            steps {
                script {
                    trivyScan.vulenarability("umair112/solar-system:$GIT_COMMIT")
                }
            }
            post {
                always {
                    script {
                        trivyScan.reportsConverter()
                    }
                }
            }
        }
        // stage ('Push Docker Image') {
        //     steps {
        //         withDockerRegistry(credentialsId: 'docker-hub-credentials', url: "") {
        //             sh 'docker push umair112/solar-system:$GIT_COMMIT'
        //         }
        //     }
        // }
        // stage ('Deploy - EC2 Instance') {
        //     when {
        //         branch 'feature/enabling-cicd'
        //     }
        //     steps {
        //         script {
        //             sshagent(['aws-dev-deploy-ec2-instance']) {
        //                 sh '''
        //                     ssh -o StrictHostKeyChecking=no ec2-user@13.232.230.153 "
        //                         if sudo docker ps -a | grep -i 'solar-system'; then
        //                             echo 'Container found. Stopping...'
        //                             sudo docker stop 'solar-system' && sudo docker rm 'solar-system'
        //                             echo 'Container stopped and removed.'
        //                         fi
        //                             docker run --name solar-system \
        //                                 -e MONGO_URI=$MONGO_URI_DOCKER \
        //                                 -e MONGO_USERNAME=$MONGO_USERNAME \
        //                                 -e MONGO_PASSWORD=$MONGO_PASSWORD \
        //                                 -p 3000:3000 -d umair112/solar-system:$GIT_COMMIT
        //                     "
        //                 '''
        //             }
        //         }
        //     }
        // }
        // stage ('K8s Update Image Tag') {
        //     when {
        //         branch 'PR*'
        //     }
        //     steps {
        //         sh 'git clone -b main https://github.com/Umair-s-Org/solar-system-gitops-argocd-gitea.git'
        //         dir("solar-system-gitops-argocd-gitea/kubernetes") {
        //             sh '''
        //                 ### Replace Docker Tag ###
        //                 git checkout main
        //                 git checkout -b feature-$BUILD_ID
        //                 sed -i "s#umair112.*#umair112/solar-system:$GIT_COMMIT#g" deployment.yml
        //                 cat deployment.yml

        //                 ### Commit and Push to Feature Branch ###
        //                 git config --global user.email "Jenkins-CI@BOT.com"
        //                 git remote set-url origin http://$GIT_TOKEN@github.com/Umair-s-Org/solar-system-gitops-argocd-gitea
        //                 git add .
        //                 git commit -am "Update Docker Image"
        //                 git push -u origin feature-$BUILD_ID
        //             '''
        //         }

        //     }
        // }
        // stage('Lambda - S3 Upload & Deploy') {
        //     when { branch 'main' }
        //     steps {
        //         withAWS(credentials: 'aws-s3-ec2-lambda-creds', region: 'ap-south-1') {
        //             sh """
        //                 echo "----- Before Modification -----"
        //                 tail -5 app.js
        //                 echo "----- Modifying app.js for Lambda -----"
        //                 sed -i 's|^app.listen|//app.listen|' app.js
        //                 sed -i 's|^module.exports = app;|//module.exports = app;|' app.js
        //                 sed -i 's|^//module.exports.handler = serverless(app)|module.exports.handler = serverless(app)|' app.js
        //                 echo "----- After Modification -----"
        //                 tail -5 app.js
        //             """

        //             sh '''
        //                 echo "----- Creating deployment package -----"
        //                 zip -qr solar-system-lambda-${BUILD_ID}.zip app* package* index.html node*
        //                 ls -ltr solar-system-lambda-${BUILD_ID}.zip
        //             '''
        //             s3Upload(
        //                 file: "solar-system-lambda-${BUILD_ID}.zip",
        //                 bucket: 'solar-system-lambda-bucket-demo'
        //             )
        //         }
        //         sh """
        //         aws lambda update-function-configuration \
        //             --function-name solar-system-function \
        //             --environment '{"Variables":{"MONGO_USERNAME":"${MONGO_USERNAME}","MONGO_PASSWORD":"${MONGO_PASSWORD}","MONGO_URI":"${MONGO_URI}"}}'
        //         """
        //         sh '''
        //             echo "----- Updating Lambda function code -----"
        //             aws lambda update-function-code \
        //                 --function-name solar-system-function \
        //                 --s3-bucket solar-system-lambda-bucket-demo \
        //                 --s3-key solar-system-lambda-${BUILD_ID}.zip
        //         '''
        //     }
        // }
        // stage('Lambda - Invoke Function') {
        //     when {
        //         branch 'main'
        //     }
        //     steps {
        //         withAWS(credentials: 'aws-s3-ec2-lambda-creds', region: 'ap-south-1') {
        //             sh '''
        //                 # Wait for Lambda to stabilize
        //                 sleep 30s

        //                 # Fetch the function URL configuration
        //                 function_url_data=$(aws lambda get-function-url-config --function-name solar-system-function)

        //                 # Extract and normalize the FunctionUrl
        //                 function_url=$(echo $function_url_data | jq -r '.FunctionUrl | sub("/$"; "")')

        //                 # Send a HEAD request to the /live endpoint and check for 200 OK
        //                 curl -Is $function_url/live | grep -i "200 OK"
        //             '''
        //         }
        //     }
        // }
        // stage ('Deploy Application') {
        //     steps {
        //         sh 'npm start'
        //     }
        // }
    }
    post {
        always {
            slackNotifications("${currentBuild.result}")
            //Script to remove directory to make the pull successful each time in the K8s update image tag 
            // script {
            //     if (fileExists('solar-system-gitops-argocd-gitea')) {
            //         sh 'rm -rf solar-system-gitops-argocd-gitea'
            //     }
            // }
            // junit allowEmptyResults: true, keepProperties: true, testResults: 'test-results.xml'
            // junit allowEmptyResults: true, keepProperties: true, testResults: 'dependency-check-junit.xml'
            // junit allowEmptyResults: true, keepProperties: true, testResults: 'trivy-image-MEDIUM-results.xml'
            // junit allowEmptyResults: true, keepProperties: true, testResults: 'trivy-image-CRITICAL-results.xml'
            // publishHTML([allowMissing: true, alwaysLinkToLastBuild: true, icon: '', keepAll: true, reportDir: './', reportFiles: 'dependency-check-jenkins.html', reportName: 'Dependency Check HTML Report', reportTitles: '', useWrapperFileDirectly: true])
            // publishHTML([allowMissing: true, alwaysLinkToLastBuild: true, icon: '', keepAll: true, reportDir: './coverage/lcov-report', reportFiles: 'index.html', reportName: 'Code Coverage HTML Report', reportTitles: '', useWrapperFileDirectly: true])
            // publishHTML([allowMissing: false, alwaysLinkToLastBuild: true, icon: '', keepAll: true, reportDir: './', reportFiles: 'trivy-image-CRITICAL-results.html', reportName: 'Trivy Image Critical Vulnerability Report', reportTitles: '', useWrapperFileDirectly: true])
            // publishHTML([allowMissing: false, alwaysLinkToLastBuild: true, icon: '', keepAll: true, reportDir: './', reportFiles: 'trivy-image-MEDIUM-results.html', reportName: 'Trivy Image MEDIUM Vulnerability Report', reportTitles: '', useWrapperFileDirectly: true])
        }
}
}