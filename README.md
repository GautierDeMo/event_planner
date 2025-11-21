# Installation du programme event_planner

Dans votre terminal, déplacez-vous dans le dossier du projet. Remplacez `<votre_chemin/vers_le_dossier>` par le chemin d'accès (absolu ou relatif) où vous avez cloné ou téléchargé ce projet.

```bash
  cd <votre_chemin/vers_le_dossier>/event_planner
```

***Ayez bien NPM LTS (ou PNPM si vous voulez prouver) d'installé avant de lancer le script***

---

***Si vous êtes un utilisateur Windows :***

- utiliser le terminal WSL plutôt que le terminal classique car (nos deux utilisateurs
Windows n'ont pas réussi à faire marcher ça sur Powershell)
- Ces commandes servent à convertir les fichiers pour être interprété par WSL

```bash
  sudo apt update && sudo apt install -y dos2unix
  dos2unix event_planner.sh
  sudo apt install mysql-server
  sudo service mysql start
  sudo mysql
```

- cette commande sert pour créer votre utilisateur sous la session de votre terminal WSL

```sql
  ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'your password';
  EXIT
```

---

## Ensuite, rendez le script exécutable

```bash
  chmod +x event_planner.sh
```

Puis lancez-le :

```bash
  ./event_planner.sh
```

- Et laissez vous guider !
