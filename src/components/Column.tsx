import Card from "./Card";

type props = {
    title:string
}

function Column({title}:props) {
    return(
        <div className="column">

            <h3>
                {title}
            </h3>
            
            <Card name="teste"/>

        </div>
    )
};

export default Column;