import { FONTS } from '../data/fonts';

let fontsPromise: Promise<string[]> | undefined;

export async function getFonts(): Promise<string[]> {
  if (!fontsPromise) {
    // no fonts requested yet, return default fonts
    return Promise.resolve([...FONTS]);
  }

  return fontsPromise;
}

/**
 * Returns true if local fonts have not been requested before, otherwise,
 * returns false.
 */
export function requestLocalFonts(): boolean {
  if (fontsPromise) {
    return false;
  }

  if ('fonts' in navigator) {
    fontsPromise = getFontsViaLocalFontAccess();
    return true;
  }

  return false;
}

async function getFontsViaLocalFontAccess(): Promise<string[]> {
  const status = await navigator.permissions.query({
    name: 'font-access',
  } as unknown as PermissionDescriptor);
  if (status.state === 'denied')
    throw new Error('Cannot enumerate local fonts');

  const fonts: string[] = [];
  for await (const font of await navigator.fonts.query()) {
    fonts.push(font.family);
  }

  return fonts.filter((value, index) => fonts.indexOf(value) === index);
}
