import presetWind4 from "@unocss/preset-wind4";
import { defineConfig } from "unocss";

export default defineConfig({
  presets: [
    presetWind4({
      reset: true,
    }),
  ],
  theme: {
    colors: {
      primary: "#FDFAF9",
      secondary: "#21B5F1",
      accent: "#ED3097",
      background: "#030712",
      neutral: "#30343F",
      button: "#30343F",
    },
  },
});
