/* Create Vue plugging to make global function */
const ObjectsPlugin = {
    install(Vue, options) {
      Vue.getObjectPath = (obj, path, defaultValue) => {
        if (!obj) {
          return defaultValue;
        }
  
        if (!path) {
          return defaultValue;
        }
  
        const arrKeys = path.split('.');
        let itr = 0;
        let tmp = obj;
  
        while (itr < arrKeys.length) {
          tmp = tmp[arrKeys[itr]];
          if (tmp === null || tmp === undefined) {
            return defaultValue;
          }
          itr++;
        }
        return tmp;
      };
    }
  };
  
  export default ObjectsPlugin;