import {FormControlLabel, FormGroup} from "@mui/material";
import useLocalStorage from "use-local-storage";
import {Route, Routes} from "react-router-dom";
import {FC} from "react";

import {DisclaimerPage, RoutingPage} from "./pages";
import lightTheme from './assets/lightTheme.mp4';
import darkTheme from './assets/darkTheme.mp4';
import {MaterialUISwitch} from "./configs";
import './App.scss';

export const App: FC = () => {
    const defaultTheme = window.matchMedia('(prefers-theme-scheme: light)').matches;
    const [theme, setTheme] = useLocalStorage('theme', defaultTheme ? 'dark' : 'light');
    const switchTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
    };

    return (
        <div className={`app ${theme}`}>
            <video
                src={theme === 'light' ? lightTheme : darkTheme}
                controls={false}
                playsInline={false}
                autoPlay
                loop
                muted
                style={{opacity: 0.99}}
            />

            <Routes>
                <Route path={'/'} element={<DisclaimerPage/>}/>
                <Route path={'/*'} element={<RoutingPage/>}/>
            </Routes>

            <FormGroup>
                <FormControlLabel
                    label={''}
                    onClick={switchTheme}
                    control={
                        <MaterialUISwitch
                            sx={{m: 2, position: 'fixed', right: -5, top: 2, text: 'hide', zIndex: 5}}
                            checked={theme === 'dark'}
                        />
                    }
                />
            </FormGroup>
        </div>
    );
};
