// Import des classes depuis les modules externes
import FormValidator from "./module/FormValidator.js"; // Importe la classe FormValidator depuis le fichier FormValidator.js
import ErrorManager from "./module/ErrorForm.js"; // Importe la classe ErrorManager depuis le fichier ErrorForm.js
import Storage from "./module/Storage.js"; // Importe la classe Storage depuis le fichier Storage.js

// Écouteur d'événement lorsque le DOM est entièrement chargé
document.addEventListener("DOMContentLoaded", () => {
  // Récupération des éléments DOM principaux
  const form = document.getElementById("contactForm"); // Sélectionne le formulaire avec l'id 'contactForm'
  const errorManager = new ErrorManager(); // Initialise un nouveau gestionnaire d'erreurs pour le formulaire
  const messageSucces = document.getElementById("message-succes"); // Sélectionne l'élément pour afficher les messages de succès

  // Initialisation du validateur de formulaire avec le formulaire et le gestionnaire d'erreurs
  const formValidator = new FormValidator(form, errorManager);
  formValidator.init(); // Initialise les événements de validation des champs du formulaire

  // Écouteur d'événement sur la soumission du formulaire
  form.addEventListener("submit", (event) => {
    event.preventDefault(); // Empêche le comportement par défaut du formulaire qui est de recharger la page

    // Validation du formulaire
    const isFormValid = formValidator.validateForm(); // Vérifie si le formulaire est valide

    if (isFormValid) {
      // Si le formulaire est valide, enregistrer les données
      const formData = formValidator.getFormData(); // Récupère les données validées du formulaire
      const storage = new Storage(); // Initialise un gestionnaire de stockage pour les contacts
      storage.addContact(formData); // Ajoute les données du formulaire au stockage
      formValidator.clearForm(); // Efface le contenu du formulaire après soumission réussie
      showMessage(messageSucces, "Contact enregistré avec succès.", "succes"); // Affiche un message de succès à l'utilisateur
    } else {
      // Si des erreurs de validation sont présentes, afficher les messages d'erreur
      const errors = formValidator.getErrors(); // Récupère les erreurs de validation du formulaire
      displayErrors(errors); // Affiche les messages d'erreur à côté des champs concernés
    }
  });
});

// Fonction pour afficher les messages d'erreur dans le formulaire
function displayErrors(errors) {
  for (const fieldName in errors) {
    const errorField = document.getElementById(`erreur-${fieldName}`); // Sélectionne l'élément d'erreur spécifique pour chaque champ du formulaire
    if (errorField) {
      errorField.textContent = errors[fieldName]; // Affiche le message d'erreur sous le champ de formulaire concerné
    }
  }
}

// Fonction pour afficher un message à l'utilisateur
function showMessage(element, message, messageType) {
  element.textContent = message; // Affiche le message dans l'élément spécifié (message-succes)
  element.classList.add(messageType); // Ajoute une classe CSS pour styliser le message (succes)

  // Supprime le message après quelques secondes pour ne pas encombrer l'interface utilisateur
  setTimeout(() => {
    element.textContent = ""; // Efface le contenu du message
    element.classList.remove(messageType); // Retire la classe CSS ajoutée pour le message
  }, 3000); // Délai en millisecondes (3 secondes) avant que le message ne disparaisse
}

// Explication détaillée :
// Imports (import ... from './modules/...') :

// Les import permettent de charger les fonctionnalités nécessaires depuis d'autres fichiers JavaScript (FormValidator, ErrorManager, Storage) pour organiser et réutiliser le code de manière modulaire.
// Écouteur d'événement DOMContentLoaded :

// document.addEventListener('DOMContentLoaded', () => { ... }); attend que le DOM soit complètement chargé avant d'exécuter le code à l'intérieur, assurant ainsi que tous les éléments du formulaire et les scripts externes sont prêts à être utilisés.
// Récupération des éléments DOM principaux :

// const form = document.getElementById('contactForm'); récupère le formulaire avec l'id 'contactForm'.
// const errorManager = new ErrorManager(); initialise une nouvelle instance de ErrorManager pour gérer les erreurs de formulaire.
// const messageSucces = document.getElementById('message-succes'); récupère l'élément destiné à afficher les messages de succès.
// Initialisation du validateur de formulaire (FormValidator) :

// const formValidator = new FormValidator(form, errorManager); crée une nouvelle instance de FormValidator en passant le formulaire et le gestionnaire d'erreurs en tant que paramètres.
// formValidator.init(); initialise les événements de validation des champs du formulaire pour détecter les erreurs lorsque l'utilisateur interagit avec les champs.
// Écouteur d'événement submit sur le formulaire :

// form.addEventListener('submit', (event) => { ... }); écoute lorsque l'utilisateur soumet le formulaire.
// Validation du formulaire et gestion des soumissions :

// event.preventDefault(); empêche le comportement par défaut du formulaire (rechargement de la page).
// formValidator.validateForm(); vérifie si le formulaire est valide en utilisant le validateur FormValidator.
// formValidator.getFormData(); récupère les données validées du formulaire une fois validé.
// Gestion des succès et des erreurs :

// Si le formulaire est valide (isFormValid), les données sont ajoutées au stockage via Storage, le formulaire est effacé, et un message de succès est affiché à l'utilisateur.
// Sinon, les erreurs de validation sont récupérées via formValidator.getErrors() et affichées à côté des champs de formulaire correspondants à l'aide de displayErrors().
// Fonction displayErrors(errors) :

// displayErrors(errors) parcourt chaque erreur dans errors et affiche le message d'erreur sous le champ de formulaire correspondant en utilisant l'id erreur-${fieldName}.
// Fonction showMessage(element, message, messageType) :

// showMessage(element, message, messageType) affiche un message (succès ou erreur) dans element avec le contenu message et applique une classe CSS (messageType) pour styliser le message.
// Utilise setTimeout() pour effacer le message après 3 secondes en supprimant le contenu et la classe CSS ajoutée.
// Pourquoi le code est rédigé de cette façon :
// Organisation modulaire : Les imports et l'utilisation de classes comme FormValidator, ErrorManager, et Storage permettent de structurer le code de manière à isoler et réutiliser des fonctionnalités spécifiques (validation de formulaire, gestion des erreurs, stockage des données).

// Gestion des événements : Les écouteurs d'événements comme DOMContentLoaded et submit permettent de déclencher des actions au bon moment (lorsque le DOM est prêt ou lors de la soumission du formulaire) pour assurer une interaction fluide avec l'utilisateur.

// Encapsulation des responsabilités : Chaque fonction (validation, affichage des erreurs, gestion des messages de succès) a une tâche claire et est encapsulée dans une fonction distincte, ce qui rend le code plus lisible, maintenable et extensible.

// Utilisation de setTimeout() : Permet de fournir un feedback à l'utilisateur de manière non intrusive en affichant des messages temporaires (succès ou erreurs) qui disparaissent automatiquement après quelques secondes, améliorant ainsi l'expérience utilisateur.

// En résumé, ce code utilise des bonnes pratiques de développement web pour assurer la validation efficace des formulaires, la gestion des erreurs et la rétroaction utilisateur, tout en maintenant une structure modulaire et facile à comprendre.
