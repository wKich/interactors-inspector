type Entries<T> = Exclude<
  {
    [K in keyof T]: [K, T[K]];
  }[keyof T],
  undefined | null
>[];

export const entries = <T extends object>(obj: T): Entries<T> => (Object.entries(obj) as unknown) as Entries<T>;

export const delay = (ms: number): Promise<void> => new Promise((resolve) => setTimeout(resolve, ms));
