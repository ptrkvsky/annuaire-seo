const generateId = (length: number) => {
  let lengthPos = length;
  if (length < 0 || length === 0) {
    lengthPos = 10;
  }

  let result = ``;
  const characters = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789`;
  const charactersLength = characters.length;
  for (let i = 0; i < lengthPos; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

export default generateId;
