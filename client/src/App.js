/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import "./App.css";
import { Howl } from 'howler';


function App() {

  const [data, setData] = React.useState(null);

  var soundsPlayed = []

  React.useEffect(() => {
    fetch("/all", {
      headers : { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
       }
    })
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);
  
  if (data != null) {

    const items = data.map((item) => {

      console.log("iterating over data")

      const soundSrc = `https://soundgiph.blob.core.windows.net/sounds/${item.sound}`

      console.log(`${item.sound}`)

      var sound = new Howl({
        src: [soundSrc]
      });

      var play = () => {
        // eslint-disable-next-line array-callback-return
        soundsPlayed.map(sound => {
          sound.stop()
        })
        soundsPlayed.pop()
        soundsPlayed.push(sound)
        sound.play()
      }

      var share = () => shareSound("Titre", "Text", soundSrc)

      var imageSrc = `https://soundgiph.blob.core.windows.net/images/${item.image}`
  
      return ( 
        <li>
            <img src={imageSrc} width ="100px" height ="100px" onClick={play}/>
            <button onClick={share}>Share</button>
        </li>
      )})
  
    return (
      <div className="App">
        <header className="App-header">
          <ul>{items}</ul>
        </header>
      </div>
    )
  }

  return (
    <div className="App">
      <header className="App-header">
        <p> Loading ...</p>
      </header>
    </div>
  )
}


function shareSound(title, text, soundSrc) {
        if (navigator.canShare) {
            navigator.share({
                    title: title.value,
                    text: text.value,
                    file: soundSrc,
                })
                .then(() => console.log('Successful share'))
                .catch((error) => console.log('Error sharing', error));
        } else {
            console.log("Web Share API is not supported in your browser.")
        }
}
export default App;
