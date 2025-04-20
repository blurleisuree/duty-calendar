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
      primary: "#293553",
      active: "#0083FF",
      secondary: "#4FE09C",
      neutral: "#77838B",
      line: "#ACACAC",
    },
  },
});
