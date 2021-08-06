# comic-browser

## Project setup
```
npm install
```

## Adding Environmental Variables
This project uses env variables to set the public and private API keys for the Marvel API. To set this up locally, add a `.env` file at the project root with the following keys:

```.env
VUE_APP_MARVEL_PRIVATE_KEY=add_your_private_key
VUE_APP_MARVEL_PUBLIC_KEY=add_your_public_key
```

**note:** you will need to stop and restart the development server 

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
