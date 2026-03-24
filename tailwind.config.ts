import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            keyframes: {
                'card-float': {
                    '0%, 100%': { transform: 'translateY(0) scale(1)', boxShadow: '0 10px 30px -10px rgba(0,0,0,0.3)' },
                    '50%': { transform: 'translateY(-10px) scale(1.02)', boxShadow: '0 25px 40px -15px rgba(0,0,0,0.4)' },
                }
            },
            animation: {
                'card-float': 'card-float 3s ease-in-out infinite',
            },
            backgroundImage: {
                "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
                "gradient-conic":
                    "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
            },
        },
    },
    plugins: [],
};
export default config;
