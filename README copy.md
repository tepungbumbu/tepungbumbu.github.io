# Map - Interactive Disaster Impact Geospatial Visualization

An interactive geospatial map application built with Astro, designed to visualize disaster impact data across Indonesian provinces and regencies. This project provides a detailed, multi-level view of disaster statistics including population affected, damaged buildings, medical units, and logistics support.

## 🚀 Features

- **Interactive Multi-Level Map**: Navigate from regional overview → province view → district/regency details
- **Real-time Data Visualization**: Dynamic display of disaster impact statistics
- **Responsive Design**: Optimized for desktop and mobile devices
- **Province-Level Drill-Down**: Click on provinces to view detailed kabupaten/city data
- **Comprehensive Data Tables**: Sortable tables showing:
    - Population affected
    - Damaged buildings
    - Medical units deployed
    - Logistics support (tons)

## 🛠️ Tech Stack

- **Framework**: [Astro](https://astro.build/) v5.16
- **Styling**: TailwindCSS v4
- **Interactivity**: Alpine.js v3
- **UI Components**: React v19
- **Language**: TypeScript
- **Data**: GeoJSON for map boundaries, JSON for regional statistics

## 📦 Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🌐 Development

The development server runs at `http://localhost:4321/map/` (note the `/map` base path configured in `astro.config.mjs`)

## 📁 Project Structure

```
map/
├── src/
│   ├── components/         # Astro/React components
│   │   ├── DataProvinsi.astro    # Province data tables
│   │   └── ...
│   ├── data/              # JSON data files
│   │   ├── regional-data.json    # Regional statistics
│   │   └── [province].json       # GeoJSON boundaries
│   ├── layouts/           # Page layouts
│   ├── pages/             # Astro pages
│   ├── styles/            # Global styles
│   └── lib/               # Utility functions
├── public/                # Static assets
└── preview/               # Build output directory
```

## 🎨 Key Components

### DataProvinsi.astro

- Displays provincial and regency-level data in tabular format
- Handles navigation between regional, provincial, and district views
- Interactive table rows for drilling down into data

### Map Components

- Interactive Leaflet-based mapping
- Province boundary visualization
- Click-to-zoom functionality
- Custom styling for impact levels (Kritis, Tinggi, Sedang, Rendah)

## 📊 Data Structure

The application uses `regional-data.json` which contains:

- Province-level disaster statistics
- Regency/city-level detailed data
- Categories: Dampak (Impact), Respon (Response), and Progress

## 🔧 Configuration

### TailwindCSS IntelliSense (VSCode)

Add to your `settings.json`:

```json
{
    "tailwindCSS.experimental.classRegex": [["([\"'`][^\"'`]*.*?[\"'`])", "[\"'`]([^\"'`]*).*?[\"'`]"]]
}
```

### Prettier Plugin (Optional)

For sorting Tailwind classes, update `prettier.config.cjs`:

```js
module.exports = {
    plugins: [require("prettier-plugin-tailwindcss")],
    tailwindFunctions: ["tv"],
}
```

## 🚀 Deployment

Built files are output to the `preview/` directory and can be deployed to any static hosting service. The base path is set to `/map` - adjust in `astro.config.mjs` if needed.

## 📝 License

See [LICENSE](LICENSE) file for details.

## 🤝 Contributing

This is a disaster management visualization tool. Contributions to improve data accuracy, user experience, or performance are welcome.

---

**Important**: This application is built for disaster response and management. Data should be kept current and accurate.
