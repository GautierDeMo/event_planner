#!/bin/bash

DB_USER="root"
SCRIPT_PATH="sql/script.sql"
PROCEDURE_PATH="sql/procedures.sql"
DB_NAME="event_planner"

echo "🏗️  ÉTAPE 1 : Construction de la base de données..."

if mysql -u $DB_USER -p < "$SCRIPT_PATH"; then
    sleep 1
    echo ""
    echo "🔍 Est-ce que la db '$DB_NAME' existe déjà ?"
    sleep 1
    echo ""
    echo "🚪 Rentrons dans '$DB_NAME'"
    sleep 1
    echo ""
    echo "➕ Créons au besoin la table 'event'"
    sleep 1
    echo ""
    echo "➕ Créons au besoin la table 'register'"
    sleep 1
    echo ""
    echo "✅ Base '$DB_NAME' importée avec succès."
else
    echo "❌ Erreur lors de l'import."
    exit 1
fi

echo "🏗️  ÉTAPE 2 : Création des procédures..."

if mysql -u $DB_USER -p < "$PROCEDURE_PATH"; then
    sleep 1
    echo ""
    echo "Création de la procédure create_event"
else 
    echo "❌ Erreur lors de la création des procédures."
    exit 1
fi
