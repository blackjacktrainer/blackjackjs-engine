import { keys, SimpleObject } from '../types';

export type CliSettings = {
  help: boolean;
};

export function kebabCase(str: string): string {
  return str.replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, '$1-$2').toLowerCase();
}

// See https://stackoverflow.com/a/52584017/659910
export function titleCase(str: string): string {
  return str
    .replace(/([A-Z])/g, (match) => ` ${match}`)
    .replace(/^./, (match) => match.toUpperCase())
    .trim();
}

export function printUsageOptions<T extends SimpleObject>(
  defaultSettings: T,
  valueOverrides: Partial<{ [key in keyof T]: string | string[] }> = {}
): void {
  keys(defaultSettings).forEach((key) => {
    const value = defaultSettings[key];
    if (typeof value === 'object') {
      printUsageOptions(value, valueOverrides);
    } else {
      console.log(
        [`  --${kebabCase(key.toString())}`, value, valueOverrides[key]].join(
          ' '
        )
      );
    }
  });
}
