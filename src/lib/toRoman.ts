/**
 * Converts a given integer to its Roman numeral representation.
 *
 *
 * Valid for numbers in the range 1–3999.
 *
 * @param num - The integer to convert to Roman numerals
 * @returns A string representing the Roman numeral
 */
export function toRoman(num: number): string {
  if (num <= 0 || num >= 4000 || !Number.isInteger(num)) {
    throw new Error('Input must be an integer between 1 and 3999.')
  }

  const romanMap: { value: number; symbol: string }[] = [
    { value: 1000, symbol: 'M' },
    { value: 900, symbol: 'CM' },
    { value: 500, symbol: 'D' },
    { value: 400, symbol: 'CD' },
    { value: 100, symbol: 'C' },
    { value: 90, symbol: 'XC' },
    { value: 50, symbol: 'L' },
    { value: 40, symbol: 'XL' },
    { value: 10, symbol: 'X' },
    { value: 9, symbol: 'IX' },
    { value: 5, symbol: 'V' },
    { value: 4, symbol: 'IV' },
    { value: 1, symbol: 'I' },
  ]

  let result = ''

  for (const { value, symbol } of romanMap) {
    while (num >= value) {
      result += symbol
      num -= value
    }
  }

  return result
}
