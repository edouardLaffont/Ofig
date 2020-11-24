// Toujours commencer par importer les variables d'environnement !


require('dotenv').config();

const express = require('express');


// on importe le router
const router = require('./app/router');

// un peu de config
const PORT = process.env.PORT || 5000;

const expressSession = require('express-session');
const app = express();

app.set('view engine', 'ejs');
app.set('views', './app/views');
// servir les fichiers statiques qui sont dans "integration"
app.use(express.static('./integration'));
app.use(express.urlencoded({
  extended: true
}));

app.use(expressSession({
  resave: true,
  saveUninitialized: true,
  secret: "Guess it!",
  cookie: {
    secure: false,
    maxAge: (1000*60*60) // ça fait une heure
  }
}));
app.use((req, res, next) => {
if(!req.session.cart) {
  req.session.cart = [];
}
res.locals.cart = req.session.cart; 
  next(); 
});

// routage !
app.use(router);


// on lance le serveur
app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});
