import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useStaticContext } from './StaticContext';

import Item from './Item';
function Home() {

  const [data, setData] = useState();

  useEffect(() => {
    const token = 'patKqXPaSWJJgckAx.4cc2daa28db95ba77db5932c2528bb277aebea8b18426b3e1a23513cb521a1d9';
    const url = 'https://api.airtable.com/v0/appjNeZQnrvy9hYsq/Restaurants?view=Grid%20view'
    fetch(url, {
      
      headers: { Authorization: `Bearer ${token}`}

    })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      setData(data)});
    

  }, []);
  const staticContext = useStaticContext();
  return (
    <>
      <Helmet>
        <title>Home - {staticContext?.env?.VITE_SITE_TITLE ?? ''}</title>
      </Helmet>
      <main className="container">
        <h1>Home</h1>
        
        <div className="row" >
        {data?.records.map((record) => <Item key={record.id} id={record.id} fields={record.fields} />) }
        </div>
      </main>
    </>
  );
}

export default Home;