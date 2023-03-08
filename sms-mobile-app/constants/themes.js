import { animations, colors, icons, images, sizes } from "./assets";

export const theme1 = {
  colors: { ...colors },
  icons: { ...icons },
  images: { ...images },
  animations: { ...animations },
  sizes: { ...sizes },
};

export const theme2 = {
  colors: { ...colors, primary: "blue" },
  icons: { ...icons },
  images: { ...images },
  animations: { ...animations },
  sizes: { ...sizes },
};
