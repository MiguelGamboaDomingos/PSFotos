const { getDefaultConfig } = require('expo/metro-config');

module.exports = (async () => {
  const defaultConfig = await getDefaultConfig(__dirname);

  // Adiciona 'cjs' à lista de extensões de ativos resolvidos
  defaultConfig.resolver.assetExts.push('cjs');

  return defaultConfig;
})();
