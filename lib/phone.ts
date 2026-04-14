export const getPhoneDigits = (value: string) => value.replace(/\D/g, "");

const formatGroupedTail = (digits: string) => {
  const first = digits.slice(0, 3);
  const second = digits.slice(3, 5);
  const third = digits.slice(5, 7);

  let formatted = first;
  if (second) {
    formatted += `-${second}`;
  }
  if (third) {
    formatted += `-${third}`;
  }

  return formatted;
};

const formatBelarusInternational = (digits: string) => {
  const operatorCode = digits.slice(3, 5);
  const tail = digits.slice(5, 12);

  let formatted = "+375";
  if (operatorCode) {
    formatted += ` (${operatorCode}`;
    if (operatorCode.length === 2) {
      formatted += ")";
    }
  }
  if (tail) {
    formatted += ` ${formatGroupedTail(tail)}`;
  }

  return formatted;
};

const formatBelarusDomestic = (digits: string) => {
  const operatorCode = digits.slice(1, 4);
  const tail = digits.slice(4, 11);

  let formatted = "8";
  if (operatorCode) {
    formatted += ` ${operatorCode}`;
  }
  if (tail) {
    formatted += ` ${formatGroupedTail(tail)}`;
  }

  return formatted;
};

const formatRussianInternational = (digits: string) => {
  const operatorCode = digits.slice(1, 4);
  const tail = digits.slice(4, 11);

  let formatted = "+7";
  if (operatorCode) {
    formatted += ` (${operatorCode}`;
    if (operatorCode.length === 3) {
      formatted += ")";
    }
  }
  if (tail) {
    formatted += ` ${formatGroupedTail(tail)}`;
  }

  return formatted;
};

const formatRussianDomestic = (digits: string) => {
  const operatorCode = digits.slice(1, 4);
  const tail = digits.slice(4, 11);

  let formatted = "8";
  if (operatorCode) {
    formatted += ` (${operatorCode}`;
    if (operatorCode.length === 3) {
      formatted += ")";
    }
  }
  if (tail) {
    formatted += ` ${formatGroupedTail(tail)}`;
  }

  return formatted;
};

export const formatPhoneNumber = (value: string) => {
  const trimmed = value.trimStart();
  const hasLeadingPlus = trimmed.startsWith("+");
  const digits = getPhoneDigits(value);

  if (!digits) {
    return hasLeadingPlus ? "+" : "";
  }

  if (hasLeadingPlus || digits.startsWith("375")) {
    if (digits.startsWith("375")) {
      return formatBelarusInternational(digits.slice(0, 12));
    }

    if (digits.startsWith("7")) {
      return formatRussianInternational(digits.slice(0, 11));
    }

    return `+${digits}`;
  }

  if (digits.startsWith("80")) {
    return formatBelarusDomestic(digits.slice(0, 11));
  }

  if (digits.startsWith("8")) {
    return formatRussianDomestic(digits.slice(0, 11));
  }

  if (digits.startsWith("7")) {
    return formatRussianInternational(digits.slice(0, 11));
  }

  return digits;
};

export const isValidPhoneNumber = (value: string) => {
  const digits = getPhoneDigits(value);

  return (
    /^375\d{9}$/.test(digits) ||
    /^80\d{9}$/.test(digits) ||
    /^7\d{10}$/.test(digits) ||
    /^8\d{10}$/.test(digits)
  );
};
