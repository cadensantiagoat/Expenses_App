import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    fontSize: {
      sm: [
        '0.875rem',
        {
          lineHeight: '1.25rem',
        },
      ],
      base: [
        '1rem',
        {
          lineHeight: '1.5rem',
        },
      ],
      xl: '1.25rem',
      xs: [
        '0.875rem',
        {
          lineHeight: '1.25rem',
        },
      ],
      h4: [
        '1.25rem',
        {
          lineHeight: '1.75rem',
          fontWeight: '500',
        },
      ],
      h3: [
        '1.5rem',
        {
          lineHeight: '2rem',
          fontWeight: '500',
        },
      ],
      h2: [
        '2rem',
        {
          lineHeight: '2.5rem',
          fontWeight: '700',
        },
      ],
      h1: [
        '2.5rem',
        {
          lineHeight: '3rem',
          fontWeight: '700',
          // fontWeight: '500',
        },
      ],
    },
    extend: {
      gridTemplateRows: {
        expensesLayout: '250px 1fr',
        expensesPage: 'repeat(auto-fit, minmax(0, 1fr))'
      },
      gridTemplateColumns: {
        expensesGrid: 'repeat(auto-fit, minmax(420px, 1fr))'
      },
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))',
        },
        sidebar: {
          DEFAULT: 'hsl(var(--sidebar-background))',
          foreground: 'hsl(var(--sidebar-foreground))',
          primary: 'hsl(var(--sidebar-primary))',
          'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
          accent: 'hsl(var(--sidebar-accent))',
          'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
          border: 'hsl(var(--sidebar-border))',
          ring: 'hsl(var(--sidebar-ring))',
        },
      },
      fontFamily: {
        sans: ['var(--font-satoshi)'],
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: {
            height: '0',
          },
          to: {
            height: 'var(--radix-accordion-content-height)',
          },
        },
        'accordion-up': {
          from: {
            height: 'var(--radix-accordion-content-height)',
          },
          to: {
            height: '0',
          },
        },
        gauge_fadeIn: {
          from: {
            opacity: '0',
          },
          to: {
            opacity: '1',
          },
        },
        gauge_fill: {
          from: {
            'stroke-dashoffset': '332',
            opacity: '0',
          },
          to: {
            opacity: '1',
          },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        gauge_fadeIn: 'gauge_fadeIn 1s ease forwards',
        gauge_fill: 'gauge_fill 1s ease forwards',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
}
export default config
