import React from "react"
export default function Main(){
    const [meme,setMeme]=React.useState({
        topText:"",
        bottomText:"",
        randomImage:"http://i.imgflip.com/1bij.jpg"
    })
    const [allMemes, setAllMemes] = React.useState([])
    
    React.useEffect(() => {
        fetch("https://api.imgflip.com/get_memes")
            .then(res => res.json())
            .then(data => setAllMemes(data.data.memes))
    }, [])
    
    function getMemeImage() {
        const randomNumber = Math.floor(Math.random() * allMemes.length)
        const url = allMemes[randomNumber].url
        setMeme(prevMeme => ({
            ...prevMeme,
            randomImage: url
        }))
        }
        function handleChange(event) {
            const {name, value} = event.target
            setMeme(prevMeme => ({
                ...prevMeme,
                [name]: value
            }))
        } 
    return(
        <main className="main">
            <div className="form">
                <input 
                className="form-input"
                 type="text" 
                 placeholder="top text"
                 onChange={handleChange}
                 value={meme.topText}
                 name="topText"
                 />
                <input
                 className="form-input"
                 type="text"
                 placeholder="Bottom text"
                 onChange={handleChange}
                 value={meme.bottomText}
                 name="bottomText"
                   />
                <button className="form-btn" onClick={getMemeImage}>Get a new meme image 🖼</button>
            </div>
            <div className="meme">
            <img src={meme.randomImage} alt="test" className="meme-image"/>
            <h2 className="meme-text top" >{meme.topText}</h2>
            <h2 className="meme-text bottom" >{meme.bottomText}</h2>
            </div>
        </main>
    )
}