import {Close, ExpandLess, ExpandMore} from "@mui/icons-material";
import {NavLink, useParams} from "react-router-dom";
import {FC, useEffect, useRef} from "react";

import {search_ranking_items} from "../../../configs";
import './AnimesHeader.scss';

interface IProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    sorted: string;
    setSorted: (sorted: string) => void;
    selectedType: string,
    selectedYear: string,
    selectedSeason: string,
    selectedProducer: string,
    setCurrentPage: (page: number) => void,
}

export const AnimesHeader: FC<IProps> = ({
                                             open,
                                             setOpen,
                                             sorted,
                                             setSorted,
                                             selectedType,
                                             selectedYear,
                                             selectedSeason,
                                             selectedProducer,
                                             setCurrentPage,
                                         }) => {
    const {chosenGenre = '', chosenProducer = ''} = useParams();
    const sortedOption = ['score', 'members', 'title'];
    const selectionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (selectionRef.current && !selectionRef.current.contains(event.target as Node)) {
                setTimeout(() => {
                    setOpen(false);
                }, 200)
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [selectionRef]);

    const showOpen = (): void => setOpen(!open);

    return (
        <div className={'animes_header'}>
            {chosenGenre ? (
                <div className={'chosen_genre'}>
                    <span>{chosenGenre.charAt(0).toUpperCase() + chosenGenre.slice(1)} Anime</span>
                    <div onClick={showOpen} className={'open'}>
                    <span>
                        Sorted by {sorted.charAt(0).toUpperCase() + sorted.slice(1)}
                    </span>
                        {!open ? (
                            <ExpandMore fontSize={'small'}/>
                        ) : <ExpandLess fontSize={'small'}/>}
                    </div>
                </div>
            ) : selectedProducer ?
                (<div className={'chosen_producer'}>
                    <span>{chosenProducer.charAt(0).toUpperCase() + chosenProducer.slice(1)} Anime</span>
                    <div onClick={showOpen} className={'open'}>
                <span>
                    Sorted by {sorted.charAt(0).toUpperCase() + sorted.slice(1)}
                </span>
                        {!open ? (
                            <ExpandMore fontSize={'small'}/>
                        ) : <ExpandLess fontSize={'small'}/>}
                    </div>
                </div>)
                : selectedType ?
                    (<div className={'chosen_type'}>
                         {search_ranking_items.map((rank, index) => <NavLink to={rank.url}
                                                                            key={index}
                                                                            className={({isActive}) => isActive ? 'active-item' : 'item'}
                                                                            onClick={() => setCurrentPage(1)}>{rank.name}</NavLink>)}
                    </div>)
                    : selectedYear && selectedSeason ?
                        (<div
                            className={'chosen_year_season'}>{selectedSeason.charAt(0).toUpperCase() + selectedSeason.slice(1)} {selectedYear}</div>)

                        : (<div className={'chosen_default'}>
                            {search_ranking_items.map((rank, index) => <NavLink to={rank.url}
                                                                                key={index}
                                                                                className={({isActive}) => isActive ? 'active-item' : 'item'}
                                                                                onClick={() => setCurrentPage(1)}>{rank.name}</NavLink>)}
                        </div>)
            }

            {open && (
                <div className={'selection'} ref={selectionRef}>
                    <div className={'close-icon'}>
                        <Close onClick={() => setOpen(false)} fontSize={'small'} style={{cursor: "pointer"}}/>
                    </div>
                    <div className={'sorted-options'}>
                        {sortedOption.map((option, index) =>
                            <span key={index}
                                  onClick={() => {
                                      setSorted(option);
                                      setOpen(false);
                                      setCurrentPage(1);
                                  }} className={'option'}>
                            {option.charAt(0).toUpperCase() + option.slice(1)}
                        </span>)}
                    </div>
                </div>
            )}
        </div>
    );
};
