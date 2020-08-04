# ams-registration-ui

This is a repo for implementing ams registration ui for registering new users to the ams platform

The repo includes the following component subfolders:
- `./api`: A simple express.js API that composes a proper ams registration request and sends it in a preconfigured remote ams endpoint
- `./ui`: A simple react single page application that uses the aftermentioned api to display a registration form allowing user to fill in details and send a registration request to ams

### API
This is a simple express application. It consists of a configuration file `config.js` with the following contents:
```
{
    "bind": "localhost",
    "port": 5000,
    "ams" : "https://remote_ams.endpoint.foo_",
    "token": "service registration token to authenticate against ams"
    "verify": "false",
    "ratelimit_window_ms": 60000,
    "ratelimit_max_requests": 10 
}
```
- `bind`: address the api service will bind to 
- `port`: port the api service will bind to
- `ams`: remote ams endpoint to send the registration requests to
- `token`: secret service token to authenticate against remote ams endpoint
- `verify`: ssl verify or not the remote endpoint
- `ratelimit_window_ms`: define a rate limit window in milliseconds
- `ratelimit_max_requests`: define how many requests are allowed during the above window

To deploy the API in a remote server behind nginx issue:
- Install nodejs - tested with nodejs `v.12.18.1`
- Donwload the `./api` subfolder's express project files to the remote node
- Issue: `npm install` inside the api project folder
- Use `pm2` to control the and daemonize the service. To install it issue `npm install -g pm2`, then:
 - Issue `pm2 start app.js` to start
 - Issue `pm2 startup systemd` to launch on system boot/restart

Lets say that the api starts listening on `localhost` port `5000`. To serve it through nginx add the following directive in the nginx server body configuration (either in default site config or in ssl.conf)
```
  location /api {
         proxy_pass http://localhost:5000/api;
    }
```
[!] Don't forget to configure the firewall rules...

### UI
The UI is a simple single page application build with ReactJS and it can be deployed in a remote node using the following steps:
- Enter `./ui` project folder
- Issue `node run build` to produce the optimized build
- Transfer the `./ui/dist` subfolder contents to the remote node's www root. Assuming you having nginx install that would be something like`/usr/share/nginx/html` on the remote node

Allow nginx to serve the files with the following directive in nginx server body configuration (either in default site config or in ssl.conf)
```
root /usr/share/nginx/html;
 
location / {
}
```

[!] Don't forget to configure the firewall rules...
