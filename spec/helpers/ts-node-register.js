import { register } from 'ts-node';

register({
  project: './tsconfig.json',
  transpileOnly: true,
  compilerOptions: {
    module: 'CommonJS'
  }
});