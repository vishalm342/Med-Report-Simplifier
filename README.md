# CuraSense AI - Medical Report Simplifier

A professional healthcare SaaS application that uses AI to analyze and simplify medical reports for better patient understanding.

## 🚀 Quick Start

**⚠️ IMPORTANT:** Before running the app, you need to set up Clerk authentication.

### Setup Instructions

👉 **See [SETUP.md](./SETUP.md) for complete setup instructions**

Quick steps:
1. Create a Clerk account at [clerk.com](https://clerk.com)
2. Get your API keys from the Clerk dashboard
3. Create `.env.local` and add your keys (see `.env.local.example`)
4. Run `npm install` (if you haven't already)
5. Run `npm run dev`
6. Visit `http://localhost:3000`

## 🎯 Features

- **🔐 Secure Authentication** - Powered by Clerk
- **🏠 Public Landing Page** - Professional UI at `/`
- **📊 Protected Dashboard** - Analysis tools at `/dashboard`
- **🤖 AI-Powered Analysis** - Simplifies medical reports using Google's Gemini AI
- **📈 Visual Reports** - Charts and insights for lab values
- **🎓 Knowledge Levels** - Explanations tailored to user expertise (Child, Standard, Professional)

## 🛠️ Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Authentication:** Clerk
- **AI:** Google Gemini (via AI SDK)
- **Database:** MongoDB (Mongoose)
- **Styling:** Tailwind CSS
- **Icons:** Lucide React
- **Charts:** Recharts

## 📁 Project Structure

```
├── app/
│   ├── page.tsx              # Landing page
│   ├── layout.tsx            # Root layout with Clerk
│   ├── dashboard/            # Protected dashboard
│   └── api/analyze/          # AI analysis endpoint
├── components/
│   ├── ui/                   # UI components (Navbar, etc.)
│   └── dashboard/            # Dashboard-specific components
├── lib/                      # Utilities (AI, DB, schemas)
├── middleware.ts             # Route protection
└── SETUP.md                  # Detailed setup guide
```

## 🔒 Security

- Protected routes with Clerk middleware
- Secure session management
- No medical advice disclaimer
- Data privacy focused

## 📝 License

Private project - All rights reserved
