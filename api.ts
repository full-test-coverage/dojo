export class ParsingError {
  private message: string;
  constructor(message: string) {
    this.message = message;
  }
  toString(): string {
    return this.message;
  }
}
export class BaseParser {
  public cursor: number;
  private stream: Buffer | undefined;
  constructor() {
    this.cursor = 0;
    this.stream = undefined;
  }
  setInput = (input: string) => {
    this.stream = Buffer.from(input);
  };
  next = () => {
    const { stream } = this;
    const ns = this.cursor + 1;
    if (ns > stream.length) {
      throw new ParsingError("End of input");
    }
    this.cursor = ns;
  };
  getCurrent = (): string | undefined => {
    const code = this.stream[this.cursor];
    if (!code) {
      this.cursor = 0;
    }
    return String.fromCharCode(code);
  };
  expectString = (hypothesis: string): string => {
    const { expect } = this;
    const expression = Array.from(hypothesis)
                            .map(c => expect(c))
                            .join("");
    if (expression === hypothesis) {
      return expression;
    } else {
      this.cursor = 0;
      throw new ParsingError(`Expected '${hypothesis}', got '${expression}'`);
    }
  };
  expect = (hypothesis: string): string => {
    const absolute = this.getCurrent();
    if (absolute !== hypothesis) {
      throw new ParsingError(`Expected '${hypothesis}', got '${absolute}'`);
    }
    this.next();
    return absolute;
  };
  zeroOrMore = (hook: () => string): Array<string> => {
    const umbrella = [];
    for (; ;) {
      try {
        umbrella.push(hook.apply(this));
      } catch (e) {
        break;
      }
    }
    return Array.from(umbrella).filter(c => c.length > 0);
  };
  oneOrMore = (hook: () => string): Array<string> => {
    return [];
  };
  or = (callbacks: Array<() => string>): string => {

    const result = [];
    for (let ri in callbacks) {
      let hook = callbacks[ri];
      try {
        let expression = hook.call(this);
        if (expression) {
          result.push(expression);
        }
      } catch (e) {
        this.cursor = 0;
        continue;
      }
    }
    return result.join("-");
  };
}

export class ValueParser extends BaseParser {
  parseBinary = (): number => {
    return 0;
  };
  parseDecimal = (): number => {
    return 0;
  };
  parseDigit = (): string => {
    return `0`;
  };
  parseFloat = (): number => {
    return 0;
  };
  parseHexDecimal = (): number => {
    return 0;
  };
  parseNumber = (): number => {
    return 0;
  };
}
