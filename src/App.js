import React, { useState, useEffect } from "react"
import "./App.css"

function App() {
  const [longUrl, setLongUrl] = useState("")
  const [urls, setUrls] = useState([])

  useEffect(() => {
    fetch("http://localhost:8080/")
      .then(res => res.json())
      .then(data => setUrls(data))
  }, [])

  console.log(urls)


  function handleSubmit(e) {
    e.preventDefault()
    fetch("http://localhost:8080/shorturl", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ url: longUrl })
    }).then(res => res.json())
      .then(data => {
        console.log(data)
        setUrls([...urls, data.shortUrl])
      })
  }

  function handleClick(index) {
    window.open("http://localhost:8080/" + urls[index].short_url)
  }


  return (
    <div className="container">
      <h1>URL Shortener</h1>
      <form onSubmit={e => handleSubmit(e)}>
        <input type="text" name="url" id="url" placeholder="Enter URL"
          className="urlInput"
          onChange={e => setLongUrl(e.target.value)} />
        <button type="submit"
          className="submitBtn"
        >Shorten</button>
      </form>
      <div>
        {urls.map((url, index) => (
          <div key={index} onClick={e => handleClick(index)}
            className="urlListItem">
            <a className="fullUrl">
              {url.original_url}</a>
            <a className="shortUrl">
              {url.short_url}</a>
          </div>
        ))}
      </div>
    </div>

  );
}



export default App;
