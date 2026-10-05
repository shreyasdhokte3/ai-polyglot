import React from "react"
import frFlag from '../assets/fr-flag.png'
import spFlag from '../assets/sp-flag.png'
import jpnFlag from '../assets/jpn-flag.png'
import './Content.css'

const languages = [
    { id: 'french', label: 'French', img: frFlag },
    { id: 'spanish', label: 'Spanish', img: spFlag },
    { id: 'japanese', label: 'Japanese', img: jpnFlag },
]

export default function Content(){
    
    const [userCurrentInput, setUserCurrentInput] = React.useState('')
    const [messages, setMessages] = React.useState([])
    const [language, setLanguage] = React.useState('french')
    
    const [isLoading, setIsLoading] = React.useState(false)
    const [error, setError] = React.useState("")

    async function handleClick(){
        const text = userCurrentInput.trim()
        if (!text) {
        return  // do nothing
        }
        setError("")
       
        setMessages((prev)=>[...prev,{id: crypto.randomUUID(), user: text, ai: null}])
        setUserCurrentInput("")
        setIsLoading(true)

        try{
            const response = await fetch("/api/translate",{
                method:"POST",
                headers:{
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    text:text,
                    language:language
                })
            })
            if (!response.ok) {
                const errData = await response.json().catch(() => ({}))
                const message = errData.error || `Request failed (${response.status})`
                throw new Error(message)
            }
            const data = await response.json()
            if (!data.translation) {
                throw new Error("No translation returned")
              }
            setMessages((prev)=>{
                const next = [...prev]
                const last = next[next.length-1]
                next[next.length-1] = {...last, ai:data.translation}
                return next
            })
           
        }catch(error){
            console.error(error)
            setError(error.message)
            setMessages((prev) => prev.slice(0, -1))
            
        }finally{
            setIsLoading(false)
        }
       
        
       
    }

    return (
        <section className="content content--relative">
            {error && <p className="error">{error}</p>}
            <p className="instruction">
                Select the language you want me to translate into, type your text and hit send!
            </p>

           {messages.map((msg)=>(
            <React.Fragment key={msg.id}>
                <div className="userText">{msg.user}</div>
                {msg.ai && <div className="aiText">{msg.ai}</div>}
            </React.Fragment>
           ))}
            <textarea
                className="user-input"
                placeholder="Please enter text"
                value={userCurrentInput}
                name="userInput"
                id="userInput"
                disabled={isLoading}
                onChange={(e) => { setUserCurrentInput(e.target.value) }}
            />
            <div className="languages">
                {languages.map((lang) => (
                    <label key={lang.id} className="language">
                        <input
                            type="radio"
                            name="language"
                            value={lang.id}
                            checked={language === lang.id}
                            onChange={() => setLanguage(lang.id)}
                        />
                        <img src={lang.img} alt="" />
                        <span>{lang.label}</span>
                    </label>
                ))}
            </div>
            <button disabled={isLoading} className="translate-btn" type="button" onClick={handleClick}>
                {isLoading ? "Translating" : "Translate"}
            </button>
            {isLoading && (
                <div className="loader-overlay" role="status" aria-live="polite">
                    <div className="loader-box">
                    <div className="loader-spinner" aria-hidden="true" />
                    <p className="loader-text">Translating…</p>
                    </div>
                </div>
                )}
        </section>
    )
}
