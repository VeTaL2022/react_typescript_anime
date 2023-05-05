import {Link, useParams} from "react-router-dom";
import {FC, useEffect} from "react";

import {useAppDispatch, useAppSelector} from "../../../hooks";
import {PersonVoiceAnime} from "../PersonVoiceAnime";
import {personActions} from "../../../redux";
import {formatDate} from "../AnimeReviews";
import {Loader} from "../../Loader";
import {Footer} from "../../Footer";
import {ToTop} from "../../ToTop";
import './Person.scss';

export const Person: FC = () => {
    const {selectedPerson} = useParams();
    const {data: person, loading} = useAppSelector(({personReducer}) => personReducer);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(personActions.getFullById({id: selectedPerson || ''}));
    }, [dispatch, selectedPerson]);

    return (
        loading ? <Loader height={100}/> :
            <>
                <div className={'person'}>
                    <div className={'person-header'}>
                        <span>{person.name}</span>
                    </div>

                    <div className={'person-body'}>
                        <div className={'left-part'}>
                            <img src={person.images.jpg.image_url} alt={person.name}/>
                            <div className={'section'}>
                                {person.given_name && (
                                    <span><b>Given Name: </b>{person.given_name}</span>
                                )}
                                {person.family_name && (
                                    <span><b>Family name: </b>{person.family_name}</span>
                                )}
                                {person.alternate_names.length > 0 && (
                                    <span><b>Alternate names: </b>{person.alternate_names.map((a, i) => <span
                                        key={i}>{a}{i < person.alternate_names.length - 1 && ', '}</span>)}</span>
                                )}
                                {person.birthday && (
                                    <span><b>Birthday: </b>{formatDate(person.birthday)}</span>
                                )}
                                {person.website_url && (
                                    <span><b>Website: </b><Link to={person.website_url}
                                                                target={'_blank'}>{person.website_url.slice(0, 24)}...</Link></span>
                                )}
                                {person.favorites > 0 && (
                                    <span><b>Member Favorites: </b>{person.favorites.toLocaleString('en-US')}</span>
                                )}
                                {person.about?.length > 0 && (
                                    <>
                                        <span><b>More:</b></span>
                                        {person.about?.replaceAll('&amp;', '&').split('\n\n').map((paragraph, index) => (
                                            <div key={index} style={{paddingBottom: 15}}>
                                                {paragraph.replace(/YouTube: @\S+\s+\S+\n/, "").split('\n').map((line, index) => {
                                                        const twitterMatch = line.match(/Twitter(?:\s*\(.+?\))?:\s*@(\w+)/);
                                                        const instagramMatch = line.match(/IG|Instagram:\s*@(\w+\.?\w*)/);

                                                        const tiktokMatch = line.match(/TikTok:\s*@(\w+\.?\w*)/);
                                                        const facebookMatch = line.match(/Facebook:\s*@([\w.]+)/);

                                                        const agencyProfileMatch = line.match(/Agency profile:\s*(https?:\/\/osawa-inc\.co\.jp\/([^\/]+\/){2})/);
                                                        const radioPageMatch = line.match(/Radio page:\s*(http?:\/\/(?:www\.)?joqr\.co\.jp\/([^\/]+\/){2})/);

                                                        if (twitterMatch) {
                                                            const name = twitterMatch[1];
                                                            const replacedLine = line.replace(`${name}`, `<a href="https://twitter.com/${name}" target="_blank">${name}</a>`);
                                                            return <p key={index}
                                                                      dangerouslySetInnerHTML={{__html: replacedLine}}/>;
                                                        } else if (instagramMatch) {
                                                            const name = instagramMatch[1];
                                                            const replacedLine = line.replace(`${name}`, `<a href="https://www.instagram.com/${name}/" target="_blank">${name}</a>`);
                                                            return <p key={index}
                                                                      dangerouslySetInnerHTML={{__html: replacedLine}}/>;
                                                        } else if (tiktokMatch) {
                                                            const name = tiktokMatch[1];
                                                            const replacedLine = line.replace(`${name}`, `<a href="https://www.tiktok.com/@${name}/" target="_blank">${name}</a>`);
                                                            return <p key={index}
                                                                      dangerouslySetInnerHTML={{__html: replacedLine}}/>;
                                                        } else if (facebookMatch) {
                                                            const name = facebookMatch[1];
                                                            const replacedLine = line.replace(`${name}`, `<a href="https://www.facebook.com/${name}/" target="_blank">${name}</a>`);
                                                            return <p key={index}
                                                                      dangerouslySetInnerHTML={{__html: replacedLine}}/>;
                                                        } else if (agencyProfileMatch) {
                                                            const name = agencyProfileMatch[1];
                                                            const replacedLine = line.replace(`${name}`, `<a href="${name}" target="_blank">${name}</a>`);
                                                            return <p key={index}
                                                                      dangerouslySetInnerHTML={{__html: replacedLine}}/>;
                                                        } else if (radioPageMatch) {
                                                            const name = radioPageMatch[1];
                                                            const replacedLine = line.replace(`${name}`, `<a href="${name}" target="_blank">${name}</a>`);
                                                            return <p key={index}
                                                                      dangerouslySetInnerHTML={{__html: replacedLine}}/>;
                                                        } else {
                                                            return <p key={index}>{line}</p>;
                                                        }
                                                    }
                                                )
                                                }
                                            </div>
                                        ))}
                                    </>
                                )}

                            </div>
                        </div>


                        <div className={'right-part'}>
                            {person.voices.length > 0 && (
                                <div className={'person-section'}>
                                    <h4>Voice Acting Role</h4>
                                    <div className={'person-voice-container'}>
                                        {person.voices.map((singleAnime, index) => <PersonVoiceAnime
                                            singleAnime={singleAnime}
                                            key={index}/>)}
                                    </div>
                                </div>
                            )}

                            {person.anime.length > 0 && (
                                <div className={'person-section'}>
                                    <h4>Anime Staff Positions</h4>
                                    <div className={'person-staff-container'}>
                                        {person.anime.map((a, i) =>
                                            <div key={i} className={'person-staff-anime'}>
                                                <Link to={`/anime/${a.anime.mal_id}/${a.anime.title}`}>
                                                    <img src={a.anime.images.jpg.image_url} alt={a.anime.title}/>
                                                </Link>
                                                <div>
                                                        <span>
                                                        <Link
                                                            to={`/anime/${a.anime.mal_id}/${a.anime.title}`}>{a.anime.title}</Link>
                                                        </span>
                                                    <span>{a.position.slice(3)}</span>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <Footer
                    info={'Anime\'s voice actors, or seiyuu, bring characters to life while animators and writers contribute to the final product. Together, they create the beloved shows enjoyed worldwide.'}/>
                <ToTop/>
            </>
    );
};
