const fs = require('fs');
const path = require('path');

const root = process.cwd();
const nodeDir = path.join(root, 'node_modules/html-webpack-plugin');

class HtmlBeforePlugin {
    constructor(options = {}) {
        this.options = options;
        this.init();
    }
    init() {
        const { paths } = this.options;
        if (!paths || !Array.isArray(paths)) {
            throw new Error('参数 paths 不存在或类型不为数组');
        }
        const hasHtmlPlugin = fs.existsSync(nodeDir);
        if (!hasHtmlPlugin) {
            throw new Error('请先安装 html-webpack-plugin 插件');
        }
    }
    apply(compiler) {
        const HtmlWebpackPlugin = require(nodeDir);
        compiler.hooks.compilation.tap('HtmlBeforePlugin', (compilation) => {
            HtmlWebpackPlugin.getHooks(compilation).beforeAssetTagGeneration.tapAsync(
                'HtmlBeforePlugin',
                (data, cb) => {
                    data.assets.js = [...(this.options.paths || []), ...data.assets.js];
                    cb(null, data)
                }
            )
        })
    }
}
module.exports = HtmlBeforePlugin;