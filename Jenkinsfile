pipeline {
    agent any

    stages {
        stage('Clone Repo') {
            steps {
                git 'https://github.com/wajiha787/e-food-hub.git'
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    dockerImage = docker.build("efood-selenium-test")
                }
            }
        }

        stage('Run Tests in Container') {
            steps {
                script {
                    dockerImage.run()
                }
            }
        }
    }
}

