import { Configuration } from 'webpack';
import { cssLoader, fileLoader, tsLoader } from './loader';
import { resolve } from './other';
import { plugins } from './plugin';
import { paths } from './paths';

type Env = 'Test' | 'Dev' | 'Prod';
export const webpackConfigFn = (env: Env) => {
	const mode: Configuration['mode'] = env === 'Prod' ? 'production' : 'development';
	return {
		entry: paths.appIndexJs,
		output: {
			path: paths.appBuild,
			filename: '[name].[hash].js',
		},
		mode,
		module: {
			rules: [{ ...tsLoader }, { ...cssLoader }, { ...fileLoader }],
		},
		resolve,
		plugins,
	};
};
