import { createStitches } from "@stitches/react";

export const {
  styled,
  css,
  globalCss,
  keyframes,
  getCssText,
  theme,
  createTheme,
  config,
} = createStitches({
  theme: {
    colors: {
      bg: "hsl(237.3, 42.3%, 30.6%)",
      bgLighter: "hsl(237.3, 42.3%, 35.6%)",
      text: "rgba(255, 255, 255, 0.95)",
      textLighter: "rgba(255, 255, 255, 0.55)",
      theme: "rgba(103, 65, 217, 255)",
      themeTransparent: "rgba(103, 65, 217, 0.4)",
    },
    radii: {
      rounded: "16px",
    },
    fontSizes: {
      xl: "1.5rem",
      lg: "1.2rem",
      md: "1rem",
      sm: "0.9rem",
      xs: "0.8rem",
      xxs: "0.7rem",
    },
    fontWeights: {
      extraBold: 700,
      bold: 600,
      semiBold: 500,
      body: 400,
    },
    space: {
      // scale loaned from Tailwind CSS
      "1": "0.25rem",
      "2": "0.5rem",
      "3": "0.75rem",
      "4": "1rem",
      "5": "1.25rem",
      "6": "1.5rem",
      "7": "1.75rem",
      "8": "2rem",
      "9": "2.25rem",
      "10": "2.5rem",
      "11": "2.75rem",
      "12": "3rem",
      "14": "3.5rem",
      "16": "4rem",
      "20": "5rem",
      "24": "6rem",
      "28": "7rem",
      "32": "8rem",
      "36": "9rem",
      "40": "10rem",
      "44": "11rem",
      "48": "12rem",
      "52": "13rem",
      "56": "14rem",
      "60": "15rem",
      "64": "16rem",
      "72": "18rem",
      "80": "20rem",
      "96": "24rem",
    },
  },
  media: {
    xs: "(min-width: 480px)",
    sm: "(min-width: 640px)",
    md: "(min-width: 768px)",
    lg: "(min-width: 1024px)",
    xl: "(min-width: 1280px)",
  },
  utils: {
    marginX: (value: string) => ({ marginLeft: value, marginRight: value }),
    marginY: (value: string) => ({ marginTop: value, marginBottom: value }),
    paddingX: (value: string) => ({ paddingLeft: value, paddingRight: value }),
    paddingY: (value: string) => ({ paddingTop: value, paddingBottom: value }),
  },
});
