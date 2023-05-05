import {Link} from "react-router-dom";
import {FC, useEffect} from "react";

import {useAppDispatch, useAppSelector} from "../../../hooks";
import {formatDate} from "../../Part-Anime/AnimeReviews";
import {homeResourcesActions} from "../../../redux";
import './HomeReviews.scss';

export const HomeReviews: FC = () => {
    const {reviewData} = useAppSelector(({homeResourcesReducer}) => homeResourcesReducer);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(homeResourcesActions.getReviewData());
    }, [dispatch]);

    return (
        <>
            {reviewData.data?.length > 0 &&
                <div className={'home-reviews'}>
                    <div className={'home-reviews-header'}>
                        <h4>Latest Anime Reviews</h4>
                        <span><Link to={'/anime/reviews'}>View More</Link></span>
                    </div>
                    {reviewData.data?.slice(0, 5).map((review, index) =>
                        <div key={index} className={'home-review-child'}>
                            <Link to={`/anime/${review.entry.mal_id}/${review.entry.title}`}>
                                <img src={review.entry.images.jpg.image_url} alt={review.entry.title}/>
                            </Link>
                            <div style={{width: '100%'}}>
                                <div style={{display: 'flex', justifyContent: 'space-between'}} className={'cls'}>
                                <span><Link
                                    to={`/anime/${review.entry.mal_id}/${review.entry.title}`}>{review.entry.title}</Link></span>
                                    <span style={{color: 'dimgray'}}>Rating: {review.score}</span>
                                </div>
                                <div style={{display: 'flex', flexDirection: 'column', marginTop: 5}}>
                            <span>
                              {review.review.length < 450
                                  ? review.review : review.review.slice(0, 450) + '...'}
                                {review.review.length >= 450 &&
                                    <span><Link to={'/anime/reviews'}>View More</Link></span>
                                }
                            </span>
                                    <span style={{marginTop: 5}}><i
                                        style={{
                                            fontStyle: 'normal',
                                            color: 'dimgray'
                                        }}>{formatDate(review.date)}</i> by <Link
                                        to={review.user.url}
                                        target={'_blank'}
                                        style={{fontSize: 13}}>{review.user.username}</Link></span>
                                </div>
                            </div>
                        </div>)}
                </div>
            }
        </>
    );
};
