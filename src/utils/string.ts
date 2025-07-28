export const escapeRegExp = (string: string) =>
  string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

export const onlyWhiteSpaceRegex = /^(\s|u3000)+$/;
