# 🛠 GlowingAlien Backend Setup

Deze instructies zijn voor development op SQLite. Ze zorgen dat database, Prisma en seed scripts werken.

---

## 1. Vereisten

- Node.js ≥ 20
- npm of yarn
- Prisma CLI (`npm install -D prisma @prisma/client`)
- TSX voor TypeScript scripts (`npm install -D tsx`)
- `.env` bestand in project root

```env
DATABASE_URL="file:../db/database.sqlite"

