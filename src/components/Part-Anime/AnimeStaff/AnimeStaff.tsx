import {Link} from "react-router-dom";
import {FC} from "react";

import {IAnimeStaffResponse} from "../../../interfaces";
import './AnimeStaff.scss';

export const AnimeStaff: FC<{ staffData: IAnimeStaffResponse }> = ({staffData}) => {

    return (
        <div className={'anime-staff'}>
            {staffData.data.slice(0, 4).map((st, index) =>
                <div key={index} className={'staff-child'}>
                    <Link to={`/people/${st.person.mal_id}/${st.person.name}`}>
                        <img src={st.person.images.jpg.image_url} alt={st.person.name}/>
                    </Link>
                    <div className={'stt'}>
                        <span>
                        <Link to={`/people/${st.person.mal_id}/${st.person.name}`}>{st.person.name}</Link>
                        </span>
                        <div className={'inf'}>{st.positions?.map((p, i) =>
                            <i key={i}>
                                {p}{i < st.positions.length - 1 && ','}
                            </i>)}
                        </div>
                    </div>
                </div>)}
        </div>
    );
};
