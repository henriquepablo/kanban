type props = {
    name:string
}

function Card({name}:props) {
    return(
        <div className="card">
            <p>
                {name}
            </p>
        </div>
    )
};

export default Card;