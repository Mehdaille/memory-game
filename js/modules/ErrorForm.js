export default class ErrorForm {
  // Méthode pour ajouter un message d'erreur à un champ de formulaire
  addError(field, message) {
    // Génère l'identifiant de l'élément d'erreur basé sur le nom du champ
    const errorElementId = `erreur-${field.name}`;
    // Trouve l'élément d'erreur dans le document par son identifiant
    const errorElement = document.getElementById(errorElementId);

    // Vérifie si l'élément d'erreur existe dans le DOM
    if (errorElement) {
      // Met à jour le contenu de l'élément d'erreur avec le message d'erreur
      errorElement.textContent = message;
      // Ajoute une classe CSS 'invalid' au champ de formulaire pour indiquer une erreur
      field.classList.add("invalid");
    }
  }

  // Méthode pour supprimer le message d'erreur d'un champ de formulaire
  removeError(field) {
    // Génère l'identifiant de l'élément d'erreur basé sur le nom du champ
    const errorElementId = `erreur-${field.name}`;
    // Trouve l'élément d'erreur dans le document par son identifiant
    const errorElement = document.getElementById(errorElementId);

    // Vérifie si l'élément d'erreur existe dans le DOM
    if (errorElement) {
      // Efface le contenu de l'élément d'erreur
      errorElement.textContent = "";
      // Retire la classe CSS 'invalid' du champ de formulaire pour indiquer que l'erreur est corrigée
      field.classList.remove("invalid");
    }
  }

  // Méthode pour effacer tous les messages d'erreur sur le formulaire
  clearErrors() {
    // Sélectionne tous les éléments avec la classe CSS 'erreur' (éléments d'erreur)
    const errorElements = document.querySelectorAll(".erreur");
    // Sélectionne tous les champs de formulaire avec la classe CSS 'invalid' (champs invalides)
    const invalidFields = document.querySelectorAll(".invalid");

    // Parcourt tous les éléments d'erreur trouvés
    errorElements.forEach((errorElement) => {
      // Efface le contenu de chaque élément d'erreur
      errorElement.textContent = "";
    });

    // Parcourt tous les champs de formulaire invalides trouvés
    invalidFields.forEach((field) => {
      // Retire la classe CSS 'invalid' de chaque champ de formulaire
      field.classList.remove("invalid");
    });
  }
}

// Explication détaillée :
// Classe ErrorForm :

// export default class ErrorForm { ... }: Définit une classe JavaScript appelée ErrorForm qui est exportée par défaut, ce qui signifie qu'elle peut être importée et utilisée dans d'autres fichiers JavaScript.
// Méthode addError(field, message) :

// addError(field, message) { ... }: C'est une méthode de la classe ErrorForm qui prend deux paramètres : field (le champ de formulaire concerné) et message (le message d'erreur à afficher).
// const errorElementId = erreur-${field.name};: Crée un identifiant unique pour l'élément d'erreur basé sur le nom du champ de formulaire.
// const errorElement = document.getElementById(errorElementId);: Recherche dans le document un élément ayant l'identifiant errorElementId.
// if (errorElement) { ... }: Vérifie si l'élément d'erreur existe dans le DOM.
// errorElement.textContent = message;: Met à jour le contenu textuel de l'élément d'erreur avec le message d'erreur fourni.
// field.classList.add('invalid');: Ajoute la classe CSS invalid au champ de formulaire pour indiquer qu'il contient une erreur visuelle.
// Méthode removeError(field) :

// removeError(field) { ... }: C'est une méthode de la classe ErrorForm qui prend un paramètre field (le champ de formulaire concerné).
// const errorElementId = erreur-${field.name};: Génère l'identifiant unique de l'élément d'erreur comme précédemment.
// const errorElement = document.getElementById(errorElementId);: Recherche l'élément d'erreur dans le document.
// if (errorElement) { ... }: Vérifie si l'élément d'erreur existe.
// errorElement.textContent = '';: Efface le contenu textuel de l'élément d'erreur.
// field.classList.remove('invalid');: Retire la classe CSS invalid du champ de formulaire, indiquant que l'erreur a été corrigée.
// Méthode clearErrors() :

// clearErrors() { ... }: C'est une méthode qui efface tous les messages d'erreur présents sur le formulaire.
// const errorElements = document.querySelectorAll('.erreur');: Sélectionne tous les éléments avec la classe CSS erreur (habituellement utilisée pour les messages d'erreur).
// const invalidFields = document.querySelectorAll('.invalid');: Sélectionne tous les champs de formulaire qui ont la classe CSS invalid (indiquant un champ de formulaire en erreur).
// errorElements.forEach((errorElement) => { ... });: Parcourt tous les éléments d'erreur trouvés et efface leur contenu textuel.
// invalidFields.forEach((field) => { ... });: Parcourt tous les champs de formulaire invalides trouvés et retire la classe invalid, restaurant leur apparence normale.
// Pourquoi le code est rédigé de cette façon :
// Utilisation des IDs et des classes CSS : Les identifiants (errorElementId) et les classes CSS (invalid) sont utilisés pour cibler spécifiquement les éléments d'erreur et les champs de formulaire concernés, permettant ainsi une manipulation précise et ciblée via JavaScript et CSS.

// Gestion des messages d'erreur : Les méthodes addError, removeError et clearErrors sont conçues pour gérer efficacement l'affichage et la suppression des messages d'erreur associés aux champs de formulaire, améliorant ainsi l'expérience utilisateur en fournissant des retours visuels clairs lors de la saisie de données.

// Modularité et réutilisabilité : La classe ErrorForm est conçue pour être réutilisable dans différents formulaires sans dépendre d'une implémentation spécifique de validation de formulaire, ce qui la rend adaptable à divers besoins de validation et de gestion des erreurs dans les applications web.

// En résumé, ErrorForm est une classe JavaScript bien structurée et modulaire qui offre des méthodes simples mais efficaces pour gérer les messages d'erreur associés aux champs de formulaire, contribuant ainsi à une expérience utilisateur plus fluide et intuitive lors de l'interaction avec les formulaires web.
