import './App.css';
import Button from "@material-ui/core/Button";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Link from '@material-ui/core/Link';
import AlertBox from "./AlertBox";



export default function App() {

  const [url, setUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [top, setTop] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [onAlert, setOnAlert] = useState(false);
  const [shorting, setShorting] = useState(false);
  
  function handleChange(e){
     setUrl(e.target.value);
     setShortUrl('');
  }

  function handleOffAlert(){
    setOnAlert(false);
  }

  useEffect(() => {
    const getTop = async () => {
      console.log('getTop');

      try {
        const response = await axios.get('/api/shrink');
        const top = response.data.top;
        console.log(top);
        setTop(top);
      } catch (error) {
        console.log(error);
      }
    };

    getTop().catch(console.log);
  }, []);

  function short() {
    setShorting(true);
    const post = async () => {
      try {
        const result = await axios.post('/api/short',
          {url});
        console.log(result);
        console.log(result.data.top[0].original);

        if (result.data.success) {
          setUrl('');
          console.log('result.data', result.data);
          setShortUrl(result.data.shortened.short);
          setTop(result.data.top[0].original)
          
        } else {
          error(result.data)
        }

      } catch (e) {
        error(e);
      }
      setShorting(false);
  };

  function error(e){
    setErrorMessage(e);
    setOnAlert(true);
  }

  post();

  }
  return (
    <>
    <div className="App">
      <h1>Short your URL here </h1>
      <form className="add-form">
      <div className="form-control">
        <input
          type="text"
          placeholder="Enter URL here"
          value={url}
          onChange={handleChange}
        />
      </div>
    {shorting? console.log('nothing')
    :
    <Button variant="contained" onClick={short} style={{minWidth: 100}}>
     Short Link
    </Button>}
    </form>
    </div>

  <div className="App">
    Short url:&nbsp;
    <Link href={shortUrl} target="_blank" rel="noreferrer">
      {shortUrl}
    </Link>
  </div>
  <AlertBox open={onAlert} handleClose={handleOffAlert} error={errorMessage}/>
  
  <div className="App">
    <p>Heighst Entered URL so Far</p>
    <Link href={top} target="=blank" rel="noreferrer">
      {top}
    </Link>
  </div>
  </>
  );
  }


