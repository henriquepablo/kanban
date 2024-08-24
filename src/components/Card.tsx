import style from '../styles/card.module.css';

type props = {
    name:string
}

function Card({name}:props) {
    return(
        <div className={style.card}>
            <p className={style.text}>
                {name}
            </p>
        </div>
    )
};

export default Card;