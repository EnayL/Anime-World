# REST API

# Thème utilisé : Animé

# Comment accéder à notre API :

- Afin de pouvoir obtenir notre API il suffit de git clone le projet en question depuis cette commande :

> git clone https://rendu-git.etna-alternance.net/module-9046/activity-49567/group-985252.git RESTAPI

- Avant de commencer la moindre chose il faudrait installer quelques packages de npm afin que l'utilisation de cette API soit entièrement fonctionnel :

```
npm install mongoose
rm -rf node_modules package-lock.json && npm install && npm start (Cette commande permet de régler les problèmes de dépendances qu'on pourrait rencontrer)
npm audit fix --force
npm install --save-dev nodemon@latest
npm install --save multer
npm install jsonwebtoken
npm install bcrypt —save
```

- Après avoir fait tout cela vous pourrez accéder au dossier nommé "myapi" et effectuer la commande :

  > npm start

- Ce qui lancera notre API que vous pourrez essayer.

# Ce qui est disponible au sein de notre API :

- Au sein de notre API nous avons différentes routes : Login, Register, les routes Studio et les routes Oeuvre.

- Route Register et Login on les propriété classique d'un Login et d'un Register excepté le faite qu'il y a un patch du Login (l'email)

- Les routes Studio quant à elle possède une création de studio, l'afficher de tous les studios, l'affichage d'un studio à l'aide de son ID, supprimer un studio et le patch de celui-ci.

- Et pour finir les routes pour les Oeuvres possède comme le studio une création d'œuvre, l'affichage de toutes les œuvres, afficher une œuvre avec son ID, supprimer une œuvre et le patch de celle-ci.
