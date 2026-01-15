declare global {
  const describe: (name: string, fn: () => void) => void;
  const it: (name: string, fn: () => void) => void;
  const expect: (value: unknown) => {
    toHaveLength: (length: number) => void;
    toBe: (value: unknown) => void;
    toEqual: (value: unknown) => void;
  };
}

export {};
