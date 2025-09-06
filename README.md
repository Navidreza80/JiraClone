# JiraClone

A clone of the Jira task manager built with Next.js 15, React 19, Tailwind CSS, Prisma, and Supabase.

---

## Table of Contents

- [Overview](#overview)  
- [Features](#features)  
- [Tech Stack](#tech-stack)  
- [Setup & Installation](#setup--installation)  
- [Available Scripts](#available-scripts)  
- [Project Structure](#project-structure)  
- [Deployment](#deployment)  
- [Contributing](#contributing)  
- [License](#license)

---

## Overview

JiraClone is a task management application inspired by Jira, built using the latest web technologies. It provides a modern front-end interface combined with full-stack capabilities using Prisma and Supabase.

---

## Features

*(Add any features you’ve implemented. Below are suggestions to customize.)*

- Task lists, boards, or Kanban-style task views  
- Create, edit, and assign tasks to team members  
- Real-time updates via Supabase subscriptions  
- Team collaboration support (multiple users)  
- Authentication using Supabase Auth  
- Mobile-responsive UI with Tailwind CSS

---

<img width="1919" height="923" alt="Screenshot 2025-09-06 150724" src="https://github.com/user-attachments/assets/d69c507d-ed7d-4e70-ad18-cdbe61f81c9e" />
*Auhtentication*
<img width="1919" height="925" alt="Screenshot 2025-09-06 150817" src="https://github.com/user-attachments/assets/bedfa54b-ec5f-44a2-9f6a-74e1c35724f8" />
*Homepage*
<img width="1918" height="926" alt="Screenshot 2025-09-06 150911" src="https://github.com/user-attachments/assets/5193074a-e980-4363-8a91-5e2e31a9908f" />
*Projects*
<img width="1918" height="924" alt="Screenshot 2025-09-06 153827" src="https://github.com/user-attachments/assets/fb70c0d3-eef7-43dc-9c55-a925bc07f1d4" />
*Projects tasks*
---

## Tech Stack

| Layer          | Technologies                         |
|----------------|--------------------------------------|
| Front-End      | Next.js 15, React 19, Tailwind CSS   |
| State / Data   | Prisma ORM, Supabase (DB & Auth)     |
| Styling        | Tailwind CSS                         |
| Language       | TypeScript & JavaScript              |
| Linting        | ESLint, Prettier (if applicable)     |

---

## Setup & Installation

To run JiraClone locally:

```bash
    git clone https://github.com/Navidreza80/JiraClone.git
    cd JiraClone
    npm install           # or yarn install / pnpm install
    npm run dev           # or yarn dev / pnpm dev / bun dev
    Open http://localhost:3000
    to explore the app in development mode.
```


## Available Scripts

```bash
npm run dev   # Start dev server
npm run build # Create an optimized production build
npm run start # Run the production build locally
```

## Project Structure

```bash
JiraClone/
├── prisma/                # Schema & migrations setup
├── public/                # Static files (images, fonts, etc.)
├── src/
│   ├── components/        # Reusable React components
│   ├── app/     # Next.js routes & pages
│   └── styles/            # Tailwind or global styles
├── .gitignore
├── package.json
├── tsconfig.json
├── eslint.config.mjs
├── postcss.config.mjs
└── next.config.ts
```

## Contributing

Your contributions are welcome! To participate:

Fork the repository

Create a new feature branch

```bash
git checkout -b feature/awesome-improvement
```


Make and commit your changes

Push to your branch and open a Pull Request

Feel free to suggest new features like user roles, advanced filtering, custom boards, or UI enhancements!


