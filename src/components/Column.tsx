//@ts-nocheck
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
        <Droppable droppableId={id.toString()} key={id}>
            {(provided) => (
                <div className={style.column} ref={provided.innerRef} 
                {...provided.droppableProps}
                >

                    <h3 className={style.heading}>
                        {title}
                    </h3>
                    

                    {
                        cards.map((item, index) => (
                            <Card name={item.title} index={index} key={index} assetid={item.assetid} informations={item}/>
                        ))
                    }
    
                    {provided.placeholder}
                </div>
            )}
        </Droppable>
    )
};

export default Column;