# 🛠️ 1. Prérequis Système

Ce projet nécessite l'installation préalable de **Node.js**, **MySQL** et **MongoDB** sur votre machine. Le script bash utilise des commandes systèmes qui ne fonctionneront pas sans ces outils.

## Installation sur macOS (via Homebrew)

Si vous n'avez pas [Homebrew](https://brew.sh/), installez-le d'abord.

```bash
# 1. Installer MySQL et MongoDB
brew install mysql
brew tap mongodb/brew
brew install mongodb-community

# 2. Démarrer les services (indispensable pour que le script se connecte)
brew services start mysql
brew services start mongodb-community

# 3. Sécurisation optionnelle (pour définir le mot de passe root si besoin)
# Par défaut sur Mac, root n'a pas de mot de passe.
# Si vous en mettez un, retenez-le pour le script !
mysql_secure_installation
````

## Installation sur Linux (Ubuntu)

```bash
# 1. Mettre à jour les paquets
sudo apt update

# 2. Installer MySQL Server
sudo apt install -y mysql-server
sudo systemctl start mysql
sudo systemctl enable mysql

# 3. Configurer le mot de passe Root MySQL (CRITIQUE pour le script)
# Par défaut, Ubuntu utilise auth_socket. Le script a besoin d'un mot de passe natif.
sudo mysql
-- Une fois dans le prompt MySQL :
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'votre_mot_de_passe';
FLUSH PRIVILEGES;
EXIT;

# 4. Installer MongoDB
# (Note : Pour une prod, utilisez les dépôts officiels Mongo, ici version simple des dépôts Ubuntu)
sudo apt install -y mongodb
sudo systemctl start mongodb
sudo systemctl enable mongodb
```

## Installation sur WSL

### Dans votre terminal WSL (Ubuntu)

```bash
# 1. Conversion des fins de ligne (CRLF -> LF) pour éviter les erreurs de script
sudo apt update && sudo apt install -y dos2unix
dos2unix event_planner.sh

# 2. Installer MySQL
sudo apt install -y mysql-server
sudo service mysql start

# 3. Configurer Root MySQL
sudo mysql
-- Dans MySQL :
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'votre_mot_de_passe';
EXIT;

# 4. Installer et lancer MongoDB
# (Sur WSL, systemctl peut ne pas marcher selon la version, on utilise service)
sudo apt install -y mongodb
sudo service mongodb start
```

## Installation du programme event_planner

Dans votre terminal, déplacez-vous dans le dossier du projet. Remplacez `<votre_chemin/vers_le_dossier>` par le chemin d'accès (absolu ou relatif) où vous avez cloné ou téléchargé ce projet.

```bash
  cd <votre_chemin/vers_le_dossier>/event_planner
```

***Ayez bien NPM LTS (ou PNPM si vous voulez prouver) d'installé avant de lancer le script***

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
