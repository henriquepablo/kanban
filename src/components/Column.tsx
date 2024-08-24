import Card from "./Card";
import style from '../styles/column.module.css';

type props = {
    title:string
}

function Column({title}:props) {
    return(
        <div className={style.column}>

            <h3 className={style.heading}>
                {title}
            </h3>
            
            <Card name="teste"/>

        </div>
    )
};

export default Column;