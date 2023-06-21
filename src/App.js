import React, { useState, useEffect } from "react"
import "./App.css"
import copy from "copy-to-clipboard"

function App() {
  const [longUrl, setLongUrl] = useState("")
  const [urls, setUrls] = useState([])
  const [popupOpen, PopupOpen] = useState(false)

  useEffect(() => {
    fetch("http://localhost:8080/")
      .then(res => res.json())
      .then(data => setUrls(data))
  }, [])


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
        copy("http://localhost:8080/" + data.shortUrl.short_url)
        alert("Copied short link to clipboard")
      })
  }

  function handleClick(index) {
    window.open("http://localhost:8080/" + urls[index].short_url, "_blank")
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
          <a key={index} onClick={e => handleClick(index)}
            className="urlListItem"
            href={"http://localhost:8080/" + url.short_url}
            target="_blank"
          >
            <p className="fullUrl">
              {url.original_url}</p>
            <p className="shortUrl">
              {url.short_url}</p>
          </a>
        ))}
      </div>

    </div>

  );
}



export default App;
