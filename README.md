# Run project

## Install Dependencies

```bash
npm install
npm i -g vercel
```

## Environment Setup

```bash
# Link project to Vercel
vercel link

# Pull environment variables
vercel env pull .env
```

## Database Setup

```bash
# Generate Prisma Client
npx prisma generate

# Add migration
npx prisma migrate deploy

# Add start data
npx prisma db seed
```

## Start Development Server

```bash
# Start project
npm run dev

# Start  Prisma Studio (Database UI)
npm run prisma:studio
```

Open <http://localhost:3000> in your browser.  
Open <http://localhost:5555> to access Prisma Studio.
