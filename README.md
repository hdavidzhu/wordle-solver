# wordle-solver

```bash
# Install dependencies
> npm i

# Run script
> node index.js
```

Inputs are 5 letter words and `yne`.

```
y - Yes, the letter goes here
n - No, the letter does not show up anywhere
e - The letter should show up in another position
```

Example:

```bash
> node index.js
{
  numRemaining: 12595,
  suggestions: [ 'ached', 'absit', 'acute', 'acidy', 'abets' ]
}
✔ Guess? … acute
✔ Evaluation? … yynee
{ numRemaining: 1, suggestions: [ 'acted' ] }
```

### Known bugs

- [ ] When a letter is already `y` and should not show up in other positions, if it does show up, its should be `n` rather than `e` to match wordle
