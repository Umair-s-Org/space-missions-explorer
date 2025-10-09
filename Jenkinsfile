node {
    env.NODEJS_HOME = "${tool 'nodejs-24'}"
    env.PATH="${env.NODEJS_HOME}/bin:${env.PATH}"

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
}