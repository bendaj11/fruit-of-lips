export const toHighlightedText = (text: string, regex: RegExp) =>
  text.replace(regex, '<span class="highlighted-result">$&</span>');
