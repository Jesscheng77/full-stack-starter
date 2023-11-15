import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useStaticContext } from './StaticContext';

import Item from './Item';
function Home() {

  const [data, setData] = useState();

  useEffect(() => {
    fetch('/api/bobas')
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
        {data?.map((record) => <Item key={record.id} id={record.id} name={record.Restaurants} image={record.ImageUrl} />) }
        </div>
      </main>
    </>
  );
}

export default Home;