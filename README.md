Automation Project
-------------------
✅ STEP 1 — Create AWS EC2 Instance

Use:

Amazon EC2
Recommended:
Ubuntu 22.04
t2.micro
20GB storage

✅ STEP 2 — Security Group

Allow:

Port	Purpose
22	SSH
80	Website
8080	Jenkins later

✅ STEP 3 — Connect to EC2

From terminal:

ssh -i mykey.pem ubuntu@<PUBLIC-IP>

✅ STEP 4 — Install Docker

Inside EC2:

sudo apt update
sudo apt install docker.io -y

sudo systemctl start docker
sudo systemctl enable docker

sudo usermod -aG docker ubuntu

IMPORTANT:
Logout and login again.

Check:

docker --version

✅ STEP 5 — Clone this git repo
git clone :-https://github.com/siddarth567/sids-destination.git

✅ STEP 6 — create docker file
its already present in this git repo

Docker file 
FROM nginx:alpine

RUN rm -rf /usr/share/nginx/html/*

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY . /usr/share/nginx/html/

RUN chmod -R 755 /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

✅ STEP 7 — Build docker image
docker build -t sids:v1 .

✅ STEP 8 — Run Container
docker run -d -p 80:80 --name sids_destination sids:v1

✅ STEP 9 — Open Website

Browser:

http://<EC2-PUBLIC-IP>

✅ STEP 10 — Install jenkins using docker images
docker run -d \
--name jenkins \
-p 8080:8080 \
-p 50000:50000 \
-v jenkins_home:/var/jenkins_home \
-v /var/run/docker.sock:/var/run/docker.sock \
-v $(which docker):/usr/bin/docker \
jenkins/jenkins:lts

(docker ps -a)
Look for:

jenkins
If status is:

Exited

Start it:

(docker start jenkins)

✅ step 11- Jenkins Pipeline Script

In Jenkins:

New Item
→ Pipeline
→ Pipeline Script

Paste this:

pipeline {
    agent any

    triggers {
        githubPush()
    }

    stages {

        stage('Clone GitHub Repo') {
            steps {
                git branch: 'main',
                url: 'https://github.com/siddarth567/sids-destination.git'
            }
        }

        stage('Build Docker Image') {
            steps {
                sh 'docker build -t sids:v1 .'
            }
        }

        stage('Stop Old Container') {
            steps {
                sh 'docker rm -f sids_destination || true'
            }
        }

        stage('Run New Container') {
            steps {
                sh 'docker run -d -p 3200:80 --name sids_destination sids:v1'
            }
        }
    }
}

✅ Save and Run

Click:

Save → Build Now

to add webhooks (means auto trigger the pipeline do the below steps)

configure the jenkins code 
--> general
--> pipeline syntax
--->simple steps
--->choose check out for version control
---> add Repository URL
---> add Credentials > global > username with passward > add github username and classic tocken here
-->generate piple line script
checkout scmGit(branches: [[name: '*/master']], extensions: [], userRemoteConfigs: [[credentialsId: 'sid', url: 'https://github.com/siddarth567/sids-destination.git']]) 
--> this i have already added in my script

in github 

--> go to repository settings
--> webhooks > add webhook > add your jenkins Payload URL > add webhook 
--> you should see ✅ green right tick and somethink like this http://54.83.121.161:8080/github-webhook/ (push)
--> edit you code jenkins pipleline will be auto triggered 
