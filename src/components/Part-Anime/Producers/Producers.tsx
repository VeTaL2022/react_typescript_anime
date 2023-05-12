import {KeyboardArrowRight} from "@mui/icons-material";
import {FC, useEffect, useState} from "react";
import {Link} from "react-router-dom";

import {search_producer_items} from "../../../configs";
import {IProducer} from "../../../interfaces";
import {Loader} from "../../Loader";
import {Footer} from "../../Footer";
import {ToTop} from "../../ToTop";
import './Producers.scss';

export const Producers: FC = () => {
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        window.scrollTo(0, 0);
        setTimeout(() => {
            setLoading(false)
        }, 1500)
    }, []);

    const producersByLetter = search_producer_items
        .filter(a => a.count !== 0)
        .sort((a, b) => a.titles[0].title.localeCompare(b.titles[0].title))
        .reduce((acc: any, producer) => {
            let initial = producer.titles[0].title.charAt(0).toUpperCase();
            if (!acc[initial]) {
                acc[initial] = [];
            }
            if (!/[A-Z]/.test(initial)) {
                initial = '#';
            }
            acc[initial].push(producer);
            return acc;
        }, {'#': []});

    const scrollToElement = (id: string) => {
        const elementById: any = document.getElementById(id);
        const boundingClientRect = elementById.getBoundingClientRect();
        const topPosition = window.pageYOffset + boundingClientRect.top - 75;

        window.scroll({
            top: topPosition,
            behavior: 'smooth'
        });
    };
    const alphabet = Array.from({length: 26}, (_, i) => String.fromCharCode('A'.charCodeAt(0) + i));

    const ProducerList = ({items}: { items: IProducer[] }) => {
        const rows = [];

        for (let i = 0; i < items.length; i += 5) {
            const rowItems = items.slice(i, i + 5);

            rows.push(
                <tr key={i}>
                    {rowItems.map((producer: IProducer, index: number) => (
                        <td key={index}
                            style={{
                                borderBottom: i + 5 < items.length ? '1px solid rgba(195, 193, 193, 0.57)' : 'none',
                                padding: 0
                            }}>
                            <Link to={`/anime/producer/${producer.mal_id}/${producer.titles[0].title}`}>
                                <KeyboardArrowRight fontSize={"small"}/>
                                {producer.titles[0].title.length < 16 ? producer.titles[0].title : producer.titles[0].title.slice(0, 16) + '...'} ({producer.count})
                            </Link>
                        </td>
                    ))}
                </tr>
            );
        }

        return (
            <table style={{borderSpacing: 0, margin: 0, padding: 0}}>
                <tbody>
                {rows}
                </tbody>
            </table>
        );
    };

    return (
        loading ? <Loader height={100}/> :
            <>
                <div className={'producers'}>
                    <div className={'producer-navigation'}>
                        <span onClick={() => scrollToElement('letter-#')}>#</span>
                        {alphabet.map((letter: string, index: number) => <span key={index}
                                                                               onClick={() => scrollToElement(`letter-${letter}`)}>{letter}</span>)}
                    </div>

                    <div className={'producer-container'}>
                        {Object.entries(producersByLetter).map(([letter, producers]: IProducer[] | any[]) => (
                            <div key={letter} id={`letter-${letter}`}>
                                {/^[a-zA-Z#]$/.test(letter) && (
                                    <h2>{letter}</h2>
                                )}
                                <ProducerList items={producers}/>
                            </div>
                        ))}
                    </div>
                </div>
                <Footer
                    info={'Anime studios produce anime shows with their own unique style and strengths. Fans follow their favorite studios for new releases and collaborations.'}/>
                <ToTop/>
            </>
    );
};
