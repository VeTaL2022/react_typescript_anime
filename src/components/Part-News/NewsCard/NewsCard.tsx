import {FC, ReactEventHandler} from "react";

import imageNotFound from "../../../assets/ImageNotFound.png";
import {IArticle} from "../../../interfaces";
import './NewsCard.scss';

export const NewsCard: FC<{ article: IArticle }> = ({article}) => {
    const webSiteURL = article.clean_url;
    const website = webSiteURL?.replace('http://', 'https://')?.split('https://')?.pop()?.split('/')[0];

    const publishedDate = new Date(article.published_date);
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

    return (
        <a href={article.link} target={'_blank'} className={'article-container'}>
            <div className={'article-image'}>
                <img
                    src={article.media || imageNotFound}
                    alt={article.title}
                    onError={handleImageError}
                />
            </div>
            <div className={'article-content'}>
                <div className={'article-source'}>
                    <img
                        src={`https://www.google.com/s2/favicons?domain=${website}`}
                        alt={article.rights}/>
                    <span>{article.rights}</span>
                </div>
                <div className={'article-title'}>
                    <h5>{article.title}</h5>
                </div>
                <span className={'article-description'}>{article.summary}</span>
                <div>
                    <small><b>Published At:</b> {formattedDateTime}</small>
                </div>
            </div>
        </a>
    );
};
