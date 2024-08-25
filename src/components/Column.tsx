import Card from "./Card";
import style from '../styles/column.module.css';
import { Droppable } from "react-beautiful-dnd";

type props = {
    title:string
    cards:string[]
    id:string
}

function Column({title, cards, id}:props) {
    return(
        <Droppable droppableId={title} key={id}>
            {(provided) => (
                <div className={style.column} ref={provided.innerRef} 
                {...provided.droppableProps}
                >

                    <h3 className={style.heading}>
                        {title}
                    </h3>
                    

                    {
                        cards.map((name, index) => (
                            <Card name={name} index={index} key={index} id={index}/>
                        ))
                    }
    
                    {provided.placeholder}
                </div>
            )}
        </Droppable>
    )
};

export default Column;