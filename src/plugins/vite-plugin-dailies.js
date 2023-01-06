const log = console.log.bind(console, '%c[vite:dailies]', 'color: pink;');

function dailiesPlugin(userOptions) {
  const virtualModuleIds = ['~dailies', 'virtual:generated-dailies'];
  const MODULE_ID_VIRTUAL = '/@vite-plugin-dailies/generated-dailies';

  return {
    name: 'vite-plugin-dailies',
    enforce: 'pre',
    resolveId(id) {
      if (virtualModuleIds.includes(id)) {
        return `${MODULE_ID_VIRTUAL}?id=${id}`;
      }
      return null;
    },
    load(id) {
      log(id);
      const { moduleId, pageId } = parsePageRequest(id);
      //   log(moduleId, pageId);
      if (moduleId === MODULE_ID_VIRTUAL && pageId) {
        const { dir } = userOptions;

        let codes = `
            export const message = ${JSON.stringify(dir)};

            export const modules = import.meta.globEager('/data/**/*.json');
            const generateDaily = () => {
                const modules = import.meta.globEager('/data/**/*.json');
                return Object.entries(modules).map(([fileName, { default: articles }]) => {
                    const [, name] = fileName.match(/([0-9a-zA-Z\-]+)\.json$/);
                    return {
                        name,
                        articles,
                    };
                });
            }

            const dailies = generateDaily();

            export default dailies;
        `;

        return codes;
      }
      return null;
    },
  };
}

const parsePageRequest = (id) => {
  const [moduleId, rawQuery] = id.split('?', 2);
  const query = new URLSearchParams(rawQuery);
  const pageId = query.get('id');
  return {
    moduleId,
    query,
    pageId,
  };
};

export default dailiesPlugin;
