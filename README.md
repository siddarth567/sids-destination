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
COPY index.html /usr/share/nginx/html/

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
