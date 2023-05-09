import {
    Favorite,
    Lightbulb,
    NoteAlt,
    Palette,
    RateReview,
    SentimentDissatisfied,
    SentimentVerySatisfied,
    Star,
    StarBorder,
    StarHalf,
    ThumbUp
} from "@mui/icons-material";
import {Link, useParams} from "react-router-dom";
import {FC, useEffect} from "react";

import {animeActions, animeResourcesActions} from "../../../redux";
import {useAppDispatch, useAppSelector} from "../../../hooks";
import {formatDate} from "../AnimeReviews";
import {Loader} from "../../Loader";
import {Footer} from "../../Footer";
import './Review.scss';

export const Review: FC = () => {
    const {selectedAnime, selectedReview} = useParams();
    const {reviewData, animeData, loading} = useAppSelector((state) => ({
        reviewData: state.animeResourcesReducer.reviewData,
        animeData: state.animeReducer.singleData,
        loading: state.animeReducer.loading
    }));
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(animeActions.getFullById({id: selectedAnime || ''}));
        dispatch(animeResourcesActions.getReviewData({id: selectedAnime || ''}));
    }, [dispatch]);

    const review = reviewData.data?.find((review) => review.mal_id === Number(selectedReview));

    return (
        loading ? <Loader height={100}/> :
            <>
                <div className={'review'}>
                    <h4>Review</h4>
                    <div className={'anime-title'}>
                        <Link
                            to={`/anime/${selectedAnime}/${animeData.data?.title}`}>{animeData.data?.title}</Link>&nbsp;
                        <span>({review?.type?.charAt(0)?.toUpperCase() ?? ''}{review?.type?.slice(1) ?? ''})</span>
                    </div>

                    <div className={'review-container'}>
                        <div className={'left'}><Link to={review?.user.url || ''} target={'_blank'}><img
                            src={review?.user.images?.jpg.image_url} alt={review?.user.username}/></Link></div>

                        <div className={'right'}>
                            <div className={'user'}>
                                <Link to={review?.user.url || ''} target={'_blank'}>
                                    {review?.user.username}
                                </Link>
                                <span>{formatDate(review?.date || '')}</span>
                            </div>

                            <div className={'tags'}>
                                {review?.tags[0] === 'Recommended' ? (
                                    <span><Star/><i>{review?.tags[0]}&nbsp;</i></span>
                                ) : review?.tags[0] === 'Mixed Feelings' ? (
                                        <span><StarHalf/><i>{review?.tags[0]}</i></span>)
                                    : (<span><StarBorder/><i>{review?.tags[0]}</i></span>)}
                            </div>

                            <div className={'first-text-review'}>
                                <p>
                                    <Link to={`/anime/${selectedAnime}/${animeData.data?.title}`}>
                                        <img src={animeData.data?.images?.jpg.image_url} alt={animeData.data?.title}/>
                                    </Link>
                                    {review?.review.split('\n')[0]}
                                </p>
                            </div>

                            <div className={'text-review'}>
                                {review?.review.split('\n').slice(1).map((r, i) =>
                                    <p key={i}>{r}</p>)}
                            </div>

                            <div className={'review-rating'}>
                                <RateReview/>
                                <span>Reviewer's Rating: {review?.score}</span>
                            </div>

                            <div className={'reaction'}>
                                <span><i>Nice</i> <ThumbUp/> <b>{review?.reactions.nice}</b></span>
                                <span><i>Love It</i> <Favorite/> <b>{review?.reactions.love_it}</b></span>
                                <span><i>Funny</i> <SentimentVerySatisfied/> <b>{review?.reactions.funny}</b></span>
                                <span
                                    style={{minWidth: 130}}><i>Confusing</i> <SentimentDissatisfied/> <b>{review?.reactions.confusing}</b></span>
                                <span
                                    style={{minWidth: 125}}><i>Informative</i> <Lightbulb/> <b>{review?.reactions.informative}</b></span>
                                <span style={{
                                    minWidth: 135,
                                }}><i>Well Written</i> <NoteAlt/> <b>{review?.reactions.well_written}</b></span>
                                <span><i>Creative</i> <Palette/> <b>{review?.reactions.creative}</b></span>
                            </div>

                            <span className={'total-reaction'}>
                                Total Reactions: {review?.reactions?.overall}
                            </span>
                        </div>
                    </div>
                </div>
                <Footer
                    info={'An anime full review typically includes an analysis of the plot, characters, animation, soundtrack, and themes. It should be comprehensive, balanced, and informative, giving the reader a clear understanding of the anime\'s strengths and weaknesses.'}/>
            </>
    );
};
