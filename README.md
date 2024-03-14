# Setup nextjs app on vps

## Contabo + cloudflare + namecheap

### Select a domain in namecheap and buy it

    https://www.namecheap.com/

### Go to cloudflare and add domain name and verify Cloudflare Nameservers in name cheap

    line.ns.cloudflare.com

    red.ns.cloudflare.com

### Buy a vps in contabo

    https://contabo.com/

### Connct vps ip adddress to cloudflare

    Type "A"
    Name: "<YOUR_DOMAIN_NAME>"
    Content: "<IP_ADDRESS>"
    Proxy Status: "ON"
    TTL: "AUTO

### Connect SHH with ip address

    ssh root@<IP_ADDRESS>

### Update and upgrade the packages on the droplet `:`

    sudo apt update && sudo apt upgrade -y

### Install Git, Nodejs and npm

    sudo apt install git

    which git

    cd ~

    curl -sL https://deb.nodesource.com/setup_18.x -o /tmp/nodesource_setup.sh

    sudo bash /tmp/nodesource_setup.sh

    sudo apt install nodejs

    node -v

    sudo npm install -g npm@latest

    npm -v

### Make a folder called `<apps>` and clone the product github url and running build command

    mkdir apps

    cd apps

    git clone <PROJECT_URL>

    cd <PROJECT_URL>

    npm install or pnpm install or yern install

    pnpm build

### Running docker

> Create a file called: `start-database.sh`
>
> Copy and paste those code on the file

    #!/bin/bash
    # Use this script to start a docker container for a local development database

    # TO RUN ON WINDOWS:
    # 1. Install WSL (Windows Subsystem for Linux) - https://learn.microsoft.com/en-us/windows/wsl/install
    # 2. Install Docker Desktop for Windows - https://docs.docker.com/docker-for-windows/install/
    # 3. Open WSL - `wsl`
    # 4. Run this script - `./start-database.sh`

    # On Lunux and macOS you can run this script directly - `./start-database.sh`

    DB_CONTAINER_NAME="mybdmart-postgres"

    if ! [ -x "$(command -v docker)" ]; then
    echo "Docker is not installed. Please install docker and try again.\nDocker install guide: https://docs.docker.com/engine/install/"
    exit 1
    fi

    if [ "$(docker ps -q -f name=$DB_CONTAINER_NAME)" ]; then
    docker start $DB_CONTAINER_NAME
    echo "Database container started"
    exit 0
    fi

    # import env variables from .env
    set -a
    source .env

    DB_PASSWORD=$(echo $DATABASE_URL | awk -F':' '{print $3}' | awk -F'@' '{print $1}')

    if [ "$DB_PASSWORD" = "password" ]; then
    echo "You are using the default database password"
    read -p "Should we generate a random password for you? [y/N]: " -r REPLY
    if ! [[ $REPLY =~ ^[Yy]$ ]]; then
        echo "Please set a password in the .env file and try again"
        exit 1
    fi
    DB_PASSWORD=$(openssl rand -base64 12)
    sed -i -e "s/:password@/:$DB_PASSWORD@/" .env
    fi

    docker run --name $DB_CONTAINER_NAME -e POSTGRES_PASSWORD=$DB_PASSWORD -e POSTGRES_DB=mybdmart -d -p 5432:5432 docker.io/postgres

    echo "Database container was succesfuly created"

### Updating file permissions

    ls -l .env

    chmod u+w .env

    chmod +x start-database.sh

    ./start-database.sh

### Installing pm2 and seting it up

     npm install -g pm2
     or
     sudo npm install -g pm2
     or
     use pnpm

     pm2 -v

     pm2 start pnpm --name "<PROJECT_FOLDER_NAME>" -- start

     pm2 status

     View your website <IP_ADDRESS>:3000

     pm2 startup

     pm2 save

### Installing nginx and seting it up

    sudo apt install nginx -y

    apt search nginx

    nginx -v

    sudo nano /etc/nginx/sites-available/default

> See the defalut welcome page:

    https://<IP_ADDRESS>

> Go to last line and added thoes lines

      server {
        listen 80;
        listen [::]:80;

        server_name <DOMAIN_NAME> www.<DOMAIN_NAME>;

        location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
      }
    }

> To save : `Control + O` and `Press Enter`
>
> To Exit : `Control + X`
>
> To Check : `sudo nginx -t`
>
> Restart the nginx server

      sudo service nginx restart

### Installing snap, core, refresh core and certbot

    sudo apt install snapd

    sudo snap install core

    sudo snap install refresh core

    sudo snap install --classic certbot

    sudo ln -s /snap/bin/certbot /usr/bin/certbot

    sudo certbot --nginx -d <DOMAIN_NAME> -d www.<DOMAIN_NAME>

> Enter `email address` and `Y + Enter` and `Y + Enter`
>
> View the nginx file

    sudo nano /etc/nginx/sites-available/default
