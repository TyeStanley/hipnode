/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
    },
    extend: {
      fontFamily: {
        sourceSans: ["var(--font-source-sans)"],
      },
      backgroundImage: {
        "message-popover": "url('/images/messagePopover.svg')",
        "dark-message-popover": "url('/images/darkMessagePopover.svg')",

        "notification-popover": "url('/navbar/notification_bg_light.svg')",
        "dark-notification-popover": "url('/navbar/notification_bg_dark.svg')",

        "mobile-notification-popover":
          "url('/navbar/notification_bg_mobile_light.svg')",
        "mobile-dark-notification-popover":
          "url('/navbar/notification_bg_mobile_dark.svg')",

        "profile-modal": "url('/profileModal.png')",
        "host-meetup": "url('/host-meetup.png')",
      },
      screens: {
        "2xl": "1440px",
        xxs: "460px",
        xs: "376px",
      },
      boxShadow: {
        contentCard: "0px 2px 6px 0px rgba(43, 0, 212, 0.06)",
        media: "0px 2px 6px 0px rgba(35, 117, 252, 0.10)",
      },
      colors: {
        red: {
          DEFAULT: "#FF4401",
          90: "#FF571A",
          80: "#FF6934",
          70: "#FF7C4D",
          60: "#FF8F67",
          10: "#FFECE6",
          "black-40": "#661B00",
          card: "#FF7C4D",
        },
        yellow: {
          DEFAULT: "#EA942C",
          90: "#EC9F41",
          80: "#EEA956",
          30: "#F9DFC0",
          10: "#FDF4EA",
        },
        blue: {
          DEFAULT: "#347AE2",
          90: "#4887E5",
          80: "#5D95E8",
          20: "#D6E4F9",
          10: "#EBF2FC",
          "black-80": "#2A62B5",
          "black-10": "#0A182D",
        },
        purple: {
          DEFAULT: "#6570f7",
          80: "#848DF9",
          20: "#E0E2FD",
          10: "#F0F1FE",
          "black-20": "#141631",
        },
        green: {
          DEFAULT: "#0ECC8D",
          80: "#3ED6A4",
          10: "#E7FAF4",
        },
        light: {
          DEFAULT: "#FFFFFF",
          2: "#F7F7F7",
          3: "#F4F6F8",
          4: "#7B8EC8",
        },
        dark: {
          1: "#151A1E",
          2: "#1E252B",
          3: "#262D34",
          4: "#2C353D",
        },
        sc: {
          1: "#192351",
          2: "#3F4354",
          3: "#97989D",
          4: "#858EAD",
          5: "#C5D0E6",
          6: "#F4F6F8",
        },
        media: "rgba(35, 117, 252, 0.10)",
        contentCard: "rgba(43, 0, 212, 0.10)",
        leaveModal:
          "linear-gradient(180deg, rgba(189, 189, 189, 0.20) 0%, rgba(189, 189, 189, 0.20) 100%)",
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        secondary: {
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
            from: { height: 0 },
            to: { height: "var(--radix-accordion-content-height)" },
          },
          "accordion-up": {
            from: { height: "var(--radix-accordion-content-height)" },
            to: { height: 0 },
          },
        },
        animation: {
          "accordion-down": "accordion-down 0.2s ease-out",
          "accordion-up": "accordion-up 0.2s ease-out",
        },
      },
    },
    plugins: [require("tailwindcss-animate")],
  },
};
