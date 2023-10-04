import { Link } from 'react-router-dom'


function Item({ id, fields }) {
    return (<div className="col-xl-4 d-flex justify-content-center">
        <div className="card cardImageText">
            <img src={fields.images[0].url}/>
            <div className="card-body">
             <Link to={`/detail/${id}`}><h2 className="card-title card-key">{fields.Name}</h2></Link>
            </div>
        </div>
    </div >
        // <div className ="card mb-3">
        //     {title} <Link to="/detail">Link</Link>
        //     </div>
    );


}


export default Item; 
