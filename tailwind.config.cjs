const {
  default: flattenColorPalette,
} = require("tailwindcss/lib/util/flattenColorPalette");
 

function withOpacity(variableName) {
    return ({ opacityValue }) => {
        if (opacityValue !== undefined) {
            return `rgba(var(${variableName}), ${opacityValue})`;
        }
        return `rgb(var(${variableName}))`;
    };
}

// This plugin adds each Tailwind color as a global CSS variable, e.g. var(--gray-200).
function addVariablesForColors({ addBase, theme }: any) {
  let allColors = flattenColorPalette(theme("colors"));
  let newVars = Object.fromEntries(
    Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
  );
 
  addBase({
    ":root": newVars,
  });
}

/** @type {import('tailwindcss').Config} */
module.exports = {
    important: true,
    // 根据您实际使用的类动态生成样式
    mod:"jit",
    content:
        [
            "./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}",
            "./node_modules/tw-elements/dist/js/**/*.js"
        ],
    prefix: "",
    theme: {
        container: {
            center: true,
            padding: "2rem",
            screens: {
                "2xl": "1400px",
                "sm": "640px",
            },
        },
        extend: {
            colors: {
                border: "hsl(var(--border))",
                input: "hsl(var(--input))",
                ring: "hsl(var(--ring))",
                background: "hsl(var(--background))",
                foreground: "hsl(var(--foreground))",
                primary: {
                    DEFAULT: "hsl(var(--primary))",
                    foreground: "hsl(var(--primary-foreground))",
                },
                secondary: {
                    DEFAULT: "hsl(var(--secondary))",
                    foreground: "hsl(var(--secondary-foreground))",
                },
                destructive: {
                    DEFAULT: "hsl(var(--destructive))",
                    foreground: "hsl(var(--destructive-foreground))",
                },
                muted: {
                    DEFAULT: "hsl(var(--muted))",
                    foreground: "hsl(var(--muted-foreground))",
                },
                accent: {
                    DEFAULT: "hsl(var(--accent))",
                    foreground: "hsl(var(--accent-foreground))",
                },
                popover: {
                    DEFAULT: "hsl(var(--popover))",
                    foreground: "hsl(var(--popover-foreground))",
                },
                card: {
                    DEFAULT: "hsl(var(--card))",
                    foreground: "hsl(var(--card-foreground))",
                },
            },
            borderRadius: {
                lg: "var(--radius)",
                md: "calc(var(--radius) - 2px)",
                sm: "calc(var(--radius) - 4px)",
            },
            keyframes: {
                "accordion-down": {
                    from: { height: "0" },
                    to: { height: "var(--radix-accordion-content-height)" },
                },
                "accordion-up": {
                    from: { height: "var(--radix-accordion-content-height)" },
                    to: { height: "0" },
                },
            },
            animation: {
                "accordion-down": "accordion-down 0.2s ease-out",
                "accordion-up": "accordion-up 0.2s ease-out",
            },
            textColor: {
                skin: {
                    base: withOpacity("--color-text-base"),
                    accent: withOpacity("--color-accent"),
                    inverted: withOpacity("--color-fill"),
                    blue: '#1fb6ff',
                    purple: '#7e5bef',
                    pink: '#ff49db',
                    orange: '#ff7849',
                    green: '#13ce66',
                    yellow: '#ffc82c',
                    gray: '#8492a6',
                    'gray-dark': '#273444',
                    'gray-light': '#d3dce6',
                },
            },
            backgroundColor: {
                skin: {
                    fill: withOpacity("--color-fill"),
                    accent: withOpacity("--color-accent"),
                    inverted: withOpacity("--color-text-base"),
                    card: withOpacity("--color-card"),
                    "card-muted": withOpacity("--color-card-muted"),
                    blue: '#1fb6ff',
                    purple: '#7e5bef',
                    pink: '#ff49db',
                    orange: '#ff7849',
                    green: '#13ce66',
                    yellow: '#ffc82c',
                    gray: '#8492a6',
                    'gray-dark': '#273444',
                    'gray-light': '#d3dce6'
                },
            },
            outlineColor: {
                skin: {
                    fill: withOpacity("--color-accent"),
                },
            },
            borderColor: {
                skin: {
                    line: withOpacity("--color-border"),
                    fill: withOpacity("--color-text-base"),
                    accent: withOpacity("--color-accent"),
                },
            },
            fill: {
                skin: {
                    base: withOpacity("--color-text-base"),
                    accent: withOpacity("--color-accent"),
                },
                transparent: "transparent",
            },
            fontFamily: {
                mono: ["IBM Plex Mono", "monospace"],
            },
        },
    },
    plugins: [
        require("@tailwindcss/typography"),
        require("tw-elements/dist/plugin.cjs"),
        require('tailwindcss-highlights'),
        // require("tailwindcss-animate"),
        addVariablesForColors
    ],
    darkMode: "class"
};
