//@ts-nocheck
import { Draggable } from 'react-beautiful-dnd';
import style from '../styles/card.module.css';
import { Info } from 'lucide-react';
import { useRef } from 'react';

type props = {
    name:string
    index:number
    assetid:number
    informations: object
}

let assetSelected;

function Card({name, index, assetid, informations}:props) {
    
    const handleRightClick = (e: React.MouseEvent) => {
        e.preventDefault();

        const menuCustom = document.getElementById('menu');
        menuCustom.style.display = 'block';
        menuCustom.style.left = `${e.pageX}px`;
        menuCustom.style.top = `${e.pageY}px`;

        document.addEventListener('click', hideCustomMenu);

        assetSelected = assetid; 
    };
    
    function hideCustomMenu() {
        const menu = document.getElementById('menu');
        menu.style.display = 'none';
    }

    function chooseOperation(title: string) {
        const url = new URLSearchParams(window.location.search);
        const baseUrl = '*';
        let message;
        switch (title) {
            case "Ficha":
                message = `openAssetCard:${assetSelected}`;
                window.parent.postMessage(message, baseUrl);
                break;
            case "Historico":
                message = `history:${assetSelected}:${url.get("metaviewId")}`;
                window.parent.postMessage(message, baseUrl);
                break;
            case "Favorito":
                message = `favorite:[${assetSelected}]`;
                window.parent.postMessage(message, '*');
                break;
            default:
                break;
        }
    }


    function teste() {
        var mensagem = `openAssetCard:${assetSelected}`;
        window.parent.postMessage(mensagem, 'http://pmi.mediaportal.com.br:8084')
    }

    return(
        <Draggable draggableId={assetid.toString()} index={index} key={assetid}>

            {(provided) => (
                <div className={style.card} 
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                ref={provided.innerRef}
                onContextMenu={handleRightClick}
                >
                    <div className={style.divHorizontal}>
                        <p className={style.text}>
                            {name}
                        </p>

                        <abbr title={`data de início: ${informations.dataInicio}`}>
                            <Info size={19} color='gray' width={'100%'}/>
                        </abbr>
                    </div>

                    <hr className={style.hr}/>
                    
                    <p className={style.text} style={{fontSize: '15px'}}>
                        {informations.deliveryDate}
                    </p>

                    <h4>
                        {informations.operador} 
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

                    <div className={style.menu} id='menu'>
                        <ul>
                            <button onClick={() => chooseOperation('Ficha')}>
                                <li>Ficha</li>
                            </button>
                            <button onClick={() => chooseOperation('Historico')}>
                                <li>Histórico</li>
                            </button>
                            <button onClick={() => chooseOperation('Favorito')}>
                                <li>Favoritar</li>
                            </button>
                        </ul>
                    </div>
                </div>
            )}

        </Draggable>
    )
};

export default Card;