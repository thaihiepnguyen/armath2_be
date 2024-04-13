function isNumberString(value: string): boolean {
  const reg = /^\d+$/;
  return reg.test(value);
}

export default {
  isNumberString
}