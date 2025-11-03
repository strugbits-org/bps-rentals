const COLOR_NAMES = [
  "BROWN",
  "BLACK",
  "GREY",
  "PINK",
  "WHITE",
  "GREEN",
  "MULTICOLOR",
  "CHAMPAGNE",
  "BLUE",
  "VIOLET",
  "YELLOW",
  "RED",
  "MAGENTA",
  "GOLD",
  "ORANGE",
  "PURPLE"
];

function filterProductColors(words, colorList = COLOR_NAMES) {
  const upper = colorList.map(c => c.toUpperCase());
  return words.filter(w => upper.includes(w.toUpperCase()));
}

export { COLOR_NAMES, filterProductColors };