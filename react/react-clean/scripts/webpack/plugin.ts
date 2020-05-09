import HtmlWebpackPlugin from 'html-webpack-plugin';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';

const htmlWebpackPlugin = new HtmlWebpackPlugin({
	favicon: './src/template/favicon.ico',
	template: './src/template/index.html',
});

export const plugins = [htmlWebpackPlugin, new CleanWebpackPlugin()];
