import fs from 'node:fs/promises';
import path from 'node:path';

const SOURCE_ROOTS = ['src'];
const LOCALES_DIR = path.join(process.cwd(), 'src', 'lib', 'i18n', 'locales');
const LOCALES = ['es', 'en'] as const;

const FILE_EXTENSIONS = new Set(['.ts', '.tsx', '.js', '.jsx']);
const TRANSLATION_REGEX = /\bt\(\s*['"]([^'"]+)['"]/g;

const walk = async (dir: string, files: string[] = []) => {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    if (entry.name.startsWith('.')) {
      continue;
    }
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      await walk(fullPath, files);
      continue;
    }
    if (FILE_EXTENSIONS.has(path.extname(entry.name))) {
      files.push(fullPath);
    }
  }
  return files;
};

const collectKeys = async () => {
  const files: string[] = [];
  for (const root of SOURCE_ROOTS) {
    await walk(path.join(process.cwd(), root), files);
  }

  const keys = new Set<string>();
  for (const file of files) {
    const content = await fs.readFile(file, 'utf8');
    for (const match of content.matchAll(TRANSLATION_REGEX)) {
      if (match[1]) {
        keys.add(match[1]);
      }
    }
  }

  return Array.from(keys).sort();
};

const loadLocale = async (locale: string) => {
  try {
    const raw = await fs.readFile(path.join(LOCALES_DIR, `${locale}.json`), 'utf8');
    return JSON.parse(raw) as Record<string, string>;
  } catch {
    return {};
  }
};

const writeLocale = async (locale: string, data: Record<string, string>) => {
  const json = `${JSON.stringify(data, null, 2)}\n`;
  await fs.writeFile(path.join(LOCALES_DIR, `${locale}.json`), json, 'utf8');
};

const run = async () => {
  const keys = await collectKeys();

  await fs.mkdir(LOCALES_DIR, { recursive: true });

  for (const locale of LOCALES) {
    const existing = await loadLocale(locale);
    const next: Record<string, string> = {};

    for (const key of keys) {
      next[key] = existing[key] ?? '';
    }

    await writeLocale(locale, next);
  }

  console.log(`i18n: extracted ${keys.length} keys`);
};

run().catch((error) => {
  console.error('i18n:extract failed', error);
  process.exit(1);
});
