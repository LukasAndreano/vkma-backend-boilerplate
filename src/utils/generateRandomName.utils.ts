const generateRandomName = (length: number) =>
  Array(length)
    .fill(null)
    .map(() => Math.round(Math.random() * 16).toString(16))
    .join("");

export default generateRandomName;
