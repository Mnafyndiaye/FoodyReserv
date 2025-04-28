# FoodyReserv - Plateforme Web pour Restaurant

## 📋 Aperçu du projet

FoodyReserv est une plateforme web conçue pour un restaurant afin de moderniser ses services. Elle permet aux clients de consulter le menu, passer des commandes en ligne, effectuer des paiements, choisir la livraison et réserver une table. L'objectif est d'offrir une expérience utilisateur fluide et sécurisée tout en optimisant la gestion des opérations du restaurant.

## Objectifs

- Développer une application web responsive pour la commande de plats et la réservation de tables.
- Intégrer des services de paiement mobile (Wave, Orange Money).
- Implémenter une fonctionnalité de livraison via des livreurs disponibles ou l'API Yango.
- Proposer un module de réservation de table avec confirmation et gestion.
- Créer des interfaces distinctes pour les clients, les gérants/serveurs et les livreurs.

## Fonctionnalités

### Interface Client

- **Page d'accueil** : Présentation du restaurant.
- **Consultation du menu** : Navigation par catégories.
- **Panier** : Ajout/suppression d'articles et révision des commandes.
- **Paiement** : Paiement sécurisé via les APIs Wave ou Orange Money.
- **Suivi de commande** : Suivi de l'état de la commande (en préparation, prêt, en livraison).
- **Options de livraison** : Choix entre récupération sur place ou livraison avec saisie d'adresse.
- **Authentification** : Connexion/inscription des utilisateurs.
- **Réservation de table** :
  - Sélection de la date, de l'heure et du nombre de couverts.
  - Visualisation des disponibilités en temps réel.
  - Confirmation par email/SMS.
  - Modification ou annulation des réservations via l'espace client.

### Interface Gérant/Serveur

- **Tableau de bord** : Vue des commandes en cours et statistiques de base.
- **Gestion du menu** : Création, modification, suppression des plats (CRUD).
- **Gestion des commandes** : Traitement des commandes reçues.
- **Affectation des livreurs** : Attribution des commandes aux livreurs.
- **Suivi des paiements** : Vérification des statuts de paiement.

### Interface Livreurs

- **Liste des livraisons** : Affichage des livraisons attribuées.
- **Mise à jour du statut** : Marquer une livraison comme "en cours" ou "livrée".

### Module de Réservation

- **Page de réservation client** : Interface pour réserver une table.
- **Planning des tables** : Gestion des disponibilités et créneaux horaires.
- **Back-office** : Validation, modification ou annulation des réservations.
- **Notifications** : Envoi automatique d'emails/SMS pour confirmations et rappels.

## Cas d'Utilisation

1. **Réserver une table** :
   - Le client sélectionne une date, une heure et un nombre de couverts.
   - Le système vérifie la disponibilité et confirme par email/SMS.
   - Des créneaux alternatifs sont proposés si le créneau choisi est complet.
2. **Modifier une réservation** :
   - Le client met à jour les détails d'une réservation existante.
   - Le système vérifie la nouvelle disponibilité et confirme.
3. **Annuler une réservation** :
   - Le client annule une réservation.
   - Le système met à jour et notifie par email/SMS.
4. **Gérer les réservations** :
   - Le gérant consulte et traite les demandes de réservation.
   - Met à jour le planning et informe les clients.

## Pile Technologique

| Composant | Technologie |
| --- | --- |
| **Frontend** | React.js, Tailwind CSS |
| **Backend** | Spring Boot |
| **Base de Données** | PostgreSQL |
| **Authentification** | JWT, OAuth2 (si nécessaire) |
| **Paiement** | APIs Wave/Orange Money |
| **Livraison** | API Yango ou gestion manuelle |
| **Réservation** | Module interne ou API tierce |
| **Hébergement** | VPS (DigitalOcean, AWS) |
| **Déploiement** | Docker |

## Livrables

- Code source complet (frontend et backend).
- Schéma et configuration de la base de données PostgreSQL.
- Documentation technique.
- Manuel utilisateur.
- Maquettes UI/UX.
- Démo hébergée en ligne.
- Optionnel : Vidéo de présentation.

## Contraintes et Risques

- **Disponibilité des APIs** : Dépendance aux APIs Wave, Orange Money, réservation.
- **Gestion des erreurs** : Gestion robuste des erreurs de paiement et de réservation.
- **Sécurité** : Protection des transactions et des données personnelles.
- **Optimisation mobile** : Design responsive pour appareils mobiles.
- **Scalabilité** : Gestion des pics de trafic ou de réservations.

## Installation et Configuration

1. **Cloner le Répertoire** :

   ```bash
   git clone https://github.com/Mnafyndiaye/FoodyReserv.git
   cd foodyreserv
   ```
2. **Installer les Dépendances** :
   - Frontend :

     ```bash
     cd foodyfront
     npm install
     ```
   - Backend :
     - Assurez-vous d'avoir Maven installé.

     ```bash
     cd foodyback
     mvn install
     ```
3. **Configurer l'Environnement** :
   - Créer un fichier `application.properties` dans `server/src/main/resources` avec :

     ```properties
     spring.datasource.url=votre_chaine_connexion_postgres
     spring.datasource.username=votre_utilisateur
     spring.datasource.password=votre_mot_de_passe
     jwt.secret=votre_secret_jwt
     wave.api.key=votre_cle_api_wave
     om.api.key=votre_cle_api_orange_money
     yango.api.key=votre_cle_api_yango
     ```
4. **Configurer la Base de Données** :
   - Initialiser PostgreSQL et exécuter les migrations (si vous utilisez Flyway ou Liquibase) :

     ```bash
     mvn spring-boot:run
     ```
5. **Lancer l'Application** :
   - Démarrer le backend :

     ```bash
     cd foodyback
     mvn spring-boot:run
     ```
   - Démarrer le frontend :

     ```bash
     cd foodyfront
     npm start
     ```
6. **Accéder à l'Application** :
   - Ouvrir `http://localhost:3000` dans votre navigateur.


### 👥 Auteurs
- Devops : Maman Nafy Ndiaye 
- Scrum Master : Mame Diarra Bousso 
- Product owner : Aissatou Fofana
- Dev Frontend : Ndeye Ndella Diop 
- Dev Backend: Massina Sylvanus Bassene 
