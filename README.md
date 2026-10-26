DigiDex · Mon Univers Digimon
​Un projet d'encyclopédie interactive (Dex) dédiée à l'univers Digimon, développé dans le cadre de la formation Simplon avec HTML5, Tailwind CSS et JavaScript (ES6+).


​*** Liens du Projet

​Dépôt GitHub : https://github.com/rimesti09-pixel/monDex
​Projet en ligne (GitHub Pages) : https://rimesti09-pixel.github.io/monDex/



​**** Univers et Thème Visuel

​Univers choisi : Digimon
​Types / Attributs : Vaccine, Data, Virus
​Palette de couleurs :
​Couleur principale (Brand) : Bleu (#0070F3)
​Accentuation : Orange (#FF6B00)
​Fond & Textes : Fond clair (#F8FAFC) et texte foncé (#0F172A)


​**** Source des Images et Crédits

​Toutes les images des créatures utilisées dans ce projet proviennent de :
​Digimon Wiki (Fandom / Wikimon) : https://digimon.fandom.com/


​***Fonctionnalités Réalisées

​Génération dynamique : La grille des créatures est générée automatiquement à partir du fichier data.js.
​Consultation des détails : Affichage dynamique des statistiques (PV, Attaque, Défense) avec des barres de progression au clic sur n'importe quelle carte.
​Recherche & Filtrage combinés :
​Recherche par nom ou ID en temps réel.
​Filtrage par type (Vaccine, Data, Virus, Tous).
​Gestion de l'équipe ("Mon équipe") :
​Ajout et suppression via la délégation d'événements (Event Delegation).
​Limite maximale fixée à 6 créatures avec message d'alerte en cas de dépassement ou de doublon.
​Formulaire d'ajout sécurisé : Validation stricte des données à l'aide d'expressions régulières (Regex) avec feedback visuel en temps réel.


​**** Tests des Expressions Régulières (Regex)
​Conformément aux exigences du brief, chaque champ du formulaire de création a été validé avec son expression régulière. Voici les tests d'au moins 2 valeurs valides et 2 valeurs invalides :

   =>    ​1. Identifiant (ID)

​Pattern : /^#\d{3}$/
​Explication : Doit commencer par # suivi de exactement 3 chiffres.
​Valeurs Valides :
​#013 🟢 (Format correct)
​#999 🟢 (Format correct)
​Valeurs Invalides :
​013 🔴 (Manque le symbole #)
​#12 🔴 (Contient 2 chiffres au lieu de 3)

=>    ​2. Nom (Name)

​Pattern : /^[A-Za-zÀ-ÿ0-9][A-Za-zÀ-ÿ0-9 '.-]{1,29}$/
​Explication : 2 à 30 caractères, lettres, chiffres, espaces, tirets et points autorisés.
​Valeurs Valides :
​Agumon 🟢 (Valide)
​Greymon-X 🟢 (Valide)
​Valeurs Invalides :
​A 🔴 (Moins de 2 caractères)
​<script> 🔴 (Symboles non autorisés)

  =>    ​3. Statistiques (Stats : PV, Attaque, Défense)

​Pattern : /^\d{1,3}$/
​Explication : Nombre entier compris entre 0 et 999.
​Valeurs Valides :
​450 🟢 (Valide)
​0 🟢 (Valide)
​Valeurs Invalides :
​1000 🔴 (Dépasse 3 chiffres)
​-50 🔴 (Nombre négatif non autorisé)

     =>       ​4. Lien de l'image (URL)

​Pattern : /^https:\/\/\S+\.(png|jpe?g|webp|gif)$/i
​Explication : URL sécurisée (HTTPS) se terminant par une extension d'image valide.
​Valeurs Valides :
​https://static.wikia.nocookie.net/digimon/agumon.png 🟢 (Valide)
​https://site.com/image.jpg 🟢 (Valide)
​Valeurs Invalides :
​http://site.com/image.png 🔴 (HTTP au lieu de HTTPS)
​https://site.com/document.pdf 🔴 (Extension non autorisée)

    =>     ​5. Description

​Pattern : /^[\s\S]{10,200}$/
​Explication : Texte contenant entre 10 et 200 caractères.
​Valeurs Valides :
​Un Digimon Reptile de niveau Rookie. 🟢 (36 caractères)
​Un grand dinosaure cracheur de feu. 🟢 (35 caractères)
​Valeurs Invalides :
​Court 🔴 (Moins de 10 caractères)
🔴 (Trop long)