import {KeyboardArrowRight} from "@mui/icons-material";
import {Link} from "react-router-dom";
import {FC} from "react";

import {search_demographics_items, search_genre_items, search_themes_items} from "../../../configs";
import {IGenre} from "../../../interfaces";
import './AnimeSearchGenre.scss';

interface IProps {
    title: string,
    items: IGenre[],
}

const GenreList: FC<IProps> = ({title, items}) => {
    const rows = [];

    for (let i = 0; i < items.length; i += 5) {
        const rowItems = items.slice(i, i + 5);

        rows.push(
            <tr key={i} className={'genre-container'}>
                {rowItems.map((item, index) => (
                    <td key={index}
                        style={{borderBottom: i + 5 < items.length ? '1px solid rgba(195, 193, 193, 0.57)' : 'none'}}>
                        <Link to={`genre/${item.mal_id}/${item.name}`} state={item.count}>
                            <KeyboardArrowRight fontSize={"small"}/>
                            {item.name} ({item.count})
                        </Link>
                    </td>
                ))}
            </tr>
        );
    }
    return (
        <div className="genre-type">
            <span className="genre-title">{title}</span>
            <table style={{borderSpacing: 0}}>
                <tbody>
                {rows}
                </tbody>
            </table>
        </div>
    );
};

export const AnimeSearchGenre: FC = () => {

    return (
        <>
            <GenreList title="Genres" items={search_genre_items}/>
            <GenreList title="Themes" items={search_themes_items}/>
            <GenreList title="Demographics" items={search_demographics_items}/>
        </>
    );
};
