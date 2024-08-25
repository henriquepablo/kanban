import { Draggable } from 'react-beautiful-dnd';
import style from '../styles/card.module.css';

type props = {
    name:string
    index:number
    id:number
}

function Card({name, index, id}:props) {
    return(
        <Draggable draggableId={name} index={index} key={index}>

            {(provided) => (
                <div className={style.card} 
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                ref={provided.innerRef}
                >
                    <p className={style.text}>
                        {name}
                    </p>
                </div>
            )}

        </Draggable>
    )
};

export default Card;