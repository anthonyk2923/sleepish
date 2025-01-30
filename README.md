# A chat app you can only chat in from 12 am-6 am...
## Stack: sveltekit + express.js + MongoDB

### env structures: 
ENV = "dev" or "prod"
PORT = 8080 or any port
MONGODB_URI = mongodb+src://...(ADD YOUR OWN)
JWT_SECRET = GENERATE ANY(I recommend base64 random)
ALLOW_START: 0
ALLOW_END: 6
BYPASS_CURFEW = true or false

### frontend
````
cd frontend
````
DEV: 
````
npm run dev for development
````
PROD:
````
npm run build to build
````

### backend

````
cd backend 
````
DEV: 
````
npm run dev
````
PROD:
````
npm start
````
