# P7 - Créer un réseau social d'entreprise

Ce repository correspond au Projet 7 du cursus **Développeur Web** d'*OpenClassrooms*.

## Brief du projet

Afin de savoir en quoi consiste ce projet, cliquez [ici](/scenario.pdf).

## Stack utilisées

![MERN](https://i0.wp.com/leblogducodeur.fr/wp-content/uploads/2019/12/1_Y5S3wOm52_4iYusUagbEtw.jpeg?fit=1300%2C744&ssl=1)

Pour ce projet, j'ai utilisé les techno suivantes : 

 - **React JS** : pour l'application *front-end* de notre projet
 - **Node JS** combiné au framework **Express** : pour le développement de la partie *back-end* de notre projet
 - **MongoDB** combiné à l'ODM **Mongoose** : pour ce qui est de la création et de la communication avec la *base de données*

## Installation du projet sur votre ordinateur

Dans un premier temps, je vous conseille de créér un dossier sur votre bureau. À l'aide de votre terminal de commande, rendez-vous dans ce dossier précédémment crée, et faîtes la commande suivante : `git clone https://github.com/Xemn/SpysschaertSteven_7_09082022.git`.
Bien sûr il faut que les commandes **git** soit installées sur votre ordianteur, pour le savoir facilement faite dans votre terminal la commande suivante : `git version`. Si cette commande ne vous renvoie rien, alors je vous invite à installer **git** sur votre machine afin de procéder à la suite de l'installation de projet.

### Installation de la partie back-end de ce projet 

Afin d'installer la partie back-end de ce projet vous aurez besoin de node d'installer sur votre machine. Pour le savoir, il vous suffit de lancer votre temrnial de commande et de taper la commande suivante : `node -v`, si cela ne vous renvoie rien alors je vous invite à installer node sur votre machine.

A titre informatif, la version de **nodeJS** utilisée pour ce projet est la version : *18.6.5*

Vous aurez ensuite besoin d'un compte **MongoDB**. Si vous n'en possédez pas, je vous invite à en créer un, [ici](https://account.mongodb.com/account/register).

Une fois vous êtes assuré d'avoir ce qu'il faut, il vous faudra : 
    - Vous rendre dans le dossier *back-end*, via votre terminal à l'aide de la commande `cd BackEnd`,
    - Taper la commande suivante : `npm i`, ce qui installera toutes les dépendances nécéssaires à notre *back-end*, tel que le framework **Express** ou encore l'ODM **Mongoose**,
    - Vous serez ensuite capable de lancer le serveur à l'aide de la commande : `npx nodemon`.

Notez qu'après avoir lancé la commande `npx nodemon`, votre terminal devrait vous renvoyer une erreur. N'ayez crainte cette erreur est tout à fait normale.
Il faut que vous sachiez qu'actuellement votre serveur n'est pas relié à votre base de données **MongoDB**.

Pour que ça soit le cas il vous faudra : 
    - Dans un premier temps créer un fichier `.env`à la racine de votre dossier **BackEnd**,
    - Insérer précisément ceci : `HTTPS_PROXY=` suivi de ce que je vais appelé la clé de connexion à votre base de donnée. Clé que vous trouverez sur votre compte **MongoDB**, en cliquant sur le bouton `Connect` puis `Connect using Vs Code` et en copiant cette clé donnée lors de l'étape 3. N'oubliez pas de remplacer `<password>` par votre mot de passe.

Vous y êtes presque, voici les dernières choses à faire afin que votre serveur soit totalement opérationnel et puisse marcher avec le code existant : 
     - Insérer ensuite : `TOKEN_KEYPHRASE=` suivi d'une chaîne de caractère,
    par exemple celle que j'ai utilisée : `"l3L8-V663^K!"`. Ce qui me donnait : `TOKEN_KEYPHRASE= "l3L8-V663^K!"` dans fichier `.env`,
    - Et pour finir : crèer à la racine de votre dossier **BackEnd** un dossier nommé : **images**.

Je sais que tout ceci est fastidieux dependant ces étapes sont nécéssaires afin que le projet puisse tourner sur votre machine.

### Installation de la partie front-end de ce projet

Soyez rassuré, afin de faire fonctionner la partie front-end, vous n'aurez partiquement rien à faire.

Avant de lancer l'application **front-end** vous devrez encore une fois créer un fichier `.env ` à la racine de votre dossier `my-app` et insérer dans ce fichier la ligne suivante : `REACT_APP_API_URL = `. Vous ferez suivre cette ligne de code par l'URL de votre API.

Vous pourrez enfin lancé votre application **front-end** en vous mettant à la racine de votre dossier `my-app` et en tapant la commande suivante : `npm start`, normalement votre navigateur s'ouvrira sur la page `http://localhost:3000`. Si ce n'est pas le cas tapez donc l'URL précédente dans votre navigateur.

### Nota Benne

Il est important de savoir que votre serveur doit fonctionné en même temps que votre application, sinon aucune des fonctionnalités présentes dans ce code ne fonctionneront.

## Fonctionnalités de ce projet

Dans les fonctionnalités présentes sur cette application, vous pourrez retrouver pour un **utilisateur lambda** : 
    - La capacité de vous *connecter*,
    - La capcaité de vous *enregistrer*,
    - La capacité de *créer* un post, avec ou sans image,
    - La capacité de *modifier* vos posts,
    - La capacité de *supprimer* un ou plusieurs de vos posts.
En plus des fonctionnalités précédentes, un **administrateur** pourra : 
    - *Modifier* **n'importe quel** post,
    - *Supprimer* **n'importe quel** post.

