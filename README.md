# AIONOS × Kyndryl Manufacturing Agent Governance Command Center

Static GitHub Pages-ready web app built from the AIONOS × Kyndryl manufacturing transformation deck.

## What is included

- `index.html` — Agent Governance Command Center showcasing all 12 manufacturing agents
- 12 individual agent pages:
  - Production Planning Twin
  - Quality Vision Agent
  - Machine Health + Maintenance Agent
  - Operator Assist + SOP Copilot
  - Energy + ESG Agent
  - Inventory + Warehouse Agent
  - Fleet Routing + Dispatch Orchestrator
  - Procure-to-Pay + Document AI Agent
  - Supplier Risk + Sourcing Agent
  - Dealer / Distributor CX Agent
  - Aftermarket + Warranty Intelligence Agent
  - Revenue + Margin Control Agent
- Live synthetic telemetry charts on all 13 pages
- Buttons on every page to simulate predictions, disruptions, approvals and explainability
- No backend and no external dependencies; the app runs as static HTML/CSS/JS

## How to run locally

Open `index.html` directly in a browser, or serve the folder:

```bash
python -m http.server 8080
```

Then open:

```text
http://localhost:8080
```

## Deploy on GitHub Pages

1. Create a new GitHub repository.
2. Upload the contents of this folder to the repository root.
3. Go to **Settings → Pages**.
4. Under **Build and deployment**, select **Deploy from a branch**.
5. Choose `main` branch and `/root` folder.
6. Save and open the published URL.

## Demo guidance for client meetings

Start on the Command Center page. Click **Simulate multi-agent shock** to show cross-agent governance. Then open each agent tile and press the scenario buttons to show how the agent moves from signal to recommendation, human approval, system action and learning loop.

All data is synthetic and intended for business storytelling/prototype demonstration.
