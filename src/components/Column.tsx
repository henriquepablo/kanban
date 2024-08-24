import Card from "./Card";
import style from '../styles/column.module.css';

type props = {
    title:string
    cards:[]
}

function Column({title, cards}:props) {
    return(
        <div className={style.column}>

            <h3 className={style.heading}>
                {title}
            </h3>
            

            {
                cards.map((name, index) => (
                    <Card name={name} index={index}/>
                ))
            }

            

        </div>
    )
};

export default Column;