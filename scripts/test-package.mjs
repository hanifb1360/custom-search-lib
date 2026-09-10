import {
  mkdtempSync,
  writeFileSync,
  rmSync,
} from 'node:fs';
import { execFileSync } from 'node:child_process';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';

const projectRoot = resolve('.');
const tempRoot = mkdtempSync(join(tmpdir(), 'custom-search-lib-package-'));

const run = (command, args, options = {}) =>
  execFileSync(command, args, {
    encoding: 'utf8',
    stdio: 'pipe',
    ...options,
  });

try {
  console.log('Packing package...');

  const packOutput = run(
    'npm',
    [
      'pack',
      '--json',
      '--pack-destination',
      tempRoot,
    ],
    {
      cwd: projectRoot,
    }
  );

  const packResult = JSON.parse(packOutput);
  const tarballName = packResult[0].filename;
  const tarballPath = join(tempRoot, tarballName);

  const consumerDir = join(tempRoot, 'consumer');

  run('mkdir', ['-p', consumerDir]);

  writeFileSync(
    join(consumerDir, 'package.json'),
    JSON.stringify(
      {
        name: 'custom-search-lib-consumer-test',
        private: true,
        type: 'module',
      },
      null,
      2
    )
  );

  console.log('Installing packed tarball...');

  run(
    'npm',
    [
      'install',
      '--ignore-scripts',
      tarballPath,
    ],
    {
      cwd: consumerDir,
    }
  );

  writeFileSync(
    join(consumerDir, 'esm.mjs'),
    `
import { fuzzySearch } from 'custom-search-lib';

const result = fuzzySearch(
  'cat',
  ['cat', 'bat', 'dog'],
  { threshold: 1 }
);

if (JSON.stringify(result) !== JSON.stringify(['cat', 'bat'])) {
  throw new Error(
    \`Unexpected ESM result: \${JSON.stringify(result)}\`
  );
}

console.log('ESM consumer test passed');
`.trimStart()
  );

  writeFileSync(
    join(consumerDir, 'commonjs.cjs'),
    `
const { fuzzySearch } = require('custom-search-lib');

const result = fuzzySearch(
  'cat',
  ['cat', 'bat', 'dog'],
  { threshold: 1 }
);

if (JSON.stringify(result) !== JSON.stringify(['cat', 'bat'])) {
  throw new Error(
    \`Unexpected CommonJS result: \${JSON.stringify(result)}\`
  );
}

console.log('CommonJS consumer test passed');
`.trimStart()
  );

  console.log('Testing ESM consumer...');
  process.stdout.write(
    run('node', ['esm.mjs'], {
      cwd: consumerDir,
    })
  );

  console.log('Testing CommonJS consumer...');
  process.stdout.write(
    run('node', ['commonjs.cjs'], {
      cwd: consumerDir,
    })
  );

  console.log('Packed package consumer tests passed');
} finally {
  rmSync(tempRoot, {
    recursive: true,
    force: true,
  });
}
