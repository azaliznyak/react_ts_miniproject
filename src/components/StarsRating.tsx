import {FC, PropsWithChildren} from "react";
import StarRatings from "react-star-ratings";


interface IProps extends PropsWithChildren {
    vote_average: number
}

const StarsRating: FC<IProps> = ({vote_average}) => {
    return (
        <div>
            <StarRatings
                rating={vote_average}
                starRatedColor={'yellow'}
                starDimension={'15px'}
                starSpacing={'2px'}
                numberOfStars={10}
            />

        </div>
    );
};

export {StarsRating};