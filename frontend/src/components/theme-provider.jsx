import { ThemeProvider as NextThemesProvider } from "next-themes";

const ThemeProvider = ({ children }) => (
  <NextThemesProvider
    attribute="data-theme"
    defaultTheme="dark"
    enableSystem={false}
    storageKey="bhairav-theme"
  >
    {children}
  </NextThemesProvider>
);

export default ThemeProvider;
