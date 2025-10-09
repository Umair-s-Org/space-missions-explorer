podTemplate(
    cloud: 'k8s', 
    label: 'nodejs-pod', 
    containers: [
        containerTemplate(
            args: '9999999', 
            command: 'sleep', 
            image: 'node:18-alpine', 
            name: 'node-18', 
            ttyEnabled: true, 
            priviliged: true,
            workingDir: '/home/jenkins/agent'),
            containerTemplate(
            args: '9999999', 
            command: 'sleep', 
            image: 'node:19-alpine', 
            name: 'node-19', 
            ttyEnabled: true, 
            priviliged: true,
            workingDir: '/home/jenkins/agent')])
{

node('jenkins-ubuntu-agent') {
    env.NODEJS_HOME = "${tool 'nodejs-24'}"
    env.PATH="${env.NODEJS_HOME}/bin:${env.PATH}"
    env.MONGO_URI = "mongodb://admin:secret@100.99.178.107:27017/mydb?authSource=admin"

    stage ('Git Checkout') {
        checkout scm
    }

    wrap([$class: 'TimestamperBuildWrapper']) {
        stage ('Install Dependencies') {
            cache(caches: [
                arbitraryFileCache(
                    cacheName: 'npm-dependency-cache',
                    cacheValidityDecidingFile: 'package-lock.json',
                    includes: '**/*',
                    excludes: '',
                    path: 'node_modules'
                )], defaultBranch: '', maxCacheSize: 550) {
                        sh 'npm install --no-audit'
                        sh 'node seed.js' //Add data into DB
                        stash includes: 'node_modules/**', name: 'npm-installed-libraries'
                        }
        }
    }
    stage ('Unit Testing') {
        node('nodejs-pod') {
            container('node-18') {
                checkout scm
                unstash 'npm-installed-libraries'
                withCredentials([usernamePassword(credentialsId: 'Mongo-DB-Credentials', passwordVariable: 'MONGO_PASSWORD', usernameVariable: 'MONGO_USERNAME')]) {
                    sh 'node -v'
                    sh 'npm test'
                }
            }
        }
    }
}
}