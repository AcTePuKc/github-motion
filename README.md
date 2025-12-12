# 🚀 GitHub Motion

> **Turn your GitHub contribution graph into dynamic, animated visualizations.**  
> Create snakes, rain, matrix effects, rising bars, or pulsing waves. Customize shapes, themes, and layouts!

## 📸 Gallery

<details>
<summary>Show gallery previews</summary>
<div align="center">
  <img src="assets/demo-nightowl-snake-square.svg" height="180" />
  <img src="assets/demo-unicorn-rain-heart.svg" height="180" />
  <br />
  <img src="https://gh-motion-card.vercel.app/api/github-motion?username=AcTePuKc&theme=nightowl&animation=wave&shape=diamond&show_legend=true" />
</div>
</details>

> See the full gallery here: [preview.md](./preview.md)

## ✨ Features

- 🎬 **9 Animations:** `Snake`, `Rain`, `Matrix`, `Grow`, `Wave`, `Pulsar`, `Glow`, `Flip`, `Spark`.
- 🔶 **4 Shapes:** `Square`, `Circle`, `Heart`, `Diamond`.
- 🎨 **70+ Themes:** Including `Unicorn`, `NightOwl`, `Dracula`, `Bulgaria`, `Dark-BG`, `India`,  and many more.
- 🌍 **Multi-language:** Supports English, Bulgarian, German, French, Japanese, and 40+ others.
- ⚡ **Lightweight:** Generates pure SVG with CSS animations. No heavy GIFs.
- 🛠️ **Fully Customizable:** Hide stats, ranks, legends, change border width, and more.

## 🛠️ How to Use

Simply embed the image in your GitHub **README.md** using the URL below.  
Replace `YOUR_USERNAME` with your actual GitHub username.

> ℹ️ **Note:** This public demo runs on a free Vercel plan with request limits.  
> For heavy usage, see [Deploy Your Own](#deploy-your-own).

### 🌟 Basic Example

```md
![GitHub Motion](https://gh-motion-card.vercel.app/api/github-motion?username=YOUR_USERNAME)
````

or

```html
<img src="https://gh-motion-card.vercel.app/api/github-motion?username=YOUR_USERNAME" />
```

## 🧩 Customization Options

| Parameter | Type | Default | Options / Description |
| :--- | :--- | :--- | :--- |
| `username` | `string` | **Required** | Your GitHub handle |
| `animation` | `string` | `snake` | `snake`, `rain`, `matrix`, `grow`, `wave`, `pulsar`, `glow`, `flip`, `spark` |
| `shape` | `string` | `square` | `square`, `circle`, `heart`, `diamond` |
| `theme` | `string` | `dark` | `dark`, `light`, `unicorn`, `candy`, `bulgaria`, `bulgaria-dark`, `dark-bg`, `dracula`, `nightowl`, `tokyonight`... (70+ available) |
| `year` | `number` | Current | Example: `2024` |
| `locale` | `string` | `en` | `en`, `bg`, `de`, `fr`, `es`, `ja`, `ru`, `cn`... |
| `border_width`| `number` | `2` | Border thickness (e.g. `0` for no border, `5` for thick) |
| `show_legend` | `boolean`| `false` | Set to `true` to show the color scale legend |
| `hide_rank` | `boolean`| `false` | Set to `true` to hide the Rank badge (S/A/B) |
| `hide_total` | `boolean`| `false` | Set to `true` to hide Total Contributions count |
| `hide_streaks`| `boolean`| `false` | Set to `true` to hide Longest/Current streaks |

---

## 📸 Gallery & Configurations

### 💖 The "Cute" Configuration
*Pink unicorn theme with falling hearts.*
```markdown
![Cute Motion](https://gh-motion-card.vercel.app/api/github-motion?username=YOUR_USERNAME&theme=unicorn&shape=heart&animation=rain&show_legend=true)
```

### 👾 The "Hacker" Configuration
*Matrix rain with random drops and high-contrast colors.*
```markdown
![Hacker Motion](https://gh-motion-card.vercel.app/api/github-motion?username=YOUR_USERNAME&theme=nightowl&shape=square&animation=matrix&hide_rank=true)
```

### 💎 The "Premium" Configuration
*Rotating diamonds with a Glow effect on a pitch-black background.*
```markdown
![Diamond Motion](https://gh-motion-card.vercel.app/api/github-motion?username=YOUR_USERNAME&theme=bulgarian-darkg&shape=diamond&animation=glow&border_width=0)
```

### 🔕 The "Minimalist" Configuration
*Just the animation. No stats, no rank, no footer.*
```markdown
![Minimal Motion](https://gh-motion-card.vercel.app/api/github-motion?username=YOUR_USERNAME&theme=tokyonight&animation=snake&hide_total=true&hide_streaks=true&hide_rank=true)
```

---

## 🚀 Deploy Your Own

You can deploy this project to Vercel for free in seconds.

1. Fork this repository.
2. Create a [GitHub Personal Access Token](https://github.com/settings/tokens) (Classic) with `read:user` permissions.
3. Deploy to Vercel:

You can deploy this project for free on Vercel or Netlify.

| Platform | One-Click Deploy |
| :--- | :--- |
| **Vercel** (Recommended) | [![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Factepukc%2Fgithub-motion&env=GITHUB_TOKEN&envDescription=Your%20GitHub%20Personal%20Access%20Token) |
| **Netlify** | [![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/actepukc/github-motion) |

4.Add your `GITHUB_TOKEN` as an Environment Variable in Vercel settings.

#### **Note:** You will need to provide your `GITHUB_TOKEN` during the setup process

---

## 💻 Local Development

1. Clone the repo:

   ```bash
   git clone https://github.com/AcTePuKc/github-motion.git
   cd github-motion
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create `.env.local` file and add your token:

   ```bash
   GITHUB_TOKEN=ghp_your_token_here
   ```

4. Run the server:

   ```bash
   npm run dev
   ```

5. Open `http://localhost:3000` to see the Playground.

## 🤝 Contributing

Got a new theme idea? Or a crazy animation? Pull requests are welcome!

1. Fork it.
2. Create your feature branch (`git checkout -b feature/AmazingFeature`).
3. Commit your changes.
4. Push to the branch.
5. Open a Pull Request.

---

<p align="center">Made with ❤️ and TypeScript</p>
