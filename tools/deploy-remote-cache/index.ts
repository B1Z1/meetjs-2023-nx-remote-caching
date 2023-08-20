import { execSync } from 'child_process';

execSync('yarn build:remote-cache');
execSync('yarn link', { cwd: './dist/libs/remote-cache' });
execSync('yarn link @meetjs-2023-nx-remote-caching/remote-cache');
