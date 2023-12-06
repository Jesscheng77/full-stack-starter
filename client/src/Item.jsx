import { Link } from 'react-router-dom'
import { useAuthContext } from './AuthContext';


function Item({ id, name, image }) {
    const { user } = useAuthContext();

    return (<div className="col-xl-4 d-flex justify-content-center">
        <div className="card cardImageText">
            <img src={image}/>
            <div className="card-body">
             <Link to={`/detail/${id}`}><h2 className="card-title card-key">{name}</h2></Link>
             {user && <Link to={`/bobas/${id}`}>Edit</Link>}
            </div>
        </div>
    </div >
        // <div className ="card mb-3">
        //     {title} <Link to="/detail">Link</Link>
        //     </div>
    );


}


export default Item; 
