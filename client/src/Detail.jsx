import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function Detail() {
    const { id } = useParams ();
    const [data, setData] = useState();
    useEffect(() => {
        const token = 'patKqXPaSWJJgckAx.4cc2daa28db95ba77db5932c2528bb277aebea8b18426b3e1a23513cb521a1d9';
        const url = `https://api.airtable.com/v0/appjNeZQnrvy9hYsq/Restaurants/${id}`;
        fetch(url, {
            headers: { Authorization: `Bearer ${token}`}

        })
        .then((response) => response.json())
        .then((data) => setData(data));
    }, [id]);
    console.log(data)
    return(
    <main className="container">
        <h1>{data?.fields.Name}</h1>
        <div className="row">
      <div className="col-xl-6">
          <div className="card list border-0">
          <img src={data?.fields.images[0].url}/>
              
          
          
          </div>
        </div>
        <div className="col-xl-6 align-self-center">
          <div className="card list border-0">
          
          <div className="card-body">
            <h2 className="card-text">{data?.fields.Address}</h2>
            <h2 className="card-text">{data?.fields.Hours}</h2>
            <h2 className="card-text">{data?.fields.Rating}</h2>
            <h2 className="card-text">{data?.fields.Number}</h2>
            <h2 className="card-text">{data?.fields.Feedback}</h2>
          </div>
          </div>
        </div>
        </div>
</main>)
}

export default Detail;