export const cut = (sentence: string, lengthToCut: number) => {
  if (sentence.length < lengthToCut) {
    sentence = sentence.padEnd(lengthToCut - 1, " ");
  }

  if (sentence.length > lengthToCut) {
    const format = sentence.slice(0, lengthToCut - 3);
    return format + "...";
  }

  return sentence;
};
