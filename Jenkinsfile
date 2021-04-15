pipeline {
    agent any
    // parameters {
    //   string(name: 'inventory_file', defaultValue: 'dev',  description: 'This is the inventory file for the environment to deploy configuration')
    //   string(name: 'limit_inventory_group', defaultValue: '',  description: 'This is a group from the inventory file')
    //   string(name: 'ansible_tag', defaultValue: '', description: 'Ansible tag to only run specific tasks')
    // }
//  environment {
//       JENKINS_SSH_PRIVKEY="~/.ssh/jenkins.pem"
//       JENKINS_KUBE_CONFIG_FILE="~/.kube/config"
//       JENKINS_ANSIBLE_CFG_FILE="${WORKSPACE}/playbooks/ansible.cfg"
//       ANSIBLE_FORCE_COLOR="true"
//     }
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
                  sh("""#!/bin/bash -e
                      # 
                      echo "Build Docker"
                      pwd
                      ls -la
                      cd ${WORKSPACE}/cidr_convert_api/node
                      docker build -t wizelinedevops/cidr_convert_api:0.0.1 .
                  """.stripIndent().trim())
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

        // stage('Prepare Kubernetes Auth') {
        //   steps {
        //     withCredentials([file(credentialsId: 'GPG_KUBE_CONFIG', variable: 'kubeconfig-gpg')]) {
        //           sh("""#!/bin/bash -e
        //               #
        //               echo "Decrypt kubeconfig"
        //               gpg -d --batch --passphrase digWK9hwaJz7Cj $GPG_KUBE_CONFIG
        //               ls -latr
        //           """.stripIndent().trim())
        //     }
        //   }
        //  }


        stage('Deploy to environments') {
          steps {
            script {
                  sh("""#!/bin/bash -e
                      # 
                      echo "Deploy to environments"

                  """.stripIndent().trim())
            }
          }      
        }
    }
}