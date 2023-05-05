import {FavoriteBorderOutlined, ThumbUpOffAlt} from "@mui/icons-material";
import {Link} from "react-router-dom";

import {IAnimeRecs} from "../../../interfaces";
import './AnimeRecs.scss';
import {FC} from "react";

export const AnimeRecs: FC<{ animeRecs: IAnimeRecs }> = ({animeRecs}) => {
    const {entry: data, content, user, date} = animeRecs;
    const newDate = new Date(date);
    const formattedDateString = newDate.toLocaleDateString('en-US', {month: 'short', day: 'numeric', year: 'numeric'});

    return (
        <div className={'anime-recs'}>
            <div className={'recs-container'}>
                <div className={'recs-child'}>
                    <Link to={`/anime/${data[0].mal_id}/${data[0].title}`}>
                        <img src={data[0].images.jpg.image_url} alt={data[0].title}/>
                    </Link>
                    <div className={'recs-left-side'}>
                        <span><small>If you liked</small></span>
                        <Link to={`/anime/${data[0].mal_id}/${data[0].title}`}>
                            {data[0].title}
                        </Link>
                        <FavoriteBorderOutlined fontSize={'inherit'}/>
                    </div>
                </div>

                <div className={'recs-child'}>
                    <Link to={`/anime/${data[1].mal_id}/${data[1].title}`}>
                        <img src={data[1].images.jpg.image_url} alt={data[1].title}/>
                    </Link>
                    <div className={'recs-right-side'}>
                        <span><small>...then you might like</small></span>
                        <Link to={`/anime/${data[1].mal_id}/${data[1].title}`}>{data[1].title}</Link>
                        <ThumbUpOffAlt fontSize={'inherit'}/>
                    </div>
                </div>
            </div>

            <div className={'recs-footer'}>
                <span>{content}</span>
                <span>Anime rec by&nbsp;<Link to={user.url} target={'_blank'}>{user.username}</Link>&nbsp;
                    <i>-</i>&nbsp; {formattedDateString}</span>
            </div>
        </div>
    );
};
