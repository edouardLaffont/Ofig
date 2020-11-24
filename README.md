# O'Fig

## Étape 1: Mise en place

Utiliser npm pour:
- Initialiser le projet.
- Installer les dépendances nécessaires : `express`, `ejs`, `pg`, et `dotenv`.

Une base de code express _fonctionnelle_ est fournie, ainsi qu'une intégration _qui claque_. Prendre le temps de lire ce code.

## Étape 2: Factorisation des views

<details>
<summary>Besoin d'aide ?</summary>

- Créer un dossier `views` dans le dossier `app`, y copier les fichiers html fournis en les renommant en `.ejs`.
- Faire les réglages de express pour utiliser EJS et le bon dossier de views.
- Créer les fichiers `header.ejs`, `footer.ejs` et `leftMenu.ejs`, y mettre le code HTML factorisable, et inclure ces fichiers dans les autres views.
- Ne pas oublier la div modale dans la page article !
- Modifier les méthodes des controllers pour utiliser les views ejs.
- On peut aussi choisir de séparer le "menu de gauche".

</details>

## Étape 3: Brancher la Base de Données

Les données sont fournies dans un fichier `create_db.sql`, à importer dans une base de données PostGreSQL. 

Créer un nouvel utilisateur et une nouvelle base de données dans PostGreSQL, puis y importer les données du fichier. [Cette fiche récap](https://github.com/O-clock-Alumni/fiches-recap/blob/master/bdd/confg-postgres.md#création-dun-utilisateur-et-dune-base-de-données) peut être utile :wink:.

Créer un fichier `.env`, pour y mettre les informations de connexion à la base de données.

Créer ensuite un fichier `dataMapper.js` dans le dossier `app`.

Dans ce fichier, copier ce code :

```javascript
const client = require('./database');

const dataMapper = {


};

module.exports = dataMapper;
```

Puis ajouter et implémenter les méthodes suivantes dans l'objet dataMapper:

- `getAllFigurines(callback)` qui va chercher toutes les figurines dans la table `figurine`.
- `getOneFigurine(id, callback)` qui va chercher une seule figurine dans la table `figurine`.

Note: toutes les méthodes doivent appeler la fonction `callback` passée en paramètre. On considère que tous les callbacks respecteront la signature standard `(err, data)`.

## Étape 4: Dynamisation !

### 4.1: Accueil

Modifier la méthode `homePage` de l'objet `mainController`. Cette méthode doit :

- Appeller `dataMapper.getAllFigurine`.
- Définir un callback à passer à `dataMapper.getAllFigurine`.

Modifier la view `accueil` pour utiliser les données qui viennent de la base de données !

Ne pas se soucier du menu de gauche pour l'instant !

Ne pas hésiter à modifier ou étendre le fichier CSS pour des manipulations plus facile (par exemple pour les noms des catégories).

<details>
<summary>Un peu d'aide pour le callback ?</summary>

- si on a une erreur, on la log, et on renvoie une page d'erreur. (ou on affiche directement l'erreur dans le navigateur, à vous de voir)
- sinon, on affiche une view en lui passant un paramètre.
- et c'est tout :wink:.

</details>

### 4.2: Article

- Changer la route `/article` pour qu'elle attende un paramètre.
- Modifier la méthode `articlePage` de l'objet `mainController` sur le même principe que précédemment, en utilisant le paramètre situé dans la requête.
- Mettre à jour la view `article` pour utiliser les données de la BDD.
- Mettre à jour la view `accueil` pour que les liens pointent vers la bonne page article.

## Étape 5 : Le panier

On va gérer le panier avec une session.

### 5.1: Mise en place

- Ajouter le package `express-session`. Un petit tour sur [la doc](https://www.npmjs.com/package/express-session), ça peut pas faire de mal.
- Mettre en place le middleware dans `index.js`

<details>
<summary>Au secours !</summary>

```js
const expressSession = require('express-session');
app.use(expressSession({
  resave: true,
  saveUninitialized: true,
  secret: "Guess it!",
  cookie: {
    secure: false,
    maxAge: (1000*60*60) // ça fait une heure
  }
}));
```

</details>

### 5.2: Ajouter une figurine

Implémenter une nouvelle route `/cart/add/:id`, qui ajoute un exemplaire de la une figurine correspondante (cf paramètre `id`) dans la session. Cette route redirige ensuite vers `/cart`, et tous les boutons "Ajouter au panier" doivent pointer sur cette route.

<details>
<summary>De l'aide !?</summary>

- Qui dit "créer une nouvelle route", dit "créer une nouvelle méthode" !
- Dans cette nouvelle méthode:
      - Si le panier n'existe pas, il faut le créer ! (`req.session.cart = []`)
      - Puis tester si la figurine est déjà dans le panier.
      - Si la figurine n'est pas dans le panier, récupérer la figurine dans la base de données avec `dataMapper.getOneFigurine`.
      - Puis rajouter une propriété `quantity` à cette figurine, et l'ajouter au panier (`req.session.cart.push(figurine)`)
      - Si la figurine est déjà dans le panier, il suffit d'augmenter la valeur de `quantity` !
      - Enfin, rediriger vers la route `/cart`, grâce à la méthode `res.redirect`

</details>

### 5.3: Afficher le panier

Modifier la méthode `cartPage` pour qu'elle utilise les données de la session. Penser à faire les calculs des prix (HT, TVA, TTC,...) !

### 5.4: Supprimer une figurine

Implémenter une nouvelle route `/cart/delete/:id`, qui supprime un exemplaire de la une figurine correspondante dans la session. Les liens `-` dans le panier doivent pointer vers cette route !

<details>
<summary>Un peu d'aide</summary>

- Nouvelle route, nouvelle méthode !
- Dans cette méthode :
      - Trouver la figurine dans le panier (avec `req.session.cart.find(...)`).
      - Décrémenter la propriété `figurine.quantity`.
      - Si `figurine.quantity` est inférieure ou égale à 0, il faut enlever la figurine du panier (avec `req.session.cart.filter(...)` ).

</details>

## Bonus 1 : Les reviews

Tiens ? y'a une autre table dans la bdd !?

Elle contient des reviews sur les figurines. Ces reviews doivent être intégrés dans la page article, dans la modale prévue à cet effet.

<details>
<summary>Un peu d'aide ?</summary>

Non. C'est un bonus, alors pas d'aide ! :wink:
</details>

## Bonus 2 : Les catégories

### 1ère partie, les badges du menu de gauche

Allez, go.

<details>
<summary>Des indices ?</summary>

- Écrire une requête dans dataMapper pour récupérer _le nombre de figurines_ de chaque produit.
- Appeler cette requête dans toutes les pages ou on en a besoin !

</details>

### 2ème partie, les liens du menu de gauche

Chaque lien doit envoyer vers une page qui ne liste que les figurines de la catégorie cliquée. Tout est dit !

## Bonus DE LA MORT : Les notes

Trouver un moyen de calculer et d'afficher la note globale de chaque figurine à partir des notes des reviews associés.
