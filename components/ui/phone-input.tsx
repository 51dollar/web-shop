import * as React from "react";

import { cn } from "@/lib/utils";
import { formatPhoneNumber, getPhoneDigits } from "@/lib/phone";

type PhoneInputProps = Omit<React.ComponentProps<"input">, "type" | "inputMode">;
type NativeInputEvent = Parameters<NonNullable<PhoneInputProps["onInput"]>>[0];
type NativeChangeEvent = Parameters<NonNullable<PhoneInputProps["onChange"]>>[0];
type NativeKeyDownEvent = Parameters<NonNullable<PhoneInputProps["onKeyDown"]>>[0];

const isDigit = (value?: string) => (value ? /\d/.test(value) : false);

const countDigits = (value: string) => getPhoneDigits(value).length;

const findCaretByDigitIndex = (value: string, digitIndex: number) => {
  if (digitIndex <= 0) {
    return value.startsWith("+") ? 1 : 0;
  }

  let seenDigits = 0;

  for (let index = 0; index < value.length; index += 1) {
    if (isDigit(value[index])) {
      seenDigits += 1;
    }

    if (seenDigits === digitIndex) {
      return index + 1;
    }
  }

  return value.length;
};

const setCaretByDigitIndex = (input: HTMLInputElement, digitIndex: number) => {
  requestAnimationFrame(() => {
    const caret = findCaretByDigitIndex(input.value, digitIndex);
    input.setSelectionRange(caret, caret);
  });
};

const removeDigitAt = (digits: string, digitIndex: number) =>
  `${digits.slice(0, digitIndex)}${digits.slice(digitIndex + 1)}`;

const findPreviousDigitIndex = (value: string, cursor: number) => {
  const beforeCursor = value.slice(0, Math.max(cursor, 0));
  return countDigits(beforeCursor) - 1;
};

const findNextDigitIndex = (value: string, cursor: number) => {
  const beforeCursor = value.slice(0, Math.max(cursor, 0));
  return countDigits(beforeCursor);
};

const PhoneInput = React.forwardRef<HTMLInputElement, PhoneInputProps>(
  ({ className, onChange, onInput, onKeyDown, ...props }, ref) => {
    const formatWithCaret = (input: HTMLInputElement) => {
      const digitIndex = countDigits(
        input.value.slice(0, input.selectionStart ?? input.value.length)
      );

      input.value = formatPhoneNumber(input.value);
      setCaretByDigitIndex(input, digitIndex);
    };

    const handleInput = (event: NativeInputEvent) => {
      formatWithCaret(event.currentTarget);
      onInput?.(event);
    };

    const handleChange = (event: NativeChangeEvent) => {
      formatWithCaret(event.currentTarget);
      onChange?.(event);
    };

    const handleKeyDown = (event: NativeKeyDownEvent) => {
      const input = event.currentTarget;
      const start = input.selectionStart ?? 0;
      const end = input.selectionEnd ?? 0;

      if (start === end && (event.key === "Backspace" || event.key === "Delete")) {
        const cursor = event.key === "Backspace" ? start - 1 : start;
        const symbol = input.value[cursor];

        if (symbol && !isDigit(symbol)) {
          const digits = getPhoneDigits(input.value);
          const digitIndex =
            event.key === "Backspace"
              ? findPreviousDigitIndex(input.value, start)
              : findNextDigitIndex(input.value, start);

          if (digitIndex >= 0 && digitIndex < digits.length) {
            event.preventDefault();

            input.value = formatPhoneNumber(removeDigitAt(digits, digitIndex));
            setCaretByDigitIndex(input, event.key === "Backspace" ? digitIndex : digitIndex);
            input.dispatchEvent(new Event("input", { bubbles: true }));
            return;
          }
        }
      }

      onKeyDown?.(event);
    };

    return (
      <input
        ref={ref}
        type="tel"
        inputMode="tel"
        data-slot="phone-input"
        className={cn(
          "bg-input/30 border-input focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:aria-invalid:border-destructive/50 h-9 rounded-4xl border px-3 py-1 text-base transition-colors file:h-7 file:text-sm file:font-medium focus-visible:ring-[3px] aria-invalid:ring-[3px] md:text-sm file:text-foreground placeholder:text-muted-foreground w-full min-w-0 outline-none file:inline-flex file:border-0 file:bg-transparent disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        onChange={handleChange}
        onInput={handleInput}
        onKeyDown={handleKeyDown}
        {...props}
      />
    );
  }
);

PhoneInput.displayName = "PhoneInput";

export { PhoneInput };
