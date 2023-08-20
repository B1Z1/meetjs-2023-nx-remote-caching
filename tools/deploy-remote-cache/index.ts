import { execSync } from 'child_process';

execSync('yarn build:remote-cache');
execSync('yarn link', { cwd: './dist/remote-cache' });
execSync('yarn link @meetjs-2023-nx-remote-caching/remote-cache');
