export default function HtmlWebpackInjectAssetsPlugin() {}

HtmlWebpackInjectAssetsPlugin.prototype.apply = function apply(compiler) {
  compiler.plugin('compilation', (compilation) => {
    compilation.plugin('html-webpack-plugin-before-html-generation',
      (htmlPluginData, callback) => {
        const pluginOptions = htmlPluginData.plugin.options
        const assetsToInject = pluginOptions.injectAssets || {}
        Object.keys(assetsToInject).forEach((id) => {
          const { assets } = compilation
          const assetName = assetsToInject[id]
          const asset = assets[assetName]
          if (asset) {
            // Replace the asset name with its compiled output. The text can be
            // referenced in the ejs template, e.g.
            //    <%= htmlWebpackPlugin.options.injectAssets.myAsset %>
            assetsToInject[id] = asset.source().toString()

            // Because the asset will be injected through the template directly,
            // there is no need to output it with the compilation.
            delete assets[assetName]
          }
        })
        callback(null, htmlPluginData)
      })
  })
}
