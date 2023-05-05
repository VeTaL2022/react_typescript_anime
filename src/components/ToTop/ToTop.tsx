import {KeyboardDoubleArrowUp} from "@mui/icons-material";
import {FC, useEffect, useState} from "react";

import './ToTop.scss';

export const ToTop: FC = () => {
    const [showScrollButton, setShowScrollButton] = useState<boolean>(false);

    const handleScroll = () => {
        if (window.pageYOffset > 600) {
            setShowScrollButton(true);
        } else {
            setShowScrollButton(false);
        }
    };
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    }

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <>
            {showScrollButton &&
                <KeyboardDoubleArrowUp onClick={scrollToTop} className={'scroll-up'}/>}
        </>
    );
};
