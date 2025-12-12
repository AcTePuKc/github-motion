# 🚀 GitHub Motion

> **Turn your GitHub contribution graph into dynamic, animated visualizations.**  
> Create snakes, rain, matrix effects, or rising bars. Customize shapes (hearts, diamonds) and themes!

## 📸 Gallery

<div align="center">
  <img src="assets/demo-nightowl-snake-square.svg" height="180" />
  <img src="assets/demo-unicorn-rain-heart.svg" height="180" />
</div>

> See the full gallery here: [preview.md](./preview.md)

## ✨ Features

- 🎬 **4 Animations:** `Snake` (Classic path), `Rain` (Matrix style), `Grow` (Rising bars), `Matrix` (Random chaos).
- 🔶 **4 Shapes:** `Square`, `Circle`, `Heart` ❤️, `Diamond` 💎.
- 🎨 **10+ Themes:** Including `Unicorn`, `Candy`, `NightOwl`, `Dracula`, and more.
- ⚡ **Lightweight:** Generates pure SVG with CSS animations. No heavy GIFs.
- 📊 **Stats Included:** Total contributions, current streak, and longest streak.

## 🛠️ How to Use

Simply embed the image in your GitHub **README.md** using the URL below. Replace `YOUR_USERNAME` with your actual GitHub username.

### 🌟 Basic Example

```markdown
![GitHub Motion](https://your-domain.vercel.app/api/github-motion?username=YOUR_USERNAME)
```

### 🧩 Customization Options

| Parameter | Type | Default | Options |
| :--- | :--- | :--- | :--- |
| `username` | `string` | **Required** | Your GitHub handle |
| `animation` | `string` | `snake` | `snake`, `rain`, `matrix`, `grow` |
| `shape` | `string` | `square` | `square`, `circle`, `heart`, `diamond` |
| `theme` | `string` | `dark` | `dark`, `light`, `unicorn`, `candy`, `ocean`, `dracula`, `monokai`, `nightowl`, `tokyonight`, `sunset` |
| `year` | `number` | Current | Example: `2023` |

### 💖 The "Cute" Configuration

```markdown
![Cute Motion](https://your-domain.vercel.app/api/github-motion?username=YOUR_USERNAME&theme=unicorn&shape=heart&animation=rain)
```

### 👾 The "Hacker" Configuration

```markdown
![Hacker Motion](https://your-domain.vercel.app/api/github-motion?username=YOUR_USERNAME&theme=nightowl&shape=square&animation=matrix)
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
