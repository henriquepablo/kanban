import { Draggable } from 'react-beautiful-dnd';
import style from '../styles/card.module.css';
import { Info } from 'lucide-react';

type props = {
    name:string
    index:number
    assetid:number
    informations: object
}

function Card({name, index, assetid, informations}:props) {
    return(
        <Draggable draggableId={assetid.toString()} index={index} key={assetid}>

            {(provided) => (
                <div className={style.card} 
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                ref={provided.innerRef}
                >
                    <div className={style.divHorizontal}>
                        <p className={style.text}>
                            {name}
                        </p>

                        <abbr title={`data de início: ${informations.dataInicio[2] + '/' + informations.dataInicio[1] + '/' + informations.dataInicio[0]}`}>
                            <Info size={19} color='gray' width={'100%'}/>
                        </abbr>
                    </div>

                    <hr className={style.hr}/>
                    
                    <p className={style.text} style={{fontSize: '15px'}}>
                        {informations.dataEntrega[2] + '/' + informations.dataEntrega[1] + '/' + informations.dataEntrega[0]} 
                    </p>

                    <h4>
                        {informations.responsavel} 
                    </h4>

                    <hr className={style.hr}/>

                    <div className={style.divHorizontal}>
                        <p style={{textAlign: 'center', fontWeight: 'bold'}}>
                            {assetid}
                        </p>
                       
                        <p style={{textAlign: 'center', fontWeight: 'bold'}}>
                            {informations.codigo}
                        </p>
                       
                    </div>
                </div>
            )}

        </Draggable>
    )
};

export default Card;