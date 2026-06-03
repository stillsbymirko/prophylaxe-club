# prophylaxe.club

Privacy-first, DSGVO-konforme Web-App für Zahnarztpraxen zur Erstellung von Kalender-Erinnerungslinks für Patienten.

## Features

- **Praxis-Dashboard** (`/`): Link-Generator mit Live-Vorschau und QR-Code
- **Patienten-Landingpage** (`/[slug]`): Ein-Klick-Kalenderdownload (.ics)
- **Keine Patientendaten**: Es werden ausschließlich Praxis-Stammdaten gespeichert (Name, URL, Telefon)
- **Kurze URLs**: `prophylaxe.club/denspoint`
- **Smart Date Logic**: Automatische Berechnung der Buchungs-Quartale
- **VALARM**: Push-Benachrichtigung auf iOS & Android

## Entwicklung

```bash
npm install
cp .env.local.example .env.local   # optional: Upstash-Credentials für lokales Redis
npm run dev
```

Ohne `.env.local` werden Praxisdaten lokal in `data/practices.json` gespeichert.

Öffnen Sie [http://localhost:3000](http://localhost:3000).

## Deployment auf Vercel

1. Repository mit GitHub verbinden
2. Projekt in Vercel importieren
3. **Upstash Redis** über den [Vercel Marketplace](https://vercel.com/marketplace/upstash) verbinden
4. Deploy (oder Redeploy nach Integration)

Upstash setzt `UPSTASH_REDIS_REST_URL` und `UPSTASH_REDIS_REST_TOKEN` automatisch. Praxisdaten werden dann in Redis gespeichert — kurze URLs wie `/denspoint` funktionieren dauerhaft.

## Tech Stack

- Next.js 16 (App Router)
- TypeScript
- Tailwind CSS
- Lucide Icons
- qrcode.react
- Upstash Redis
