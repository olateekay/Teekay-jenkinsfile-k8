pipeline {
    agent any

 environment {
      DEFAULT_ENVIRONMENT=null
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
                      echo "This is the commit Hash ${GIT_COMMIT:0:8}"
                      cd ${WORKSPACE}/cidr_convert_api/node
                      docker build -t wizelinedevops/cidr_convert_api:${GIT_COMMIT:0:8} .
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
                  sh('''#!/bin/bash -e
                      # 
                      echo "Pushing Artifact ID: ${GIT_COMMIT:0:8} to docker registry"
                      docker push wizelinedevops/cidr_convert_api:${GIT_COMMIT:0:8}
                  '''.stripIndent().trim())
            }
          }      
        }


        stage('Deploy to development environment') {
          when {
            not {
            anyOf {
              branch 'master'
              // DEFAULT_ENVIRONMENT = "production"
              // DEFAULT_ENVIRONMENT="staging"
             }
            }
          }
          steps {
              script {
              if ( env.DEFAULT_ENVIRONMENT == null ) {
                env.DEFAULT_ENVIRONMENT = 'development'
              }
            withCredentials([file(credentialsId: 'KUBE_CONFIG', variable: 'kubeconfig')]) {
                  sh '''#!/bin/bash -e
                      echo "Deploying API version ${GIT_COMMIT:0:8} to Development Environment"
                      ###### I intend to pick up the name of the environment dynamically here, rather than hardcoding the namespace ######
                      kubectl --kubeconfig=$kubeconfig --namespace=development set image deployment/api api=wizelinedevops/cidr_convert_api:dev-${GIT_COMMIT:0:8}
                  '''
            }
          }
        }
      }

        stage('Deploy to Staging environment') {
          when {
            anyOf {
              branch 'staging'
              // DEFAULT_ENVIRONMENT = "staging"
            }
          }
          steps {
              script {
              if ( env.DEFAULT_ENVIRONMENT == null ) {
                env.DEFAULT_ENVIRONMENT = 'staging'
              }
            withCredentials([file(credentialsId: 'KUBE_CONFIG', variable: 'kubeconfig')]) {
                  sh '''#!/bin/bash -e
                      echo "Deploying API version ${GIT_COMMIT:0:8} to Staging Environment"
                      kubectl --kubeconfig=$kubeconfig --namespace=$DEFAULT_ENVIRONMENT  set image deployment/api api=wizelinedevops/cidr_convert_api:stage-${GIT_COMMIT:0:8}
                  '''
            }
          }
        }
      }

      stage('Deploy to Production environment') {
          when {
            anyOf {
              branch 'master'
              // DEFAULT_ENVIRONMENT = "production"
            }
          }
          steps {
              script {
              if ( env.DEFAULT_ENVIRONMENT == null ) {
                env.DEFAULT_ENVIRONMENT = 'production'
              }
            withCredentials([file(credentialsId: 'KUBE_CONFIG', variable: 'kubeconfig')]) {
                  sh '''#!/bin/bash -e
                      echo "Deploying API version ${GIT_COMMIT:0:8} to Prodction Environment"
                      docker tag wizelinedevops/cidr_convert_api:${GIT_COMMIT:0:8} wizelinedevops/cidr_convert_api:latest
                      kubectl --kubeconfig=$kubeconfig --namespace=$DEFAULT_ENVIRONMENT  set image deployment/api api=wizelinedevops/cidr_convert_api:latest
                  '''
            }
          }
        }
      }


    }
}