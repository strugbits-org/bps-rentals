import Fuse from "fuse.js";

export const searchProductsData = async (searchTerm, products, keywords) => {
  if (!searchTerm || !products?.length) return [];

  const normalizeText = (text) => text.trim().toLowerCase();

  const words = normalizeText(searchTerm).split(/\s+/).filter(Boolean);
  if (!words.length) return [];

  // Regex definitions for exact, partial, and phrase matching
  const startsWithRegex = new RegExp(`^${searchTerm}`, "i");
  const exactMatchAllWordsRegex = new RegExp(words.map(word => `(?=.*(^|\\s)${word})`).join(""), "i");
  const exactWordMatchRegex = new RegExp(`(\\s)(${words.join("|")})`, "i");
  const containsAllWordsRegex = new RegExp(words.map(word => `(?=.*${word})`).join(""), "i");
  const containsAnyRegex = new RegExp(words.join("|"), "i");

  // Spell-checking or corrections
  const correctSearchTerm = async (searchTerm) => {
    const fuse = new Fuse(keywords, { threshold: 0.4 });
    const result = fuse.search(searchTerm);
    return result.length ? result[0].item : searchTerm;
  };
  const correctedWords = await Promise.all(words.map(correctSearchTerm));
  const correctedExactMatchAllWordsRegex = new RegExp(correctedWords.map(word => `(?=.*(^|\\s)${word})`).join(""), "i");
  const correctedExactWordMatchRegex = new RegExp(`(\\s)(${correctedWords.join("|")})\\b`, "i");
  const correctedContainsAllWordsRegex = new RegExp(correctedWords.map(word => `(?=.*${word})`).join(""), "i");
  const correctedContainsAnyRegex = new RegExp(correctedWords.join("|"), "i");

  const matches = {
    startsWith: new Set(),
    exactAllWords: new Set(),
    exactWord: new Set(),
    containsAllWords: new Set(),
    containsAny: new Set(),
    exactAllWordsCorrected: new Set(),
    exactWordCorrected: new Set(),
    containsAllWordsCorrected: new Set(),
    containsAnyCorrected: new Set(),
    searchContainsAllWords: new Set(),
    searchContainsAny: new Set(),
  };

  for (const product of products) {
    if (!product.search || !product.title) continue;

    const titleField = normalizeText(product.title);
    const searchField = normalizeText(product.search);

    // Matching logic
    if (startsWithRegex.test(titleField)) matches.startsWith.add(product);
    else if (exactMatchAllWordsRegex.test(titleField)) matches.exactAllWords.add(product);
    else if (exactWordMatchRegex.test(titleField)) matches.exactWord.add(product);
    else if (containsAllWordsRegex.test(titleField)) matches.containsAllWords.add(product);
    else if (containsAnyRegex.test(titleField)) matches.containsAny.add(product);

    // Corrected term matching
    else if (correctedExactMatchAllWordsRegex.test(titleField)) matches.exactAllWordsCorrected.add(product);
    else if (correctedExactWordMatchRegex.test(titleField)) matches.exactWordCorrected.add(product);
    else if (correctedContainsAllWordsRegex.test(titleField)) matches.containsAllWordsCorrected.add(product);
    else if (correctedContainsAnyRegex.test(titleField)) matches.containsAnyCorrected.add(product);
    
    else if (containsAllWordsRegex.test(searchField)) matches.searchContainsAllWords.add(product);
    else if (containsAnyRegex.test(searchField)) matches.searchContainsAny.add(product);

  }

  return Object.keys(matches).flatMap(key => 
    [...matches[key]].sort((a, b) => a._id.localeCompare(b._id))
  );
  
};