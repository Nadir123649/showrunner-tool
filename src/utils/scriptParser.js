// utils/scriptParser.js
// utils/scriptParser.js
export const sampleScript = `
INT. OFFICE - DAY
NEO: What is this place?
MORPHEUS: This is the Construct. It’s our loading program.
TRINITY: We can load anything from clothing to equipment... weapons. Training simulations.
`;

export const parseCharacters = (script) => {
  const characterNames = ["NEO", "MORPHEUS", "TRINITY"];
  const characterPrompts = {
    NEO: "A portrait of Neo from The Matrix, young man with serious expression, black trench coat, cyberpunk style, cinematic lighting, high detail",
    MORPHEUS:
      "A portrait of Morpheus from The Matrix, wise African American man with sunglasses, bald head, serious expression, futuristic style",
    TRINITY:
      "A portrait of Trinity from The Matrix, beautiful woman with black leather outfit, short dark hair, cyberpunk style, strong female character",
  };

  const characterCaptions = {
    NEO: "The chosen one who discovers the truth about the Matrix",
    MORPHEUS: "The wise leader who guides Neo on his journey",
    TRINITY: "The skilled hacker and fighter who believes in Neo",
  };

  return characterNames.map((name, index) => ({
    id: `char-${index}`,
    name,
    caption:
      characterCaptions[name] || `This is ${name}, a character from the script`,
    prompt:
      characterPrompts[name] ||
      `A portrait of ${name}, a movie character, high quality, cinematic lighting`,
    image: null,
  }));
};
