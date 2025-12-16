import { useEffect, useMemo, useState } from 'react'
import './App.css'

const appCatalog = [
  {
    id: 'canvas',
    name: 'SketchPad Live',
    category: 'Productivity',
    description: 'Collaborative whiteboard with real-time cursors and sticky notes.',
    launchUrl: 'https://excalidraw.com',
    rating: 4.8,
    tags: ['whiteboard', 'collaboration'],
  },
  {
    id: 'kanban',
    name: 'FlowBoard',
    category: 'Project Management',
    description: 'Lightweight kanban with swimlanes, WIP limits, and checklists.',
    launchUrl: 'https://app.taiga.io',
    rating: 4.6,
    tags: ['tasks', 'teams'],
  },
  {
    id: 'notes',
    name: 'Nimbus Notes',
    category: 'Productivity',
    description: 'Markdown-first notes with AI summaries and shareable pages.',
    launchUrl: 'https://app.nuclino.com',
    rating: 4.5,
    tags: ['notes', 'markdown'],
  },
  {
    id: 'todo',
    name: 'FocusList',
    category: 'Wellness',
    description: 'Daily plan with pomodoro timers, routines, and streaks.',
    launchUrl: 'https://todoist.com',
    rating: 4.7,
    tags: ['habits', 'timers'],
  },
  {
    id: 'music',
    name: 'LoFi Lounge',
    category: 'Lifestyle',
    description: 'Curated focus playlists and ambient soundscapes.',
    launchUrl: 'https://play.lofi.cafe',
    rating: 4.4,
    tags: ['music', 'focus'],
  },
  {
    id: 'charts',
    name: 'DashKit',
    category: 'Analytics',
    description: 'Create data dashboards with drag-and-drop charts and embeds.',
    launchUrl: 'https://observablehq.com',
    rating: 4.3,
    tags: ['charts', 'data'],
  },
]

const templates = {
  landing: {
    title: 'Product landing',
    description: 'Hero with feature bullets and CTA.',
  },
  dashboard: {
    title: 'Analytics dashboard',
    description: 'KPIs with charts, activity feed, and table.',
  },
  checklist: {
    title: 'Task checklist',
    description: 'Todo list with progress meter and tags.',
  },
}

function buildTemplateHtml(prompt, templateKey) {
  const template = templates[templateKey]
  const safePrompt = prompt.trim() || 'Your new idea'

  return `<!doctype html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>${template.title} - Generated</title>
      <style>
        :root { font-family: 'Inter', system-ui, -apple-system, sans-serif; color: #0f172a; }
        body { margin: 0; background: radial-gradient(circle at 10% 20%, #e0f2fe, transparent 25%), #f8fafc; color: #0f172a; }
        .page { max-width: 1100px; margin: 0 auto; padding: 32px 24px 72px; }
        .pill { display: inline-flex; align-items: center; gap: 8px; padding: 8px 12px; border-radius: 999px; background: #eff6ff; color: #1d4ed8; font-weight: 600; }
        h1 { font-size: 38px; margin: 18px 0 12px; }
        h2 { margin: 32px 0 12px; font-size: 22px; }
        p { line-height: 1.6; max-width: 800px; }
        .grid { display: grid; gap: 16px; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); margin-top: 18px; }
        .card { background: white; border-radius: 16px; padding: 18px; box-shadow: 0 10px 30px rgba(15, 23, 42, 0.08); border: 1px solid #e2e8f0; }
        .kpi { font-size: 28px; font-weight: 700; }
        .bar { height: 12px; border-radius: 999px; background: linear-gradient(90deg, #22c55e, #16a34a); margin-top: 12px; }
        .list { padding-left: 18px; margin: 12px 0; }
        .list li { margin: 6px 0; }
        footer { margin-top: 32px; display: flex; gap: 12px; }
        a.button { display: inline-flex; gap: 8px; align-items: center; background: #2563eb; color: white; padding: 12px 16px; border-radius: 12px; text-decoration: none; box-shadow: 0 10px 20px rgba(37, 99, 235, 0.2); }
      </style>
    </head>
    <body>
      <div class="page">
        <span class="pill">AI generated · ${template.title}</span>
        <h1>${safePrompt}</h1>
        <p>
          Starter layout for <strong>${safePrompt}</strong> using the <em>${template.title}</em> template. Swap the copy, tweak the colors, or add your own API calls to turn this into a full experience.
        </p>
        <div class="grid">
          <div class="card">
            <h2>Primary action</h2>
            <p>${template.description}</p>
            <ul class="list">
              <li>Instantly editable text and colors.</li>
              <li>Accessible layout with semantic elements.</li>
              <li>Responsive cards powered by CSS grid.</li>
            </ul>
          </div>
          <div class="card">
            <h2>Highlights</h2>
            <div class="kpi">96% satisfaction</div>
            <p>Replace these placeholders with your own KPIs, screenshots, or embedded widgets.</p>
            <div class="bar"></div>
          </div>
          <div class="card">
            <h2>Next steps</h2>
            <p>Wire this HTML into your project, connect it to data, and ship a polished version of <strong>${safePrompt}</strong>.</p>
          </div>
        </div>
        <footer>
          <a class="button" href="https://vitejs.dev/guide/" target="_blank" rel="noreferrer">Open Vite guide</a>
          <a class="button" href="https://react.dev/learn" target="_blank" rel="noreferrer">Open React docs</a>
        </footer>
      </div>
    </body>
  </html>`
}

function App() {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All')
  const [prompt, setPrompt] = useState('Build a focus timer for creatives')
  const [template, setTemplate] = useState('landing')
  const [bundle, setBundle] = useState({ previewUrl: '', downloadUrl: '' })

  useEffect(() => {
    return () => {
      if (bundle.previewUrl) URL.revokeObjectURL(bundle.previewUrl)
    }
  }, [bundle.previewUrl])

  const categories = useMemo(
    () => ['All', ...Array.from(new Set(appCatalog.map((item) => item.category)))],
    [],
  )

  const filteredApps = useMemo(() => {
    return appCatalog.filter((app) => {
      const matchesCategory = category === 'All' || app.category === category
      const matchesSearch = app.name.toLowerCase().includes(search.toLowerCase())
      return matchesCategory && matchesSearch
    })
  }, [category, search])

  const generateBundle = () => {
    const html = buildTemplateHtml(prompt, template)
    const blob = new Blob([html], { type: 'text/html' })
    const url = URL.createObjectURL(blob)
    setBundle((prev) => {
      if (prev.previewUrl) URL.revokeObjectURL(prev.previewUrl)
      return { previewUrl: url, downloadUrl: url }
    })
  }

  return (
    <div className="page">
      <header className="hero">
        <div>
          <p className="pill">Codespaces-ready</p>
          <h1>App Store Web Hub</h1>
          <p className="lede">
            Browse curated web experiences, open them safely, and spin up new ideas with the built-in AI app maker.
            The repo ships with a Vite + React frontend that runs out-of-the-box in GitHub Codespaces.
          </p>
          <div className="meta">
            <span>Featured apps, AI generator</span>
            <span>Secure launch links</span>
            <span>Local preview on port 5173</span>
          </div>
        </div>
        <div className="badge">
          <span className="badge-label">Quick start</span>
          <p>1) Install deps 2) `npm run dev -- --host` 3) Open forwarded port 5173.</p>
        </div>
      </header>

      <section className="panel">
        <div className="panel-header">
          <div>
            <p className="overline">Discover</p>
            <h2>Curated web apps</h2>
            <p className="muted">Open in a new tab for the best sandboxing experience.</p>
          </div>
          <div className="filters">
            <input
              type="search"
              placeholder="Search apps"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
            <select value={category} onChange={(event) => setCategory(event.target.value)}>
              {categories.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid">
          {filteredApps.map((app) => (
            <article key={app.id} className="card">
              <div className="card-top">
                <div>
                  <p className="overline">{app.category}</p>
                  <h3>{app.name}</h3>
                  <p className="muted">{app.description}</p>
                </div>
                <div className="rating">⭐ {app.rating.toFixed(1)}</div>
              </div>
              <div className="tags">
                {app.tags.map((tag) => (
                  <span key={tag} className="tag">
                    {tag}
                  </span>
                ))}
              </div>
              <div className="actions">
                <a href={app.launchUrl} target="_blank" rel="noreferrer" className="button">
                  Open app
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="panel ai">
        <div className="panel-header">
          <div>
            <p className="overline">AI App Maker</p>
            <h2>Generate a starter app bundle</h2>
            <p className="muted">Provide a prompt and choose a template to preview and download a sandboxed HTML starter.</p>
          </div>
        </div>

        <div className="ai-grid">
          <div className="generator">
            <label>
              Prompt
              <textarea
                value={prompt}
                onChange={(event) => setPrompt(event.target.value)}
                rows={3}
                placeholder="Describe what you want to build..."
              />
            </label>
            <label>
              Template
              <select value={template} onChange={(event) => setTemplate(event.target.value)}>
                {Object.entries(templates).map(([key, value]) => (
                  <option key={key} value={key}>
                    {value.title}
                  </option>
                ))}
              </select>
            </label>
            <button className="button" type="button" onClick={generateBundle}>
              Generate preview
            </button>
          </div>

          <div className="preview">
            {bundle.previewUrl ? (
              <>
                <div className="preview-meta">
                  <p className="overline">Live preview</p>
                  <a className="button ghost" href={bundle.downloadUrl} download="ai-generated.html">
                    Download HTML
                  </a>
                </div>
                <iframe title="AI generated preview" src={bundle.previewUrl} sandbox="allow-scripts allow-same-origin" />
              </>
            ) : (
              <div className="placeholder">
                <p className="muted">Generate to see a live iframe preview.</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}

export default App
