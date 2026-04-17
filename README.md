# 🏰 BitQuest

> *Route a medieval messenger across the Netherlands — but first, transform the message.*

A browser puzzle game where binary logic meets medieval cartography. Place operation flags on Dutch provinces to transform a courier's message as they ride from castle to castle. Chain the right operations to deliver the exact target string and complete the quest.

---

## 🗺️ The Premise

Two castles. One message. Twelve provinces standing between them.

Each flag you plant on a province intercepts the courier and transforms the binary string — flip bits, shift left, reverse, duplicate. Place them in the right order and the message that arrives will match the target. Get it wrong and the quest fails.

No trial and error shortcuts. Think it through.

---

## ⚔️ How to Play

1. **Study** the start message and target message at the top
2. **Select** a flag from the arsenal on the right
3. **Plant** it on a province between the two castles
4. **Chain** multiple flags — order matters, operations stack
5. **Send** the courier and watch the message transform in real time
6. **Win** by arriving with the exact target string

---

## 🚩 Flag Operations

| Symbol | Flag | What it does |
|--------|------|-------------|
| `1→` | Add 1 Start | Prepends a `1` to the message |
| `0→` | Add 0 Start | Prepends a `0` to the message |
| `→1` | Add 1 End | Appends a `1` to the message |
| `→0` | Add 0 End | Appends a `0` to the message |
| `<<` | Shift Left | Shifts all bits left, pads right with `0` |
| `>>` | Shift Right | Shifts all bits right, pads left with `0` |
| `⇄` | Reverse | Reverses the entire bit string |
| `↕` | Flip Bits | Flips every bit — `0` becomes `1` and vice versa |
| `×2` | Duplicate | Concatenates the message with itself |
| `▦` | Keep Even Pos | Keeps only characters at even indices |
| `▥` | Keep Odd Pos | Keeps only characters at odd indices |
| `↺` | Rotate Left | Moves the first bit to the end |
| `↻` | Rotate Right | Moves the last bit to the front |

---

## 🏇 Getting Started

```bash
git clone https://github.com/HHChandar20/BitQuest
cd BitQuest
npm install
npm run dev
```

> Requires **Node 18+**

---

## 🗂️ Project Structure

```
src/
├── App.tsx
├── main.tsx
├── index.css
├── types.ts                        # Shared TypeScript interfaces
│
├── data/
│   ├── zones.ts                    # Dutch province SVG paths & coordinates
│   ├── flags.ts                    # Flag operations & metadata
│   └── levels.ts                   # All 12 level configurations
│
├── hooks/
│   └── useGameState.ts             # Game logic, animation, state management
│
├── components/
│   ├── BinaryMessageGame.tsx       # Root component
│   ├── MapView.tsx                 # Interactive SVG province map
│   ├── FlagPanel.tsx               # Flag selection sidebar
│   ├── FlagInfo.tsx                # Selected flag description
│   ├── ActionPanel.tsx             # Deliver / reset / result display
│   └── MessageBar.tsx              # Live message state display
│
└── styles/
    └── game.css                    # Parchment textures, Cinzel font, animations
```

---

## 🛠️ Tech Stack

| | |
|---|---|
| ⚛️ **React 18** | UI & component architecture |
| 🔷 **TypeScript** | Full type safety |
| 🎨 **Tailwind CSS** | Utility-first styling |
| ⚡ **Vite** | Lightning-fast dev server & builds |
| 🖋️ **Cinzel** | Medieval serif typeface (Google Fonts) |
| 🔲 **Lucide React** | Crisp icon set |

---

## 🧩 Levels

12 handcrafted levels of increasing difficulty across all 12 Dutch provinces.

| Levels | Focus |
|--------|-------|
| 1–3 | Single operations — prepend, append, reverse |
| 4–6 | Two-step chains — combining basic flags |
| 7–9 | Multi-step logic — shift, rotate, filter |
| 10–12 | Full chains — everything combined, tight flag limits |

---

## 📜 License

MIT — do what you want with it, just don't claim you drew the map.
