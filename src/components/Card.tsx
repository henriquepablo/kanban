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
        <Draggable draggableId={assetid.toString()} index={index} key={index}>

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

                        <abbr title={`data de início: ${informations.dataexib}`}>
                            <Info size={19} color='gray' width={'100%'}/>
                        </abbr>
                    </div>

                    <hr className={style.hr}/>
                    
                    <p className={style.text} style={{fontSize: '15px'}}>
                        Data de entrega: 
                    </p>

                    <h4>
                        Responsável: 
                    </h4>

                    <hr className={style.hr}/>

                    <div className={style.divHorizontal}>
                        <p style={{textAlign: 'center', fontWeight: 'bold'}}>
                            AssetId
                            <p style={{fontWeight: 'normal'}}>
                            {assetid}
                            </p>
                        </p>
                       
                        <p style={{textAlign: 'center', fontWeight: 'bold'}}>
                            Código
                            <p style={{fontWeight: 'normal'}}>
                            {informations.codigo}
                            </p>
                        </p>
                       
                    </div>
                </div>
            )}

        </Draggable>
    )
};

export default Card;