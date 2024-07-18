export default class FormValidator {
  constructor(form, errorManager) {
    this.form = form;
    this.errorManager = errorManager;
  }

  // Méthode pour initialiser la validation des champs du formulaire
  init() {
    // Récupère tous les éléments enfants du formulaire
    const formElements = this.form.elements;

    // Parcourt chaque élément du formulaire
    for (const element of formElements) {
      // Vérifie si l'élément est un champ de saisie (input)
      if (element.nodeName === "INPUT") {
        // Ajoute un écouteur d'événement 'blur' (perte de focus) pour valider le champ
        element.addEventListener("blur", () => this.validateField(element));
      }
    }
  }

  // Méthode pour valider un champ de formulaire spécifique
  validateField(field) {
    // Récupère la valeur du champ de formulaire, en supprimant les espaces vides avant et après
    const value = field.value.trim();
    // Récupère le nom du champ de formulaire
    const fieldName = field.name;

    // Appelle la méthode removeError de l'errorManager pour effacer d'éventuels messages d'erreur précédents
    this.errorManager.removeError(field);

    // Vérifie si la valeur du champ est vide
    if (value === "") {
      // Ajoute un message d'erreur via l'errorManager si le champ est vide
      this.errorManager.addError(field, `${fieldName} ne peut pas être vide.`);
    }

    // Vous pouvez ajouter d'autres validations ici en fonction des besoins spécifiques (e-mail, mot de passe, etc.)
    if (field.name === "mail") {
      // Valide le format de l'e-mail en utilisant une expression régulière
      if (!this.validateEmail(value)) {
        // Ajoute un message d'erreur si l'e-mail n'est pas valide
        this.errorManager.addError(field, "L'adresse e-mail n'est pas valide.");
      }
    }

    if (field.name === "motdepasse") {
      // Valide le format du mot de passe en utilisant une expression régulière
      if (!this.validatePassword(value)) {
        // Ajoute un message d'erreur si le mot de passe ne respecte pas les critères requis
        this.errorManager.addError(
          field,
          "Le mot de passe doit contenir au moins 1 minuscule, 1 majuscule, 1 chiffre et 1 caractère spécial, et avoir une longueur d'au moins 8 caractères."
        );
      }
    }
  }

  // Méthode pour valider l'ensemble du formulaire
  validateForm() {
    // Récupère tous les éléments enfants du formulaire
    const formElements = this.form.elements;
    // Initialise la variable pour vérifier si le formulaire est valide
    let isFormValid = true;

    // Parcourt chaque élément du formulaire
    for (const element of formElements) {
      // Vérifie si l'élément est un champ de saisie (input)
      if (element.nodeName === "INPUT") {
        // Valide le champ de formulaire
        this.validateField(element);
        // Vérifie si le champ de formulaire contient la classe 'invalid' (erreur détectée)
        if (element.classList.contains("invalid")) {
          // Met à jour la variable isFormValid à false si une erreur est détectée
          isFormValid = false;
        }
      }
    }

    // Retourne true si le formulaire est valide, sinon false
    return isFormValid;
  }

  // Méthode pour valider le format de l'e-mail à l'aide d'une expression régulière
  validateEmail(email) {
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    return emailRegex.test(email);
  }

  // Méthode pour valider le format du mot de passe à l'aide d'une expression régulière
  validatePassword(password) {
    const passwordRegex =
      /(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;
    return passwordRegex.test(password);
  }

  // Méthode pour récupérer les données saisies dans le formulaire
  getFormData() {
    // Initialise un objet vide pour stocker les données du formulaire
    const formData = {};
    // Récupère tous les éléments enfants du formulaire
    const formElements = this.form.elements;

    // Parcourt chaque élément du formulaire
    for (const element of formElements) {
      // Vérifie si l'élément est un champ de saisie (input)
      if (element.nodeName === "INPUT") {
        // Stocke la valeur du champ dans l'objet formData, en supprimant les espaces vides avant et après
        formData[element.name] = element.value.trim();
      }
    }

    // Retourne l'objet contenant les données du formulaire
    return formData;
  }

  // Méthode pour effacer les champs du formulaire et les messages d'erreur associés
  clearForm() {
    // Réinitialise tous les champs du formulaire à leur état initial
    this.form.reset();
    // Appelle la méthode clearErrors de l'errorManager pour effacer tous les messages d'erreur
    this.errorManager.clearErrors();
  }
}

// Explication détaillée :
// Classe FormValidator :

// export default class FormValidator { ... }: Définit une classe JavaScript appelée FormValidator qui est exportée par défaut pour pouvoir être utilisée ailleurs dans le code.
// Constructeur (constructor(form, errorManager) { ... }) :

// Le constructeur initialise une nouvelle instance de FormValidator avec deux paramètres : form, qui représente le formulaire à valider, et errorManager, qui est un objet gérant la gestion des erreurs.
// Méthode init() { ... } :

// init() configure la validation des champs du formulaire en ajoutant un écouteur d'événement blur (perte de focus) à chaque champ de saisie (input). Lorsque l'utilisateur quitte un champ de saisie, la méthode validateField() est appelée pour valider son contenu.
// Méthode validateField(field) { ... } :

// validateField(field) est appelée lorsqu'un champ de saisie perd le focus (blur).
// Elle récupère la valeur du champ, vérifie si elle respecte les critères spécifiés (comme ne pas être vide, ou respecter un format d'e-mail ou de mot de passe), et utilise errorManager pour gérer l'affichage des messages d'erreur.
// Méthode validateForm() { ... } :

// validateForm() parcourt tous les champs du formulaire et valide chacun d'eux en appelant validateField().
// Si un champ est invalide (marqué avec la classe CSS invalid), la méthode retourne false, sinon elle retourne true indiquant que tous les champs sont valides.
// Méthodes de validation (validateEmail(email), validatePassword(password)) :

// Ces méthodes utilisent des expressions régulières pour valider le format d'un e-mail et d'un mot de passe respectivement.
// Méthode getFormData() { ... } :

// getFormData() récupère les valeurs actuelles des champs du formulaire et les stocke dans un objet formData, qui est ensuite retourné pour être utilisé par d'autres parties de l'application.
// Méthode clearForm() { ... } :

// clearForm() réinitialise tous les champs du formulaire en appelant this.form.reset(), puis utilise errorManager pour effacer tous les messages d'erreur en appelant clearErrors().
// Pourquoi le code est rédigé de cette façon :
// Encapsulation et modularité : La classe FormValidator encapsule toute la logique nécessaire pour valider et récupérer les données d'un formulaire. Cela facilite la réutilisation et la maintenance du code.

// Utilisation d'écouteurs d'événements : En utilisant des écouteurs d'événements comme blur, la validation des champs se déclenche de manière appropriée lorsque l'utilisateur interagit avec le formulaire, améliorant ainsi l'expérience utilisateur.

// Séparation des préoccupations : La classe FormValidator se concentre uniquement sur la validation des données de formulaire. Elle délègue la gestion des erreurs (addError, removeError, clearErrors) à errorManager, suivant ainsi le principe de séparation des préoccupations pour un code plus propre et plus maintenable.

// En résumé, FormValidator est une composante
