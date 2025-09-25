# Backend
npm init -y
npm i express
npm i nodemon
server.js
"dev": "nodemon server.js"
npm i dotenv
make the routes folder then controller folder
confing folder for DB connection 
npm i mongoose
create models folder and define schema then update the controller
<!-- for id search http://localhost:5000/recipe/68c713d5136a56c0dbdb156b not to add : -->

------------------ User----------------
npm i bcrypt,npm i jsonwebtoken
same creating model schema then routes and then in controller doing all 
remeber to add route in server.js



# Frontend
create vite app 
add tailwind in vite.js-> import tailwindcss from '@tailwindcss/vite' allso import @import "tailwindcss"; in index.css and then add import index.css in main.jsx
create componnets and then add Layout(Outlet) and react-router-dom 
<!-- in main.jsx->ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
) -->
using axios and loder get mongo data
user cors in server.js(cors on top first thin gto be written)
---------------------
from recipeItems props home.jsx the items are visible
Now creating a modal for singup/login through InputForm
JWT tokens are used to create session through which Login/Logout functionality is checked
------------- useNAveigate for reedirecting-------------
----npm install react-toastify for side 

