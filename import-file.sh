#!/bin/bash

# Définir les couleurs avec des variables
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
NC='\033[0m' # Aucune couleur

PS3="Quelle tâche souhaitez-vous exécuter ? "
options=("Voir la version du système" "Voir l'espace disque" "Voir la configuration IP" "Voir la date du dernier redémarrage" "Quitter")

select choix in "${options[@]}"; do
    case $REPLY in
        1)
            echo -e "${GREEN}Version du système :${NC}"
            uname -a
            ;;
        2)
            echo -e "${GREEN}Espace disque :${NC}"
            df -h
            ;;
        3)
            echo -e "${GREEN}Configuration IP :${NC}"
            ip a
            ;;
        4)
            echo -e "${GREEN}Date du dernier redémarrage :${NC}"
            who -b
            ;;
        5)
            echo -e "${YELLOW}Exit${NC}"
            break
            ;;
        *)
            echo -e "${RED}Option invalide, veuillez réessayer !${NC}"
            ;;
    esac
done