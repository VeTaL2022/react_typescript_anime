import {Link} from "react-router-dom";
import React, {FC} from "react";

import {IAnimeShortData} from "../../../configs";
import './HomeAnimes.scss';

interface IProps {
    title: string,
    link: string,
    data: IAnimeShortData[],
    dynamicClass: string,
}

export const HomeAnimes: FC<IProps> = ({title, link, data, dynamicClass}) => {

    return (
        <>
            <p><Link to={`/anime/type/${link}`}>{title}</Link></p>
            <div className={'home-animes'}>
                {data.map((a, i) =>
                    <Link to={`/anime/${a.mal_id}/${a.title}`} className={`anime-child ${dynamicClass}`} key={i}>
                        <div className={'home-ani-header'}>
                            <img src={a.images.jpg.image_url} alt={a.title}/>
                        </div>
                        <div className={'home-ani-footer'}>
                            <span
                                style={{minHeight: 50}}><b>{a.title.length < 35 ? a.title : a.title.slice(0, 35) + '...'}</b><br/> <br/></span>
                            <div>
                                <span>{a.type}, </span>
                                <span>{a.episodes} eps, </span>
                                <span>scored {a.score} <br/></span>
                                <span>{a.members.toLocaleString('en-US')} members</span>
                            </div>
                        </div>
                    </Link>)}
            </div>
        </>
    );
};
