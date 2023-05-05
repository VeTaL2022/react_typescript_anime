import {FC} from "react";

interface Props {
    setClickedImage: (image: string) => void;
    image: string;
}

export const Image: FC<Props> = ({image, setClickedImage}) => {

    const handleClick = () => setClickedImage(image);

    return (
        <img src={image} alt="image" onClick={handleClick}/>
    );
};
