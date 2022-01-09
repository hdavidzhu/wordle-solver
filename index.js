const _ = require("lodash");
const fs = require("fs");
const prompts = require("prompts");
const wordListPath = require("word-list");

const WORD_LENGTH = 5;

const allWords = fs.readFileSync(wordListPath, "utf8").split("\n");
const wordBank = allWords.filter((w) => w.length === WORD_LENGTH);
const wordBankSet = new Set(wordBank);

(async () => {
  let remaining = wordBank;
  while (remaining.length) {
    console.log({
      numRemaining: remaining.length,
      suggestions: _.sampleSize(
        _.sortBy(remaining, (w) => -1 * _.uniq(w).length).slice(0, 50),
        5
      ),
    });
    const response = await prompts(
      [
        {
          message: "Guess?",
          name: "guess",
          type: "text",
          validate: (w) =>
            w.length !== WORD_LENGTH || !wordBankSet.has(w) ? "Invalid" : true,
        },
        {
          message: "Evaluation?",
          name: "evaluation",
          type: "text",
          validate: (w) =>
            w.length !== WORD_LENGTH ||
            Array.from(w).some((l) => !"yne".includes(l))
              ? "Invalid"
              : true,
        },
      ],
      { onCancel: () => process.exit() }
    );
    remaining = remaining.filter((word) => {
      for (let i = 0; i < WORD_LENGTH; i++) {
        const letter = response.guess[i];
        const status = response.evaluation[i];
        switch (status) {
          case "y":
            if (word[i] !== letter) {
              return false;
            }
            continue;
          case "n":
            if (word.includes(letter)) {
              return false;
            }
            continue;
          case "e":
            if (!word.includes(letter) || word[i] === letter) {
              return false;
            }
            continue;
          default:
            throw new Error("Invalid response status");
        }
      }
      return true;
    });
  }
})();
