import Loadable from 'react-loadable';
import Loading from '../loading';

export default (component) => {
    return(
        Loadable({
            loader: () => component,
            loading: Loading,
            delay: 300,                     //超过0.3 seconds 才会展示Loading组件
            timeout: 10000,                 //10 seconds 就当作超时
        })
    )
};