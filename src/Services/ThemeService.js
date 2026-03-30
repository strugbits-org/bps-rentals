"use server";

import getDataFetchFunction from "./FetchFunction";
import logError from "@/Utils/ServerActions";

/**
 * Default theme palette - these values match the current hardcoded colors in utils.css
 * This serves as a fallback when Wix collection data is unavailable
 */
const DEFAULT_THEME_PALETTE = {
  // Brand colors (from Wix collection)
  mainColor: "#0F41FA",
  accentColor1: "#87C3E7",
  accentColor2: "#BCE6FF",
  accentColor3: "#F2F2F2",
  accentColor4: "#142B8B",  // Dark navy blue for sections like Designer Picks

  // Neutral colors
  black1: "#000000",
  black2: "#2E2E2E",
  black3: "#2C2216",
  gray1: "#606060",
  gray2: "#130817",
  gray3: "#E3E3E3",
  white1: "#FFFFFF",
  white2: "#F2F2F2",
  white3: "#C2C2C2",

  // Accent colors
  red1: "#C50000",
  green1: "#2AC500",
  pink1: "#FF6E6E",
  yellow1: "#FEE98E",
  beige1: "#BABAB2",
};

/**
 * Maps Wix collection field names to CSS variable names
 * This allows flexibility in how fields are named in the CMS
 */
const FIELD_TO_CSS_VAR_MAP = {
  // Primary brand colors (from Wix collection)
  mainColor: "--blue-1",
  accentColor1: "--blue-3",  // Light blue
  accentColor2: "--blue-4",  // Lighter blue
  accentColor3: "--white-2",
  accentColor4: "--blue-2",  // Dark navy blue

  // Neutrals
  black1: "--black-1",
  black2: "--black-2",
  black3: "--black-3",
  gray1: "--gray-1",
  gray2: "--gray-2",
  gray3: "--gray-3",
  white1: "--white-1",
  white2: "--white-2",
  white3: "--white-3",

  // Accent colors
  red1: "--red-1",
  green1: "--green-1",
  pink1: "--pink-1",
  yellow1: "--yellow-1",
  beige1: "--beige-1",
};

/**
 * Fetches theme configuration from the Wix collection
 * Collection should be named "ThemeConfigRentals" with fields matching FIELD_TO_CSS_VAR_MAP keys
 * 
 * Expected collection structure:
 * - title: string (theme name, e.g., "Default", "Dark Mode")
 * - active: boolean (only one should be active)
 * - mainColor: string (hex color - primary brand color, maps to --blue-1)
 * - accentColor1: string (hex color - light blue, maps to --blue-3)
 * - accentColor2: string (hex color - lighter blue, maps to --blue-4)
 * - accentColor3: string (hex color - maps to --white-2)
 * - accentColor4: string (hex color - dark navy blue, maps to --blue-2, for Designer Picks etc.)
 */
export const getThemeConfig = async () => {
  try {
    const response = await getDataFetchFunction({
      dataCollectionId: "ThemeConfigRentals",
    });    

    if (response && response.items && response.items.length > 0) {
      // First try to find the active theme
      const activeTheme = response.items.find((item) => item.active === true);
      
      // Fall back to the first item if no active theme is found
      return activeTheme || response.items[0];
    }

    return null;
  } catch (error) {
    logError("Error fetching ThemeConfigRentals:", error);
    return null;
  }
};

/**
 * Validates that a string is a valid hex color
 */
const isValidHexColor = (color) => {
  if (typeof color !== "string") return false;
  return /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(color);
};

/**
 * Merges fetched theme data with defaults, only using valid colors
 */
const mergeThemeWithDefaults = (themeData) => {
  const merged = { ...DEFAULT_THEME_PALETTE };

  if (!themeData) return merged;

  // Map each field from the CMS data to our theme palette
  Object.keys(DEFAULT_THEME_PALETTE).forEach((key) => {
    if (themeData[key] && isValidHexColor(themeData[key])) {
      merged[key] = themeData[key];
    }
  });

  return merged;
};

/**
 * Generates CSS variable declarations from theme palette
 * Returns a string that can be used in a style attribute or injected into :root
 */
export const generateCssVariables = (themePalette) => {
  const palette = themePalette || DEFAULT_THEME_PALETTE;
  const cssVars = [];

  // Generate CSS variable declarations
  Object.entries(palette).forEach(([key, value]) => {
    const cssVarName = FIELD_TO_CSS_VAR_MAP[key];
    if (cssVarName && isValidHexColor(value)) {
      cssVars.push(`${cssVarName}: ${value}`);
    }
  });

  return cssVars.join("; ");
};

/**
 * Generates a complete CSS style block with :root selector
 * This is ready to be injected into a <style> tag
 */
export const generateThemeStyleBlock = (themePalette) => {
  const palette = themePalette || DEFAULT_THEME_PALETTE;
  const cssVars = [];

  // Generate CSS variable declarations
  Object.entries(palette).forEach(([key, value]) => {
    const cssVarName = FIELD_TO_CSS_VAR_MAP[key];
    if (cssVarName && isValidHexColor(value)) {
      cssVars.push(`  ${cssVarName}: ${value};`);
    }
  });

  return `:root {\n${cssVars.join("\n")}\n}`;
};

/**
 * Main function to get theme CSS variables
 * Fetches from Wix collection, falls back to defaults, and generates CSS string
 */
export const getThemeCssVariables = async () => {
  try {
    const themeConfig = await getThemeConfig();
    console.log("themeConfig", themeConfig);
    
    const mergedTheme = mergeThemeWithDefaults(themeConfig);
    return generateCssVariables(mergedTheme);
  } catch (error) {
    logError("Error generating theme CSS variables:", error);
    // Return default theme CSS variables as fallback
    return generateCssVariables(DEFAULT_THEME_PALETTE);
  }
};

/**
 * Main function to get theme style block for injection
 * Returns a complete CSS block with :root selector
 */
export const getThemeStyleBlock = async () => {
  try {
    const themeConfig = await getThemeConfig();
    const mergedTheme = mergeThemeWithDefaults(themeConfig);
    return generateThemeStyleBlock(mergedTheme);
  } catch (error) {
    logError("Error generating theme style block:", error);
    return generateThemeStyleBlock(DEFAULT_THEME_PALETTE);
  }
};

/**
 * Returns the theme palette object (useful for components that need color values directly)
 */
export const getThemePalette = async () => {
  try {
    const themeConfig = await getThemeConfig();
    return mergeThemeWithDefaults(themeConfig);
  } catch (error) {
    logError("Error getting theme palette:", error);
    return DEFAULT_THEME_PALETTE;
  }
};
