import url from 'node:url';
import { TOURS_SIMPLE } from './utils/path.js';
import fs from 'node:fs';
import path from 'node:path';
export const __rootdirname = path.dirname(url.fileURLToPath(import.meta.url));
export const tours = JSON.parse(fs.readFileSync(__rootdirname + path.sep + TOURS_SIMPLE, 'utf-8'));
