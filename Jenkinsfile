pipeline {
    agent any
 environment {
      DEFAULT_ENVIRONMENT=null
      DEV_ENVIROINMENT="development"
      STAGING_ENVIRONMENT="staging"
      PRODUCTION_ENVIRONMENT="production"
    }
    stages {
        stage("Working Directory") {
          steps {
            dir("${WORKSPACE}") {
            }
          }
        }

        stage('Build Docker Image ') {
          steps {
            script {
                  sh('''#!/bin/bash -e
                      # 
                      echo "Build Docker"
                      echo ${GIT_COMMIT}
                      cd ${WORKSPACE}/cidr_convert_api/node
                      docker build -t wizelinedevops/cidr_convert_api:${GIT_COMMIT} .
                  '''.stripIndent().trim())
            }
          }      
        }
        stage('Unit Tests ') {
          steps {
            script {
                  sh("""#!/bin/bash -e
                      # 
                      echo "Running Tests"
                  """.stripIndent().trim())
            }
          }      
        }

        stage('Push artifact to registry') {
          steps {
            script {
                  sh("""#!/bin/bash -e
                      # 
                      echo "Push artifact to registry"
                      docker push wizelinedevops/cidr_convert_api:0.0.1
                  """.stripIndent().trim())
            }
          }      
        }






        stage('Deploy to development environment') {
          when {
            not {
            anyOf {
              branch 'master'
             }
            }
          }
          steps {
              script {
              if ( env.DEFAULT_ENVIRONMENT == null ) {
                env.DEFAULT_ENVIRONMENT = 'dev'
              }
            withCredentials([file(credentialsId: 'KUBE_CONFIG', variable: 'kubeconfig')]) {
                  sh '''#!/bin/bash -e
                      echo "Deploying to dev"
                      kubectl --kubeconfig=$kubeconfig --namespace=development set image deployment/api api=wizelinedevops/cidr_convert_api:0.0.1
                  '''
            }
          }
        }
      }
    }
}