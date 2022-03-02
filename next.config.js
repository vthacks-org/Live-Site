// module.exports = {
//   webpack: cfg => {
//     cfg.module.rules.push({
//       test: /\.md$/,
//       loader: "frontmatter-markdown-loader",
//       options: { mode: ["react-component"] },
//     })
//     return cfg
//   },
// }
module.exports = {
  exportPathMap: async function (
    defaultPathMap,
    { dev, dir, outDir, distDir, buildId }
  ) {
    return {
      "/": { page: "/" },
      "/getting_started": { page: "/getting_started" },
      "/workshops": { page: "/workshops" },
      "/ux_events": { page: "/ux_events" },
      "/resources": { page: "/resources" },
      "/submission_guidelines": { page: "/submission_guidelines" },
      "/prizes": { page: "/prizes" },
      "/judges": { page: "/judges" },
    }
  },
  images: {
    domains: ["s3.amazonaws.com"],
  },
  plugins: [
    "postcss-flexbugs-fixes",
    [
      "postcss-preset-env",
      {
        autoprefixer: {
          flexbox: "no-2009",
        },
        stage: 3,
        features: {
          "custom-properties": false,
        },
      },
    ],
    [
      "@fullhuman/postcss-purgecss",
      {
        content: [
          "./pages/**/*.{js,jsx,ts,tsx}",
          "./components/**/*.{js,jsx,ts,tsx}",
        ],
        defaultExtractor: (content) => content.match(/[\w-/:]+(?<!:)/g) || [],
        safelist: ["html", "body"],
      },
    ],
  ],
}
