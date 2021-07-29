const fillRepeatArray = (a: string[], length: number) => {
  if (a.length >= length) {
    return a.slice(0, length);
  } else {
    const repeats = Math.ceil(length / a.length);
    return Array.from({length: repeats}, () => a)
        .flat()
        .slice(0, length);
  }
};

export default fillRepeatArray;
