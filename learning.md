# Learning Log: Med-Report Simplifier

### Project Goal
To bridge the gap between complex medical lab results and patient understanding using AI-driven structured data extraction and visualization.

### Tech Stack Choices
- **Next.js 15 (App Router):** Chosen for Server Actions and native integration with Vercel AI SDK.
- **TypeScript:** Used to ensure data integrity, especially when handling sensitive medical biomarkers.
- **Vercel AI SDK:** To implement provider-agnostic AI calls and handle structured JSON output via `generateObject`.
- **Zod:** To validate the LLM's response schema before rendering charts.

### Key Concepts I'm Learning Today
1. **Prompt Engineering for Safety:** Crafting system prompts that prevent the AI from giving medical diagnoses while remaining helpful.
2. **Structured Data Extraction:** Moving away from "chatbots" to "data extractors" that turn messy text into clean JSON.
3. **Data Visualization:** Mapping extracted values into Recharts to show patient health trends visually.
4. **DevOps:** Implementing Docker and GitHub Actions for automated linting and deployment.