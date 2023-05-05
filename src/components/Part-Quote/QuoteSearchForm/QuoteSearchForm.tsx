import {IconButton, InputBase, Menu, MenuItem, Paper} from "@mui/material";
import {Close, MenuOpen, Search} from "@mui/icons-material";
import {useNavigate} from "react-router-dom";
import React, {FC, useState} from "react";
import {useForm} from "react-hook-form";

import {useAppDispatch, useAppSelector} from "../../../hooks";
import {quoteActions} from "../../../redux";
import './QouteSearchForm.scss';

interface SearchFormData {
    search: string;
}

interface IProps {
    setValue: (value: string) => void;
    toggle: string;
    setToggle: (value: string) => void;
    setCurrentPage: (value: number) => void;
}

export const QuoteSearchForm: FC<IProps> = ({setValue, toggle, setToggle, setCurrentPage}) => {
    const {register, handleSubmit, reset} = useForm<SearchFormData>();
    const [formMenu, setFormMenu] = useState<null | HTMLElement>(null);
    const navigate = useNavigate();

    const {formTyping: typing, formInput: input} = useAppSelector(({quoteReducer}) => quoteReducer);
    const dispatch = useAppDispatch();

    const open = Boolean(formMenu);
    const submit = (data: SearchFormData) => setValue(data.search);

    const handleTyping = (t: string) => {
        dispatch(quoteActions.setFormTyping(t));
    }
    const handleInput = (i: boolean) => {
        dispatch(quoteActions.setFormInput(i));
    }
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setFormMenu(event.currentTarget);
    };
    const handleClose = () => {
        setFormMenu(null);
    };

    return (
        <Paper className={'quotes-paper'}>
            <form onSubmit={handleSubmit(submit)}>

                {typing.length === 0 ? (
                    <IconButton onClick={handleClick} aria-controls={open ? 'basic-menu' : undefined}
                                aria-haspopup={"true"} aria-expanded={open ? 'true' : undefined}>
                        <MenuOpen/>
                    </IconButton>
                ) : <IconButton onClick={() => {
                    handleTyping('');
                    reset();
                    dispatch(quoteActions.setError({error: ''}))
                }}><Close/></IconButton>}

                <Menu open={open} anchorEl={formMenu} onClose={handleClose}>
                    <MenuItem onClick={() => {
                        setToggle('Default');
                        handleInput(false);
                        setValue('');
                        handleClose();
                        setCurrentPage(0);
                        navigate('');
                    }
                    }>Default</MenuItem>
                    <MenuItem onClick={() => {
                        setToggle('Title');
                        handleInput(true);
                        handleClose();
                        setCurrentPage(0);
                    }
                    }>Title</MenuItem>
                    <MenuItem onClick={() => {
                        setToggle('Character');
                        handleInput(true);
                        handleClose();
                        setCurrentPage(0);
                    }}>Character</MenuItem>
                </Menu>

                <InputBase
                    disabled={!input}
                    className={'paper-input'}
                    placeholder={`${toggle}`}
                    {...register('search')}
                    onKeyUp={(event) => handleTyping((event.target as HTMLInputElement).value)}
                />
                <IconButton type={'submit'}>
                    <Search/>
                </IconButton>
            </form>
        </Paper>
    );
};
