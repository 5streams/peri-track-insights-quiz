import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: '#5D4154',
					foreground: '#FFFFFF'
				},
				secondary: {
					DEFAULT: '#A7C4A0',
					foreground: '#FFFFFF'
				},
				accent: {
					DEFAULT: '#FFECD6',
					foreground: '#5D4154'
				},
				alert: '#FF9B85',
				'warm-gray': '#6D6875',
				'light-gray': '#F8F9FA',
				'success-green': '#28A745',
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			fontFamily: {
				'headline': ['Playfair Display', 'serif'],
				'body': ['Raleway', 'sans-serif'],
			},
			fontSize: {
				'h1': ['clamp(32px, 5vw, 48px)', { lineHeight: '1.2' }],
				'h2': ['clamp(24px, 4vw, 36px)', { lineHeight: '1.3' }],
				'h3': ['clamp(20px, 3vw, 28px)', { lineHeight: '1.4' }],
				'body-large': ['clamp(18px, 2.5vw, 22px)', { lineHeight: '1.5' }],
				'body-regular': ['clamp(16px, 2vw, 18px)', { lineHeight: '1.6' }],
			},
			backgroundImage: {
				'hero-gradient': 'linear-gradient(135deg, #F8F6FF 0%, #FFECD6 100%)',
				'cta-gradient': 'linear-gradient(135deg, #A7C4A0 0%, #95B088 100%)',
				'primary-gradient': 'linear-gradient(135deg, #5D4154 0%, #7A5A6B 100%)',
				'feature-gradient': 'linear-gradient(145deg, #FFFFFF 0%, #F8F9FA 100%)',
			},
			keyframes: {
				'fade-in-up': {
					'0%': {
						opacity: '0',
						transform: 'translateY(30px)'
					},
					'100%': {
						opacity: '1',
						transform: 'translateY(0)'
					}
				},
				'scale-in': {
					'0%': {
						transform: 'scale(0.95)',
						opacity: '0'
					},
					'100%': {
						transform: 'scale(1)',
						opacity: '1'
					}
				},
				'float': {
					'0%, 100%': { transform: 'translateY(0px)' },
					'50%': { transform: 'translateY(-10px)' }
				},
				'shimmer': {
					'0%': { transform: 'translateX(-100%)' },
					'100%': { transform: 'translateX(100%)' }
				}
			},
			animation: {
				'fade-in-up': 'fade-in-up 0.8s ease-out',
				'scale-in': 'scale-in 0.6s ease-out',
				'float': 'float 3s ease-in-out infinite',
				'shimmer': 'shimmer 2s ease-in-out infinite',
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config; 