import type { Config } from 'tailwindcss'

const config: Config =  {
    darkMode: ["class"],
    safelist: ["dark"],
    prefix: "",
    content: ['./public/**/*.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
    theme: {
        screens: {
            'xxxs': '340px',
            'xxs': '400px',
            'xs': '500px',
            'sm': '600px',
            'md': '765px',
            'lg': '950px',
            'xl': '1150px',
            '2xl': '1300px',
            'xxl': '1650px',
            '4xl': '1950px',
            '5xl': '2500px',
            '6xl': '3300px',
        },
        extend: {
            colors: {
                background:  'var(--background)',
                'background-text':  'var(--background-text)',
                'background-foreground': 'var(--background-foreground)',
                'text-light': 'var(--text-light)',
                'text-normal': 'var(--text-normal)',
                'text-dark': 'var(--text-dark)',
            },
            boxShadow: {
                'input': '0px 0px 0px 2px rgba(255, 255, 255, 0.40)',
                'none': '0px 0px 0px 2px rgba(255, 255, 255, 0)',
            },
        }
    }
}

export default config

