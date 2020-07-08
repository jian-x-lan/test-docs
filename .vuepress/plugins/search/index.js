const { path } = require("@vuepress/shared-utils");
const { getPageText } = require("./utils");


module.exports = (options) => ({
  name:'my-search-plugin',
  //用于拓展或者修改 $page 对象
  extendPageData ($page) {
    $page.content = getPageText($page);
  },
  alias: {
    "@SearchBox": path.resolve(__dirname, "SearchBox.vue"),
  },
  define: {
    SEARCH_MAX_SUGGESTIONS: options.maxSuggestions || 10,
    SEARCH_PATHS: options.searchPaths || null,
    SEARCH_HOTKEYS: options.searchHotkeys || "s",
    SEARCH_RESULT_LENGTH:
      Number(options.searchResultLength) || 60,
  },
});
