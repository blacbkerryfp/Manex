# Manex (MVP)

Une app React + Vite + Supabase pour créer, éditer et versionner des MANEX.

## Démarrage local
1. Créer un projet Supabase et exécuter `supabase/migrations/001_init.sql`.
2. `npm install` puis `npm run dev`.

## Déploiement Vercel
Ajouter dans Project Settings → Environment Variables :
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`
