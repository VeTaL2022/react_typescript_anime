import {useNavigate} from "react-router-dom";
import {FC} from "react";

import './DisclaimerPage.scss';

export const DisclaimerPage: FC = () => {
    const navigate = useNavigate();

    const handleClick = () => {
        const confirmNavigation = window.confirm('Are you sure you want to proceed?');
        if (confirmNavigation) {
            navigate('/home');
        } else {
            navigate('');
        }
    };

    return (
        <div className={'disclaimer'}>
            <div className={'container'}>
                <div className={'info'}>
                    <h2>Disclaimer</h2>
                    <p>Anime is a form of entertainment that may contain mature themes, graphic violence, and sexual
                        content.<br/><br/>Some anime series and movies may not be suitable for all audiences and may
                        be
                        intended for mature viewers. As with any form of media, it is important to use your own
                        discretion and judgement when selecting anime to watch, particularly if you are a parent or
                        guardian responsible for children.<br/><br/>We do not condone or promote any illegal
                        activity related
                        to anime, and we urge viewers to consume content in a responsible and legal manner.</p>
                    <div className={'choice'}>
                        <h3 onClick={handleClick}>Continue</h3>
                        <h3 onClick={() => window.location.href = 'https://www.google.com'}>Exit</h3>
                    </div>
                </div>
            </div>
        </div>
    );
};
