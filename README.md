# k8s-playground
A utility tool that provides exercices for practising your Kubernetes skills.
The exercice are a copy from Games of Pods: https://kodekloud.com/courses/game-of-pods/ 

# Prerequisites
* kucectl should be installed and configured to communicate with a cluster

# Instructions
* Compile the project:
  * npm run install 
  * npm run build

* In a shell, navigate to the project directory and start kubectl proxy with : kubectl proxy --www=./dist
* The playground will be accessible at the following address: http://localhost:8001/static
