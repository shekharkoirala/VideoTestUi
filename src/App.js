import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react'
import ReactPlayer from 'react-player'
import ReactDOM from 'react-dom'
import ReactPaginate from 'react-paginate';
import CSVReader from 'react-csv-reader'
import data from "./data.json"






function Items({ currentItems }) {
  if (!Array.isArray(currentItems)) {
    return null
  }

  // return <pre>{JSON.stringify(currentItems)}</pre>
  return <>{currentItems.map((video) => <><div style={{ display: 'flex', flexDirection: 'column' }}>

    <h2>occurance Id: {video.occurrenceId}-----{video.mediaId}</h2>
    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
      <video width="30%" height="500" controls>
        <source src={video.source} />
      </video>
      <div style={{minWidth: '5%'}}/>
      <video width="30%" height="500" controls>
        <source src={video.originating_video_url} />
      </video>
      <div style={{width: '30%'}}>
      <pre>{JSON.stringify(video, null, 2)}</pre>
      </div>
    </div>
  </div>
    <div style={{ minHeight: '50px' }} />
  </>)}</>
}


function PaginatedItems({ itemsPerPage }) {
  // We start with an empty list of items.
  const [currentItems, setCurrentItems] = useState(null);
  const [pageCount, setPageCount] = useState(0);
  // Here we use item offsets; we could also use page offsets
  // following the API or data you're working with.
  const [itemOffset, setItemOffset] = useState(0);

  useEffect(() => {
    // Fetch items from another resources.
    const endOffset = itemOffset + itemsPerPage;
    console.log(`Loading items from ${itemOffset} to ${endOffset}`);
    setCurrentItems(data.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(data.length / itemsPerPage));
  }, [itemOffset, itemsPerPage]);

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % data.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
  };

  return (
    <>
      {/* <pre>{JSON.stringify(currentItems, null, 2)}</pre> */}
      <Items currentItems={currentItems} />
      <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel="< previous"
        renderOnZeroPageCount={null}
      />
    </>
  );
}
function App() {
  return (
    <div className="App">
      {/* <header className="App-header" >
        {
          data.map(({ source, originating_video_url }) => {
            return <><div style={{ display: 'flex', flexDirection: 'row' }}>
              <ReactPlayer url={source} /> <ReactPlayer url={originating_video_url} />
            </div>
              <div style={{ minHeight: '50px' }} /></>
          })
        }

      </header> */}
      <PaginatedItems itemsPerPage={4} />
    </div>
  );
}

export default App;
