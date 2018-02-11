//react-app-rewired用来重写create-react-app的默认配置
const { injectBabelPlugin } = require('react-app-rewired');

//react-app-rewire-less用来重写antd less的默认样式
const rewireLess = require('react-app-rewire-less');

//react-app-rewire-css-modules用来添加 CSS Modules 功能。包括scss,sass。
const rewireCssModules = require('react-app-rewire-css-modules');

//修改eslint,支持jquery
const rewireEslint = require('react-app-rewire-eslint');


module.exports = function override(config, env) {
    //按需加载组件代码和样式
    config = injectBabelPlugin(['import', { libraryName: 'antd', style: true }], config);

    //重写antd的less属性
    config = rewireLess.withLoaderOptions({
        modifyVars: { "@primary-color": "#39ac6a" },
    })(config, env);

    //设置CSS Modules生效
    config = rewireCssModules(config, env);

    //修改eslint,支持jquery
    config = rewireEslint(config, env);

    return config;
};