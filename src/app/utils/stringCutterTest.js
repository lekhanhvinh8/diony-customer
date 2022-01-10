export const cut = (sentence, lengthToCut /*(1)*/) => {
  if (sentence.length < lengthToCut /*(2)*/) {
    sentence = sentence.padEnd(lengthToCut - 1, " "); /*(3)*/
  } else if (sentence.length > lengthToCut /*(4)*/) {
    const format = sentence.slice(0, lengthToCut - 3); /*(5)*/
    return format + "..."; /*(6)*/
  }

  return sentence; /* (7) */
};
