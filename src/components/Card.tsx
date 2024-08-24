import style from '../styles/card.module.css';

type props = {
    name:string
    index:number
}

function Card({name, index}:props) {
    return(
        <div className={style.card}>
            <p className={style.text}>
                {name}
            </p>
        </div>
    )
};

export default Card;