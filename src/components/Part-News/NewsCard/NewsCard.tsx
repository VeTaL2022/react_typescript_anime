import {FC, ReactEventHandler} from "react";

import imageNotFound from "../../../assets/ImageNotFound.png";
import {INews} from "../../../interfaces";
import './NewsCard.scss';

export const NewsCard: FC<{ article?: INews }> = ({article}) => {
    const webSiteURL = article?.url;
    const website = webSiteURL?.replace('http://', 'https://')?.split('https://')?.pop()?.split('/')[0];

    const publishedDate = new Date(article?.datePublished || '');
    const formattedDateTime = publishedDate.toLocaleString('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: 'numeric',
        minute: 'numeric'
    }).split('/').join('.');
    const handleImageError: ReactEventHandler<HTMLImageElement> = (event) => {
        (event.target as HTMLImageElement).onerror = null;
        (event.target as HTMLImageElement).src = imageNotFound;
    };
    const addMaxWidthToImageUrl = (url: string) => {
        if (!url) return url;
        const separator = url.includes("?") ? "&" : "?";
        return url + separator + "w=max";
    };

    return (
        <a href={article?.url} target={'_blank'} className={'article-container'}>
            <div className={'article-image'}>
                <img
                    src={addMaxWidthToImageUrl(article?.image?.thumbnail.contentUrl || '') || imageNotFound}
                    alt={article?.name}
                    onError={handleImageError}
                />
            </div>
            <div className={'article-content'}>
                <div className={'article-source'}>
                    <img
                        src={`https://www.google.com/s2/favicons?domain=${website}`}
                        alt={article?.provider[0]?.name}/>
                    <span>{article?.provider[0]?.name}</span>
                </div>
                <div className={'article-title'}>
                    <h5>{article?.name}</h5>
                </div>
                <span className={'article-description'}>{article?.description}</span>
                <div>
                    <small><b>Published At:</b> {formattedDateTime}</small>
                </div>
            </div>
        </a>
    );
};
