import localFont from "next/font/local";

/*
 * Both families are self-hosted variable fonts (SIL OFL 1.1, licences beside
 * the files) so builds never depend on reaching Google Fonts.
 */
export const spaceGrotesk = localFont({
  src: "./fonts/SpaceGrotesk-Variable.woff2",
  weight: "300 700",
  variable: "--font-space-grotesk",
  display: "swap",
  fallback: ["ui-sans-serif", "system-ui", "sans-serif"],
});

export const inter = localFont({
  src: "./fonts/Inter-Variable.woff2",
  weight: "100 900",
  variable: "--font-inter",
  display: "swap",
  fallback: ["ui-sans-serif", "system-ui", "sans-serif"],
});

/** Heavy display face for the NM letters of the navigation-bar logo only. */
export const archivoBlack = localFont({
  src: "./fonts/ArchivoBlack-Regular.woff2",
  weight: "400",
  variable: "--font-archivo-black",
  display: "swap",
  fallback: ["Arial Black", "ui-sans-serif", "sans-serif"],
});
