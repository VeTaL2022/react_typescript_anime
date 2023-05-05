import {FC, useState} from "react";

import {IAnimeData} from "../../../interfaces";
import './AnimeThemeSongs.scss';

export const AnimeThemeSongs: FC<{ anime: IAnimeData }> = ({anime}) => {
    const [openingThemeSize, setOpeningThemeSize] = useState<number>(10);
    const [endingThemeSize, setEndingThemeSize] = useState<number>(10);

    return (
        <div className={'anime-theme-songs'}>
            <div className="double-section">
                {anime.theme.openings?.length > 0 && (
                    <div
                        style={{borderBottom: anime.theme.openings.length < 10 || anime.theme.endings.length < 10 ? '' : '1px solid dimgray'}}
                    >
                        <h4>Opening Theme</h4>
                        <span>
                            {anime.theme.openings?.slice(0, openingThemeSize).map((v, i) => (
                                <span key={i}>{v}</span>
                            ))}
                        </span>
                    </div>
                )}
                {anime.theme.endings?.length > 0 && (
                    <div
                        style={{borderBottom: anime.theme.endings.length < 10 || anime.theme.openings.length < 10 ? '' : '1px solid dimgray'}}>
                        <h4>Ending Theme</h4>
                        <span>
                        {anime.theme.endings?.slice(0, endingThemeSize).map((v, i) => (
                            <span key={i}>{v}</span>
                        ))}
                    </span>
                    </div>
                )}
            </div>

            {anime.theme.openings.length > 10 || anime.theme.endings.length > 10 ? (
                <div className="more-less-button">
          <span
              onClick={() => {
                  setOpeningThemeSize(
                      openingThemeSize === 10 ? anime.theme.openings.length : 10
                  );
                  setEndingThemeSize(
                      endingThemeSize === 10 ? anime.theme.endings.length : 10
                  );
              }}
          >
            {openingThemeSize === 10 ? 'More Op/Ed' : 'Less Op/Ed'}
          </span>
                </div>
            ) : null}
        </div>
    );
};
