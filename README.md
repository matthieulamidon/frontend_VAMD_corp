# ⚡ Projet React - Atomic Design & Layouts

## 📂 Structure des fichiers

Nous utilisons **Atomic Design** comme base d’organisation :

```
src/
│── components/
│   │── atoms/        # Composants de base (Button, Input, Icon…)
│   │── molecules/    # Combinaisons d’atoms (SearchBar, Card…)
│   │── organisms/    # Sections complexes (Navbar, Footer, Form…)
│
│── layouts/          # Layouts globaux (Visiteur, Joueur, Coach)
│── routes/           # Définition des routes avec React Router
│── context/          # Contexte global (Auth, Theme…)
│── hooks/            # Custom hooks
│── services/         # Gestion API & backend
│── utils/            # Fonctions utilitaires
│── assets/           # Images, icônes, polices
│── styles/           # Styles globaux (tailwind.css, variables SCSS…)
```

👉 Les **navbars** et **footers** sont placés dans `layouts/`, car ils diffèrent selon les espaces :

- **Page visiteur**
- **Portail joueur**
- **Portail coach**

---

## 📜 Règles du dépôt

- ✅ Les variables suivent la convention **camelCase**.
- ✅ **Seul le propriétaire du repo** peut push sur `main`.
  > ℹ️ Raison : le dépôt est auto-déployé sur **Vercel**, et nous devons limiter le temps de compilation.
- ✅ Chaque **branche** doit porter le **nom d’une issue** correspondante.

---

## 🌍 Accès au serveur web

Le serveur est déployé ici :  
👉 [https://jeLeDeploieCeSoirePromi.com](https://jeLeDeploieCeSoirePromi.com)

⚠️ **Cold Start** (plan gratuit) :

- ⏳ Si le site n’a pas été utilisé depuis **15 minutes**, il prend environ **30 secondes à démarrer**.
- 🕒 Le backend subit aussi un **Cold Start**, et les deux peuvent se cumuler.

---

## ⚙️ Instructions pour les développeurs

Après un `git pull` :

```bash
npm install
```

Pour démarrer le serveur en local :

```bash
npm run dev
```

Avant de push votre code, exécutez :

```bash
npm run lint
npm run build
npm run preview
```

---

## 🚀 Workflow Git

1. Créer une branche **au nom de l’issue** :
   ```bash
   git checkout -b feature/US-00-nom-de-l-issue
   ```
2. Développer vos fonctionnalités.
3. Commit avec des messages clairs :
   ```bash
   git commit -m "feat: ajout du composant Button"
   ```
4. Push votre branche :
   ```bash
   git push origin feature/nom-de-l-issue
   ```
5. Ouvrir une **Pull Request** vers `main`.

---

## 🛠️ Outils utilisés pour ce projet

- 🎨 **Figma** → création des maquettes et schémas du site web
- 📌 **Trello** → gestion de projet et suivi des tâches
- 💬 **Discord** → messagerie et communication d’équipe
- ▲ **Vercel** → hébergement gratuit du frontend
- 🖥️ **Render** → hébergement gratuit du backend et de la base de données **PostgreSQL**

---

## 👑 Notes finales

je ne sais pas pourquoi je me fait chier a faire un readme car de toute façon vous ne le lirer jamais
