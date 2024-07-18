export default class Storage {
  constructor() {
    // Initialise la clé utilisée pour stocker les contacts dans localStorage
    this.contactsKey = "contacts";
  }

  // Méthode pour récupérer les contacts depuis localStorage
  getContactsFromLocalStorage() {
    // Récupère les données JSON des contacts depuis localStorage
    const contactsJSON = localStorage.getItem(this.contactsKey);
    // Si des données existent, les parse en tableau JavaScript, sinon retourne un tableau vide
    return contactsJSON ? JSON.parse(contactsJSON) : [];
  }

  // Méthode pour ajouter un nouveau contact à localStorage
  addContact(contact) {
    // Récupère tous les contacts existants depuis localStorage
    const contacts = this.getContactsFromLocalStorage();
    // Ajoute le nouveau contact à la liste des contacts existants
    contacts.push(contact);
    // Enregistre la liste mise à jour dans localStorage après l'avoir convertie en JSON
    localStorage.setItem(this.contactsKey, JSON.stringify(contacts));
  }

  // Méthode pour récupérer tous les contacts depuis localStorage
  getContacts() {
    // Renvoie tous les contacts stockés dans localStorage
    return this.getContactsFromLocalStorage();
  }

  // Méthode pour supprimer un contact spécifique depuis localStorage
  removeContact(contact) {
    // Récupère tous les contacts existants depuis localStorage
    const contacts = this.getContactsFromLocalStorage();
    // Filtrage pour exclure le contact spécifique à supprimer
    const updatedContacts = contacts.filter((c) => c.mail !== contact.mail);
    // Enregistre la liste mise à jour des contacts dans localStorage après conversion en JSON
    localStorage.setItem(this.contactsKey, JSON.stringify(updatedContacts));
  }
}
// Explication détaillée :
// Classe Storage :

// export default class Storage { ... }: Définit une classe JavaScript appelée Storage qui est exportée par défaut pour pouvoir être utilisée ailleurs dans le code.
// Constructeur (constructor() { ... }) :

// Le constructeur est une méthode spéciale qui est exécutée automatiquement lorsqu'une nouvelle instance de Storage est créée.
// this.contactsKey = 'contacts'; : Initialise this.contactsKey à 'contacts', une chaîne utilisée comme clé pour stocker les contacts dans localStorage.
// Méthode getContactsFromLocalStorage() { ... } :

// getContactsFromLocalStorage() récupère les contacts depuis localStorage.
// localStorage.getItem(this.contactsKey); récupère les données JSON des contacts stockés sous la clé 'contacts'.
// return contactsJSON ? JSON.parse(contactsJSON) : []; : Si des données existent, elles sont converties de JSON en tableau JavaScript à l'aide de JSON.parse(), sinon un tableau vide est retourné.
// Méthode addContact(contact) { ... } :

// addContact(contact) ajoute un nouveau contact à localStorage.
// const contacts = this.getContactsFromLocalStorage(); récupère tous les contacts existants.
// contacts.push(contact); ajoute le nouveau contact à la liste des contacts existants.
// localStorage.setItem(this.contactsKey, JSON.stringify(contacts)); enregistre la liste mise à jour dans localStorage après l'avoir convertie en JSON avec JSON.stringify().
// Méthode getContacts() { ... } :

// getContacts() récupère tous les contacts actuellement stockés dans localStorage.
// Appelle simplement getContactsFromLocalStorage() pour obtenir et renvoyer tous les contacts.
// Méthode removeContact(contact) { ... } :

// removeContact(contact) supprime un contact spécifique de localStorage.
// const contacts = this.getContactsFromLocalStorage(); récupère tous les contacts existants.
// const updatedContacts = contacts.filter((c) => c.mail !== contact.mail); filtre pour exclure le contact spécifique à supprimer.
// localStorage.setItem(this.contactsKey, JSON.stringify(updatedContacts)); enregistre la liste mise à jour des contacts dans localStorage après conversion en JSON.
// Pourquoi le code est rédigé de cette façon :
// Utilisation de localStorage : localStorage est une fonctionnalité du navigateur qui permet de stocker des données localement dans le navigateur web de l'utilisateur. Ce code l'utilise pour stocker et récupérer des contacts.

// Encapsulation : La classe Storage encapsule toute la logique nécessaire pour gérer les contacts dans localStorage, ce qui permet une réutilisation facile et une séparation claire des responsabilités dans l'application.

// Utilisation de méthodes : Chaque méthode a une responsabilité claire : addContact pour ajouter un contact, getContacts pour récupérer tous les contacts, removeContact pour supprimer un contact. Cela rend le code plus lisible et plus facile à maintenir.

// Conversion JSON : Avant de stocker des données dans localStorage, elles sont converties en JSON avec JSON.stringify() pour les rendre compatibles avec localStorage. Avant de les utiliser, elles sont converties de JSON en objets JavaScript avec JSON.parse().

// En conclusion, la classe Storage fournit une interface simple et efficace pour gérer les contacts dans localStorage, en utilisant les fonctionnalités intégrées du navigateur de manière sécurisée et efficace.
