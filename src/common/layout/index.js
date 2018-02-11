import React,{ Component } from 'react'
import { public_url } from '../../tools/common'
import style from './index.module.scss';

class Index extends Component {
    render(){
        return(
            <div>
                <header className={style.header}>
                    <div className={style.content}>
                        <div className={style.log}>
                            <span className={style.middle_helper}/>
                            <img src={public_url+"/static/pages/layout/Logo.png"}
                                 alt={"Logo"}
                            />
                        </div>
                        <div>
                            <span>房源管理</span>
                        </div>
                        <div>
                            <span>合同管理</span>
                        </div>
                        <div>
                            <span>用户管理</span>
                        </div>
                        <div>
                            <span>通知管理</span>
                        </div>
                        <div className={style.name}>
                            <span>momo.zxy</span>
                        </div>
                        <div className={style.profilePicture}>
                            <span className={style.middle_helper}/>
                            <img src={public_url+"/static/pages/layout/profilePicture.jpg"}
                                 alt={"profilePicture"}
                            />
                        </div>
                        <div className={style.prompt}>
                            <span className={style.middle_helper}/>
                            <img src={public_url+"/static/pages/layout/prompt.png"}
                                 alt={"prompt"}
                            />
                            <img src={public_url+"/static/pages/layout/prompt_num.png"}
                                 className={style.prompt_num}
                                 alt={"prompt_num"}
                            />
                            <span className={style.num}>1</span>
                        </div>
                    </div>
                </header>
                <div className={style.body}>
                    {this.props.children}
                </div>
            </div>
        )
    }
}

export default Index