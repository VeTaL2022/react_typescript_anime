import {ExpandLess, ExpandMore, Favorite, NoteAlt, Star, StarBorder, StarHalf, ThumbUp} from "@mui/icons-material";
import {Link} from "react-router-dom";
import {FC, useEffect} from "react";

import {useAppDispatch, useAppSelector} from "../../../hooks";
import {homeResourcesActions} from "../../../redux";
import {formatDate} from "../AnimeReviews";
import {Loader} from "../../Loader";
import {Footer} from "../../Footer";
import {ToTop} from "../../ToTop";
import './RecentReviews.scss';

export const RecentReviews: FC = () => {
    const {reviewData, reviewExpand, loading} = useAppSelector(({homeResourcesReducer}) => homeResourcesReducer);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(homeResourcesActions.getReviewData());
    }, [dispatch]);

    const handleToggleExpand = (index: number) => {
        dispatch(homeResourcesActions.toggleExpand(index));
    }
    return (
        loading ? <Loader height={100}/> :
            <>
                <div className={'recent-reviews'}>
                    <h4>Anime Reviews</h4>
                    {reviewData.data?.length > 0 ? (
                        <>
                            {reviewData.data?.map((review, index) =>
                                <div key={index} className={'review-child'}>
                                    <div className={'review-anime-title'}>
                                        <Link
                                            to={`/anime/${review.entry.mal_id}/${review.entry.title}`}>{review.entry.title}</Link>&nbsp;
                                        <span>({review?.type?.charAt(0)?.toUpperCase() ?? ''}{review?.type?.slice(1) ?? ''})</span>
                                    </div>

                                    <div className={'review-anime-container'}>
                                        <div className={'review-left'}>
                                            <Link to={review?.user.url} target={'_blank'}>
                                                <img src={review?.user.images.jpg.image_url}
                                                     alt={review?.user.username}/>
                                            </Link>
                                        </div>

                                        <div className={'review-right'}>
                                            <div className={'review-user'}>
                                                <Link to={review?.user.url} target={'_blank'}>
                                                    {review?.user.username}
                                                </Link>
                                                <span>{formatDate(review?.date || '')}</span>
                                            </div>

                                            <div className={'review-tags'}>
                                                {review?.tags[0] === 'Recommended' ? (
                                                    <span><Star/><i>{review?.tags[0]}&nbsp;</i></span>
                                                ) : review?.tags[0] === 'Mixed Feelings' ? (
                                                        <span><StarHalf/><i>{review?.tags[0]}</i></span>)
                                                    : (<span><StarBorder/><i>{review?.tags[0]}</i></span>)}
                                            </div>


                                            {review.review?.length > 550 && !reviewExpand[index] ? (
                                                <span>
                                        {review.review?.slice(0, 550).split('\n').map((r, i, arr) => (
                                            <p key={i}>
                                                {i === 0 && (
                                                    <Link
                                                        to={`/anime/${review.entry.mal_id}/${review.entry.title}`}>
                                                        <img
                                                            src={review.entry.images?.jpg.image_url}
                                                            alt={review.entry.title}
                                                            style={{
                                                                float: 'right',
                                                                margin: '-5px 0 0 10px'
                                                            }}
                                                        />
                                                    </Link>
                                                )}
                                                {r} {i === arr.length - 1 ? "..." : null}
                                            </p>
                                        ))}
                                        </span>
                                            ) : (
                                                <div>
                                        <span>
                                            {review.review?.split('\n').map((r, i) => (
                                                <p key={i}>
                                                    {i === 0 && (
                                                        <Link
                                                            to={`/anime/${review.entry.mal_id}/${review.entry.title}`}>
                                                            <img
                                                                src={review.entry.images?.jpg.image_url}
                                                                alt={review.entry.title}
                                                                style={{
                                                                    float: 'right',
                                                                    marginTop: '-5px',
                                                                    marginLeft: '10px'
                                                                }}
                                                            />
                                                        </Link>
                                                    )}
                                                    {r}
                                                </p>
                                            ))}
                                        </span>
                                                </div>
                                            )}

                                        </div>

                                    </div>
                                    <div className={'review-footer'}>
                                        {review.reactions?.overall > 0 && (
                                            <span>
                                    <ThumbUp fontSize={'inherit'}/><Favorite fontSize={'inherit'}/><NoteAlt
                                                fontSize={'inherit'}/>&nbsp;{review.reactions?.overall}
                                    </span>
                                        )}
                                        {review.review?.length > 550 && (
                                            <div>
                                                {!reviewExpand[index] &&
                                                    <span onClick={() => handleToggleExpand(index)}><ExpandMore
                                                        fontSize={'medium'}/>Read More</span>}
                                                {reviewExpand[index] &&
                                                    <span
                                                        onClick={() => handleToggleExpand(index)}><ExpandLess/>Read Less</span>}
                                            </div>
                                        )}
                                    </div>
                                </div>)}
                        </>
                    ) : <div style={{
                        height: '50vh',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center'
                    }}>
                        <p>Status code - {reviewData.status}</p>
                        <p>{reviewData.message}</p>
                        <p>
                            <Link to={reviewData?.report_url} target={'_blank'}>Report here</Link>
                        </p>
                    </div>}
                </div>
                <Footer
                    info={'Anime reviews evaluate and critique anime series, providing insight into their strengths and weaknesses to help viewers make informed decisions.'}/>
                <ToTop/>
            </>
    );
};
