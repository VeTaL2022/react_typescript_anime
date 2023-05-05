import {
    CallMade, ExpandCircleDown,
    ExpandLess,
    ExpandMore,
    Favorite,
    NoteAlt,
    Star,
    StarBorder,
    StarHalf,
    ThumbUp
} from "@mui/icons-material";
import {Link} from "react-router-dom";
import {FC, useState} from "react";

import {IAnimeReviewResponse} from "../../../interfaces";
import './AnimeReviews.scss';

export const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
    });
};

interface IProps {
    reviewData: IAnimeReviewResponse,
    animeId: string,
}

export const AnimeReviews: FC<IProps> = ({reviewData, animeId}) => {
    const [expand, setExpand] = useState<boolean[]>(Array(reviewData?.data.length).fill(false));
    const [reviewsSize, setReviewSize] = useState<number>(5);

    const toggleExpand = (index: number) => {
        setExpand(prevStates => {
            const newStates = [...prevStates];
            newStates[index] = !newStates[index];
            return newStates;
        });
    };

    return (
        <div className={'anime-review'}>
            {reviewData?.data.slice(0, reviewsSize).map((review, index) =>
                <div key={index} className={'anime-review-container'}>
                    <div className={'review-body'}>
                        <Link to={review.user?.url} target={'_blank'}>
                            <img src={review.user?.images.jpg.image_url} alt={review.user?.username}/>
                        </Link>

                        <div>
                            <div className={'review-user'}>
                                <Link to={review.user?.url} target={'_blank'}>
                                    {review.user?.username}
                                </Link>
                                <span>{formatDate(review.date)}</span>
                            </div>

                            <div className={'review-tags'}>
                                {review.tags[0] === 'Recommended' ? (
                                    <span><Star/><i>{review.tags[0]}</i></span>
                                ) : review.tags[0] === 'Mixed Feelings' ? (
                                        <span><StarHalf/><i>{review.tags[0]}</i></span>)
                                    : (<span><StarBorder/><i>{review.tags[0]}</i></span>)}
                            </div>

                            <div className={'review-text'}>
                                {review.review && (
                                    <>
                                        {review.review.length > 500 && !expand[index] ? (
                                            <span>
                                                {review.review.slice(0, 500).split("\n").map((r, i, arr) => (
                                                    <p key={i}>
                                                        {r}
                                                        {i === arr.length - 1 ? "..." : null}
                                                    </p>
                                                ))}
                                            </span>
                                        ) : (
                                            <div>
                                              <span>
                                                {review.review.split("\n").map((r, i) => (
                                                    <p key={i}>
                                                        {r}
                                                    </p>
                                                ))}
                                              </span>
                                            </div>
                                        )}
                                    </>
                                )}
                            </div>


                        </div>
                    </div>

                    <div className={'review-foot'}>
                        <span>
                            <ThumbUp fontSize={'inherit'}/><Favorite fontSize={'inherit'}/><NoteAlt
                            fontSize={'inherit'}/>&nbsp;{review.reactions?.overall}
                        </span>
                        <div className={'read-more'}>
                            {!expand[index] && review.review.length > 500 &&
                                <span onClick={() => toggleExpand(index)}><ExpandMore
                                    fontSize={'medium'}/>Read More</span>}
                            {expand[index] && <span onClick={() => toggleExpand(index)}><ExpandLess/>Read Less</span>}
                        </div>
                        <span className={'op'}><Link
                            to={`/anime/${animeId}/review/${review.mal_id}`}><CallMade/><i>Open</i></Link></span>
                    </div>
                </div>)}

            {reviewsSize <= reviewData.data.length - 5 && (
                <div className={'review-more'}>
                    <span onClick={() => setReviewSize(reviewsSize + 5)}><i>Show More</i>&nbsp;
                        <ExpandCircleDown/></span>
                </div>
            )}
        </div>
    );
};
