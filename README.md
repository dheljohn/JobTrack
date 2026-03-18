# 📋 JobTrack

**JobTrack** is a lightweight job application tracker that runs entirely in the browser — no frameworks, no backend, no setup. Just open and start tracking.

---

## Features

### ➕ Add Job Applications
- Log new job applications with relevant details
- Instantly reflected in the list via DOM manipulation

### 🗑️ Delete Applications
- Remove any job entry from the list with a single click

### 🔃 Sort Job List
- Sort your applications by your preferred criteria to stay organized

### 💾 Persistent Storage
- Data is saved using the browser's **localStorage**
- Your list survives page refreshes and tab closures
- **Note:** Data is cleared when you clear your browser's site data or cache

---

## Tech Stack

| Layer | Technology |
|---|---|
| Structure | HTML |
| Styling | CSS |
| Logic | Vanilla JavaScript |
| Interactivity | DOM Manipulation |
| Storage | localStorage (browser) |

> No frameworks, no dependencies, no build tools required.

---

## Getting Started

No installation needed. Just open the file in your browser.

```bash
# Clone the repository
git clone https://github.com/your-username/jobtrack.git
cd jobtrack

# Open in browser
open index.html
```

Or simply download the files and double-click `index.html`.

---

## Storage Note

JobTrack uses `localStorage` to persist your data between sessions. Keep in mind:

- ✅ Data persists across page refreshes
- ✅ Data persists after closing and reopening the tab
- ❌ Data is **lost** when you clear browser site data or cache
- ❌ Data does **not** sync across different browsers or devices

---

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you'd like to change.

---

## License

[MIT](LICENSE)
