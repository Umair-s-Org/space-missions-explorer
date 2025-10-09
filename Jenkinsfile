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
    withCredentials([usernamePassword(credentialsId: 'Mongo-DB-Credentials', passwordVariable: 'MONGO_PASSWORD', usernameVariable: 'MONGO_USERNAME')]) {
        stage ('Unit Testing') {
            sh 'node -v'
            sh 'npm test'
        }
    }
}