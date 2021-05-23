#!/bin/bash
sudo systemctl restart nginx
sudo pm2 delete hashtap-backend
sudo pm2 start /home/ubuntu/hashtap/hashtap-app/backend/index.js --name hashtap-backend
sudo pm2 save