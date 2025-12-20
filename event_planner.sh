#!/bin/bash

DB_USER="root"
SCRIPT_PATH="sql/script.sql"
PROCEDURE_PATH="sql/procedures.sql"
# SEED_PATH="sql/seed.sql"
USERS_PATH="sql/users.sql"
DB_NAME="event_planner"

echo "-------------------------------------------------------------------------"
echo "🏗️  ÉTAPE 0 : Initialisation du repo via NPM"
if npm ci; then
    echo ""
    echo "✅ Modules ou packages installés"
else
    echo ""
    echo "❌ erreur lors de l'installation des modules"
fi

echo ""
echo "-------------------------------------------------------------------------"
echo "🏗️  ÉTAPE 1 : Construction de la base de données... (MDP du root demandé)"

if mysql -u $DB_USER -p < "$SCRIPT_PATH"; then
    sleep 1
    echo ""
    echo "🔍 Est-ce que la db '$DB_NAME' existe déjà ?"
    sleep 1
    echo ""
    echo "🚪 Rentrons dans '$DB_NAME'"
    sleep 1
    echo ""
    echo "📆 Créons au besoin la table 'event'"
    sleep 1
    echo ""
    echo "📝 Créons au besoin la table 'register'"
    sleep 1
    echo ""
    echo "✅ Base '$DB_NAME' importée avec succès."
else
    echo "❌ Erreur lors de l'import."
    exit 1
fi

echo ""
echo "-------------------------------------------------------------------------"
echo "🏗️  ÉTAPE 2 : Création des procédures... (MDP du root demandé)"

if mysql -u $DB_USER -p < "$PROCEDURE_PATH"; then
    sleep 1
    echo ""
    echo "➕ Création de la procédure 'create_event'"
    echo ""
    echo "Vous devrez y indiquer 5 arguments :"
    echo "- Le nom de l'évènement"
    echo "- Le date de début de l'évènement"
    echo "- Le date de fin de l'évènement"
    echo "- Le nombre max. de participants de l'évènement"
    echo "- La localisation de l'évènement"
    sleep 1
    echo ""
    echo "➕ Création de la procédure 'register_person'"
    echo ""
    echo "Vous devrez y indiquer 4 arguments :"
    echo "- L'id de l'évènement"
    echo "- Le prénom du participant"
    echo "- Le nom de famille du participant"
    echo "- Le date à laquelle la participation est inscrite"
    sleep 1
    echo ""
    echo "➕ Création de la procédure 'unregister_person'"
    echo ""
    echo "Vous devrez y indiquer 3 arguments :"
    echo "- L'id de l'évènement"
    echo "- Le prénom du participant"
    echo "- Le nom de famille du participant"
    sleep 1
    echo ""
    echo "➕ Création de la procédure 'delete_event'"
    echo ""
    echo "Vous devrez y indiquer 1 argument :"
    echo "- L'id de l'évènement"
    sleep 1
    echo ""
    echo "➕ Création de la procédure 'update_event_dates'"
    echo ""
    echo "Vous devrez y indiquer 3 arguments :"
    echo "- L'id de l'évènement"
    echo "- La nouvelle date de début de l'évènement"
    echo "- La nouvelle date de fin de l'évènement"
    sleep 1
    echo ""
    echo "➕ Création de la procédure 'find_event_id'"
    echo ""
    echo "Vous devrez y indiquer 1 argument :"
    echo "- Une string avec le mot ou la partie de mot que vous cherchez"
    sleep 1
    echo ""
    echo "✅ Procédures importées avec succès."
else
    echo "❌ Erreur lors de la création des procédures."
    exit 1
fi

# echo ""
# echo "-------------------------------------------------------------------------"
# echo "💉  ÉTAPE 3 : Injection des données... (MDP du root demandé)"

# if mysql -u $DB_USER -p < "$SEED_PATH"; then
#     sleep 1
#     echo ""
#     echo "📆 Injection des events"
#     sleep 1
#     echo ""
#     echo "📝 Injection des inscriptions"
#     sleep 1
#     echo ""
#     echo "✅ Données injectées avec succès."
# else
#     echo "❌ Erreur lors de l'injection des données."
#     exit 1
# fi

echo ""
echo "-------------------------------------------------------------------------"
echo "🎅🏼  ÉTAPE 3 : Création des utilisateurs... (MDP du root demandé)"

if mysql -u $DB_USER -p < "$USERS_PATH"; then
    sleep 1
    echo ""
    echo "➕ Création de l'utilisateur 1"
    sleep 1
    echo ""
    echo "➕ Ajout des droits 'SELECT' et 'CALL'"
    sleep 1
    echo ""
    echo "✅ Utilisateur(s) créé(s) avec succès."
else
    echo "❌ Erreur lors de création de(s) utilisateur(s)."
    exit 1
fi

echo ""
echo "-------------------------------------------------------------------------"
echo "🥭  ÉTAPE 4 : Imports dans MongoDB..."

node ./main.js

echo ""
echo "-------------------------------------------------------------------------"
echo "🛜  ÉTAPE 5 : Connexion en tant qu'utilisateur à la BDD MySql (MDP '1234' demandé...)"
echo ""
mysql -u user1 -p;
