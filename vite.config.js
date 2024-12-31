// vite.config.js
import { defineConfig } from "vite";

export default defineConfig(({ mode }) => {
  const isProduction = mode === "production";
  let base = isProduction ? "/speedup-ball/" : "/";

  return {
    plugins: [
      {
        name: "html-transform",
        transformIndexHtml(html) {
          if (isProduction) {
            // Inject Google Analytics code only in production
            return html.replace(
              "</head>",
              `<script async src="https://www.googletagmanager.com/gtag/js?id=G-3J8TLC4ES0"></script>
              <script>
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
              
                gtag('config', 'G-3J8TLC4ES0');
              </script>
              </head>`
            );
          }
          return html;
        },
      },
    ],
    base: base,
    preview: {
      port: 4175,
    },
  };
});
