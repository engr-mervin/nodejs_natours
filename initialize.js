import { TOURS_SIMPLE } from './paths.js';
import fs from 'node:fs';
export const tours = JSON.parse(fs.readFileSync(TOURS_SIMPLE, 'utf-8'));
