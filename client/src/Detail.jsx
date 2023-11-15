import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function Detail() {
    const { id } = useParams ();
    const [data, setData] = useState();
    useEffect(() => {
        fetch(`/api/bobas/${id}`)
        .then((response) => response.json())
        .then((data) => setData(data));
    }, [id]);
    console.log(data)
    return(
    <main className="container">
        <h1>{data?.Name}</h1>
        <div className="row">
      <div className="col-xl-6">
          <div className="card list border-0">
          <img src={data?.Image}/>
              
          
          
          </div>
        </div>
        <div className="col-xl-6 align-self-center">
          <div className="card list border-0">
          
          <div className="card-body">
            <h2 className="card-text">{data?.Address}</h2>
            <h2 className="card-text">{data?.Hours}</h2>
            <h2 className="card-text">{data?.Rating}</h2>
            <h2 className="card-text">{data?.Number}</h2>
            <h2 className="card-text">{data?.Feedback}</h2>
          </div>
          </div>
        </div>
        </div>
</main>)
}

export default Detail;