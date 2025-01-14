import { ParsingError, ValueParser } from "./api";

describe("#3 Kata - Use Expressions to implement parsers", () => {
  describe("Numbers", () => {
    xit("should parse a digit", () => {
      // Given a parser with some input containing integers
      const parser = new ValueParser();
      parser.setInput("1234");
      // When the parser tries to consume a single digit
      const output = parser.parseDigit();
      // Then it should have consumed the first digit
      expect(output).toBe("1");
      expect(parser.getCurrent()).toBe("2");
    });

    xit("should parse decimals", () => {
      // Given a parser with some input containing integers
      const parser = new ValueParser();
      parser.setInput("1234");
      // When the parser tries to consume a decimal number with
      // multiple digits
      const output = parser.parseDecimal();
      // Then it should have parsed the whole input
      expect(output).toEqual(1234);
    });

    xit("should parse hex-decimals", () => {
      // Given a parser with some input containing a hex number
      const parser = new ValueParser();
      parser.setInput("0xFF");
      // When the parser tries to consume a decimal number with
      // multiple digits
      const output = parser.parseHexDecimal();
      // Then it should have parsed the whole input
      expect(output).toEqual(255);
    });

    xit("should parse binary numbers", () => {
      // Given a parser with some input containing a binary number
      const parser = new ValueParser();
      parser.setInput("0b101010");
      // When the parser tries to consume a decimal number with
      // multiple digits
      const output = parser.parseBinary();
      // Then it should have parsed the whole input
      expect(output).toEqual(42);
    });

    xit("should parse floating point numbers", () => {
      // Given a parser with some input containing a float number
      const parser = new ValueParser();
      parser.setInput("0.55");
      // When the parser tries to consume a decimal number with
      // multiple digits
      const output = parser.parseFloat();
      // Then it should have parsed the whole input
      expect(output).toEqual(0.55);
    });

    xit("should parse all supported number types", () => {
      const parser = new ValueParser();
      // Decimals
      parser.setInput("55");
      expect(parser.parseNumber()).toBe(55);
      // Hex decimals
      parser.setInput("0xf");
      expect(parser.parseNumber()).toBe(15);
      // Binary numbers
      parser.setInput("0b101010");
      expect(parser.parseNumber()).toBe(42);
      // Floats
      parser.setInput("0.55");
      expect(parser.parseNumber()).toBe(0.55);
    });
  });
});
