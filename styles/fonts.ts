import { Inter, IBM_Plex_Mono } from "@next/font/google";

// If loading a variable font, you don't need to specify the font weight
export const inter = Inter({ subsets: ["latin"] });
export const ibm = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "700"],
  style: ["italic", "normal"],
});
