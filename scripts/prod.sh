PORT=7000
PM2_PROJECT_NAME="mywe-app-server-prod-"$PORT

if pm2 list | grep -q $PM2_PROJECT_NAME; then
    echo $PM2_PROJECT_NAME" is running"
    pm2 restart $PM2_PROJECT_NAME
else
    echo $PM2_PROJECT_NAME" is not running"
    pm2 start npm --name $PM2_PROJECT_NAME -- start
fi
pm2 save