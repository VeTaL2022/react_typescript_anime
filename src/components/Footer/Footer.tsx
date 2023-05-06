import {Link} from "react-router-dom";
import React, {FC} from "react";

import './Footer.scss';

export const Footer: FC<{ info: string }> = ({info}) => {

    return (
        <div className={'footer'}>
            <div>
                <span><big>©</big>{new Date().getFullYear()} All Rights Reserved</span>
                <span>All Information provided by&nbsp;
                    <Link to={'https://jikan.moe/'} target={'_blank'}>Jikan</Link>,&nbsp;
                    <Link to={'https://newscatcherapi.com/'}
                          target={'_blank'}><React.Fragment>{'</'}newscatcher{'> '}</React.Fragment></Link>,&nbsp;
                    <Link to={'https://animechan.vercel.app/'} target={'_blank'}>Animechan</Link>,&nbsp;
                    <Link to={'https://waifu.pics/'} target={'_blank'}>WAIFU.PICS</Link>
                    </span>
            </div>
            <span className={'info'}>{info}</span>
        </div>
    );
};
