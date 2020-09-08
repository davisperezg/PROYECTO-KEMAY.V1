const FilterWarningsPlugin = require('webpack-filter-warnings-plugin');

module.exports = {
  // ... rest of webpack config
  plugins: [
    new FilterWarningsPlugin({
      exclude: /Critical dependency: the request of a dependency is an expression/,
    })
  ]
}
