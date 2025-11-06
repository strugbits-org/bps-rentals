const PRIMARY_COLORS = [
  "Brown",
  "Black",
  "Grey",
  "Pink",
  "White",
  "Green",
  "Multicolor",
  "Champagne",
  "Blue",
  "Violet",
  "Yellow",
  "Red",
  "Magenta",
  "Gold",
  "Orange",
  "Purple"
];

// Additional color variations and synonyms
const COLOR_SYNONYMS = {
  // Standard synonyms
  "GRAY": "Grey",
  "SILVER": "Grey",
  "BEIGE": "Champagne",
  "TAN": "Brown",
  "NAVY": "Blue",
  "CYAN": "Blue",
  "AQUA": "Blue",
  "TEAL": "Blue",
  "LIME": "Green",
  "OLIVE": "Green",
  "MAROON": "Red",
  "CRIMSON": "Red",
  "ROSE": "Pink",
  "FUCHSIA": "Magenta",
  "LAVENDER": "Violet",
  "INDIGO": "Violet",
  "AMBER": "Orange",
  "BRONZE": "Brown",
  
  // -ish variations (reddish, blueish, etc.)
  "REDDISH": "Red",
  "REDISH": "Red",
  "BLUEISH": "Blue",
  "BLUISH": "Blue",
  "GREENISH": "Green",
  "YELLOWISH": "Yellow",
  "ORANGISH": "Orange",
  "PURPLISH": "Purple",
  "PINKISH": "Pink",
  "BROWNISH": "Brown",
  "GREYISH": "Grey",
  "GRAYISH": "Grey",
  "WHITISH": "White",
  "BLACKISH": "Black",
  "GOLDISH": "Gold",
  
  // Light/Dark variations
  "DARKBLUE": "Blue",
  "LIGHTBLUE": "Blue",
  "DARKGREEN": "Green",
  "LIGHTGREEN": "Green",
  "DARKRED": "Red",
  "LIGHTRED": "Red",
  "DARKGREY": "Grey",
  "LIGHTGREY": "Grey",
  "DARKGRAY": "Grey",
  "LIGHTGRAY": "Grey",
  "DARKBROWN": "Brown",
  "LIGHTBROWN": "Brown",
  "DARKYELLOW": "Yellow",
  "LIGHTYELLOW": "Yellow",
  "DARKORANGE": "Orange",
  "LIGHTORANGE": "Orange",
  "DARKPINK": "Pink",
  "LIGHTPINK": "Pink",
  "DARKPURPLE": "Purple",
  "LIGHTPURPLE": "Purple",
  "DARKVIOLET": "Violet",
  "LIGHTVIOLET": "Violet",
  
  // Common color names
  "SCARLET": "Red",
  "RUBY": "Red",
  "BURGUNDY": "Red",
  "WINE": "Red",
  "CHERRY": "Red",
  "COBALT": "Blue",
  "SAPPHIRE": "Blue",
  "SKY": "Blue",
  "TURQUOISE": "Blue",
  "EMERALD": "Green",
  "JADE": "Green",
  "MINT": "Green",
  "FOREST": "Green",
  "SAGE": "Green",
  "LEMON": "Yellow",
  "CANARY": "Yellow",
  "MUSTARD": "Yellow",
  "PEACH": "Orange",
  "CORAL": "Orange",
  "RUST": "Orange",
  "TANGERINE": "Orange",
  "SALMON": "Orange",
  "PLUM": "Purple",
  "MAUVE": "Purple",
  "LILAC": "Violet",
  "PERIWINKLE": "Violet",
  "CHOCOLATE": "Brown",
  "COFFEE": "Brown",
  "MOCHA": "Brown",
  "ESPRESSO": "Brown",
  "CARAMEL": "Brown",
  "CHESTNUT": "Brown",
  "MAHOGANY": "Brown",
  "WALNUT": "Brown",
  "CREAM": "White",
  "IVORY": "White",
  "PEARL": "White",
  "EGGSHELL": "White",
  "SNOW": "White",
  "CHARCOAL": "Black",
  "EBONY": "Black",
  "JET": "Black",
  "ONYX": "Black",
  "SLATE": "Grey",
  "STEEL": "Grey",
  "ASH": "Grey",
  "SMOKE": "Grey",
  "CHAMPAGNE": "Champagne",
  "TAUPE": "Champagne",
  "KHAKI": "Champagne",
  "SAND": "Champagne",
  "PLATINUM": "Grey",
  "BRASS": "Gold",
  "COPPER": "Gold"
};

function filterProductColors(words, colorList = PRIMARY_COLORS) {
  const upper = colorList.map(c => c.toUpperCase());
  return words.filter(w => upper.includes(w.toUpperCase()));
}

/**
 * Detects color names in a search term string
 * @param {string} searchTerm - The search query string
 * @param {Array<string>} availableColors - Optional array of available color filters
 * @returns {Array<string>} - Array of detected color names (normalized)
 */
function detectColorsInSearchTerm(searchTerm, availableColors = PRIMARY_COLORS) {
  if (!searchTerm || typeof searchTerm !== 'string') return [];
  
  // Normalize the search term
  const normalizedTerm = searchTerm.trim().toLowerCase();
  const words = normalizedTerm.split(/\s+/);
  const detectedColors = [];
  const upperAvailableColors = availableColors.map(c => c.toUpperCase());
  
  // Check for two-word color phrases (e.g., "light blue", "dark red")
  const modifiers = ["light", "dark", "bright", "pale", "deep", "soft"];
  for (let i = 0; i < words.length - 1; i++) {
    if (modifiers.includes(words[i])) {
      const twoWordPhrase = (words[i] + words[i + 1]).toUpperCase();
      if (COLOR_SYNONYMS[twoWordPhrase]) {
        const normalizedColor = COLOR_SYNONYMS[twoWordPhrase];
        const matchedColor = availableColors.find(c => c.toUpperCase() === normalizedColor.toUpperCase());
        if (matchedColor && !detectedColors.includes(matchedColor)) {
          detectedColors.push(matchedColor);
        }
        continue;
      }
      // Also check if the color word alone is valid
      const colorWord = words[i + 1].toUpperCase();
      if (upperAvailableColors.includes(colorWord)) {
        const matchedColor = availableColors.find(c => c.toUpperCase() === colorWord);
        if (matchedColor && !detectedColors.includes(matchedColor)) {
          detectedColors.push(matchedColor);
        }
        continue;
      }
      if (COLOR_SYNONYMS[colorWord]) {
        const normalizedColor = COLOR_SYNONYMS[colorWord];
        const matchedColor = availableColors.find(c => c.toUpperCase() === normalizedColor.toUpperCase());
        if (matchedColor && !detectedColors.includes(matchedColor)) {
          detectedColors.push(matchedColor);
        }
        continue;
      }
    }
  }
  
  // Check individual words
  for (const word of words) {
    const upperWord = word.toUpperCase();
    
    // Check if the word directly matches a color
    if (upperAvailableColors.includes(upperWord)) {
      // Use the exact format from availableColors
      const matchedColor = availableColors.find(c => c.toUpperCase() === upperWord);
      if (matchedColor && !detectedColors.includes(matchedColor)) {
        detectedColors.push(matchedColor);
      }
    } 
    // Check if the word is a synonym
    else if (COLOR_SYNONYMS[upperWord]) {
      const normalizedColor = COLOR_SYNONYMS[upperWord];
      const matchedColor = availableColors.find(c => c.toUpperCase() === normalizedColor.toUpperCase());
      if (matchedColor && !detectedColors.includes(matchedColor)) {
        detectedColors.push(matchedColor);
      }
    }
  }
  
  return detectedColors;
}

/**
 * Removes color words from a search term
 * @param {string} searchTerm - The search query string
 * @returns {string} - Search term with color words removed
 */
function removeColorsFromSearchTerm(searchTerm) {
  if (!searchTerm || typeof searchTerm !== 'string') return searchTerm;
  
  const words = searchTerm.trim().split(/\s+/);
  const allColorWords = [
    ...PRIMARY_COLORS.map(c => c.toLowerCase()),
    ...Object.keys(COLOR_SYNONYMS).map(c => c.toLowerCase())
  ];
  
  const modifiers = ["light", "dark", "bright", "pale", "deep", "soft"];
  const filteredWords = [];
  
  for (let i = 0; i < words.length; i++) {
    const word = words[i].toLowerCase();
    
    // Skip if it's a color word
    if (allColorWords.includes(word)) {
      continue;
    }
    
    // Skip modifiers if followed by a color word
    if (modifiers.includes(word) && i < words.length - 1) {
      const nextWord = words[i + 1].toLowerCase();
      if (allColorWords.includes(nextWord)) {
        i++; // Skip the next word too
        continue;
      }
    }
    
    filteredWords.push(words[i]);
  }
  
  return filteredWords.join(' ').trim();
}

export { 
  PRIMARY_COLORS, 
  COLOR_SYNONYMS,
  filterProductColors, 
  detectColorsInSearchTerm,
  removeColorsFromSearchTerm
};