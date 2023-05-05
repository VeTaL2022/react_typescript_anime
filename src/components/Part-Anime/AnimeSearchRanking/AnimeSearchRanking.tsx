import {KeyboardArrowRight} from "@mui/icons-material";
import {Link} from "react-router-dom";
import {FC} from "react";

import {search_ranking_items} from "../../../configs";
import './AnimeSearchRanking.scss';

export const AnimeSearchRanking: FC = () => {

    return (
        <div style={{marginTop: 40}}>
            <div className={'ranking-title'}>
                <span>Rankings</span>
            </div>

            <div className={'ranking-container'}>
                {search_ranking_items.map((ranking, index) =>
                    <div key={index}>
                        <Link to={ranking.url}>
                            <KeyboardArrowRight fontSize='small'/>
                            {ranking.name}
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
};
