import {FC, useState} from "react";

import {IQuote} from "../../../interfaces";
import './Quote.scss';

export const Quote: FC<{ quote: IQuote }> = ({quote: quoteData}) => {
    const [isExpanded, setIsExpanded] = useState<boolean>(false);
    const handleClick = () => setIsExpanded(!isExpanded);

    return (
        <div className={'quote-container'}>
            {quoteData.quote.length > 155 ? (
                    <>
                        <cite>"{isExpanded ? quoteData.quote : (quoteData.quote.slice(0, 155) + "...")}"
                            <b onClick={handleClick}
                               className={'expanded'}>{isExpanded ? " Show Less" : " Show More"}</b>
                        </cite>
                        <div style={{textAlign: 'right'}}>
                                <span><i>- {quoteData.character}</i> <br/>
                                ({quoteData.anime})
                                </span>
                        </div>
                    </>
                ) :
                <>
                    <cite>"{quoteData.quote}"</cite>
                    <div style={{textAlign: 'right'}}>
                        <span><i>- {quoteData.character}</i></span>
                        ({quoteData.anime})
                    </div>
                </>}
        </div>
    );
};
