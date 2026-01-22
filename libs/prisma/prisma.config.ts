import path from 'node:path';
import { defineConfig } from 'prisma/config';
import { config } from 'dotenv';

config();

export default defineConfig({
  schema: path.join(__dirname, 'schema.prisma'),
});
