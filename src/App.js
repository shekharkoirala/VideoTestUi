import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react'
import ReactPlayer from 'react-player'
import ReactDOM from 'react-dom'
import ReactPaginate from 'react-paginate';
import CSVReader from 'react-csv-reader'
import data from "./data.json"
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { useNavigate, useLocation } from "react-router-dom";
import queryString from 'query-string'
import Box from "@mui/material/Box"
function VideoItem({ video }) {
  const [comment, setComment] = useState('')
  return <><div style={{ display: 'flex', flexDirection: 'column' }}>

    <h2>occurance Id: {video.occurrenceId}-----{video.mediaId}</h2>
    <Box display="flex" flexDirection="row" alignItems="center" gap={2}>
      <video width="30%" height="500" controls>
        <source src={video.source} />
      </video>

      <video width="30%" height="500" controls>
        <source src={video.originating_video_url} />
      </video>
      <div style={{ width: '30%' }}>
        <pre>{JSON.stringify(video, null, 2)}</pre>
      </div>

    </Box>

  </div>
    <input type="textarea" onChange={(e) => {
      setComment(e.target.value)
    }} />
    <div style={{ minHeight: '50px' }} />
  </>
}

const getPaginatedData = (currentPage = 1, dataLimit = 10) => {
  const startIndex = currentPage * dataLimit - dataLimit;
  const endIndex = startIndex + dataLimit;
  return data.slice(startIndex, endIndex);
};
function App() {
  
  const navigate = useNavigate()
  const location = useLocation()

  const { page } = queryString.parse(location.search)
  const currentPage = page || 1
  return (
    <div className="App" style={{ maxWidth: '100vw' }}>
      {/* <pre>{JSON.stringify(getPaginatedData(currentPage), null, 2)}</pre> */}

      {
        getPaginatedData(currentPage).map(video => <VideoItem video={video} />)
      }

      <Stack spacing={2}>
        <Box display="flex" justifyContent="center">
          <Pagination count={Math.ceil(data.length / 10)}
            defaultPage={page || 1}
            variant="outlined"
            onChange={
              (event, page) => {
                navigate(`/?page=${page}`)
              }
            }
            color="primary"
          />
        </Box>
      </Stack>
    </div>
  );
}

export default App;
