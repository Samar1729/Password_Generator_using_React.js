import { useCallback, useState, useRef } from 'react'
import './App.css'

function App() {
  const [password, setPassword] = useState("")
  const [length, setLength] = useState(8)
  const [numberAllowed, setNumberAllowed] = useState(false)
  const [charAllowed, setCharAllowed] = useState(false)
  const [ishidden, setHidden] = useState(true)
  const [ishidden20, setHidden20] = useState(true)

  //useRef hook
  const passwordRef = useRef(null)

  const generatePassword = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if (numberAllowed) { str += "0123456789" }
    if (charAllowed) { str += "!@#$%^&*([)]{}}" }

    for (let i = 1; i < length; i++) {

      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)
    }

    setPassword(pass)
  }, [length, numberAllowed, charAllowed , setPassword])
  //The dependency array tells React: "Hey, only recreate this function if one of these specific variables changes."

  const passwordCopiedClass = () => {
    if (password.length > 20) {
      setHidden20(false)
      setHidden(true)
    } else{
      setHidden20(true)
      setHidden(false)
    }
  }

  const copyPasswordToClipboard = useCallback(() => {
    if (password.length > 20) {
      passwordRef.current?.select()
      passwordRef.current?.setSelectionRange(0, 20)
      window.navigator.clipboard.writeText(password.slice(0, 20))
    } else {
      passwordRef.current?.select()
      window.navigator.clipboard.writeText(password)
    }
  }, [password])

  return (
    <div className="w-full h-screen bg-gray-800 pt-8 flex flex-col ">
      <div className='flex justify-center'>
        <div className='w-full max-w-md shadow-gray-700 shadow-2xl rounded-lg px-4 py-3 text-orange-500 bg-gray-800 h-fit'>
          <h1 className='text-white text-center my-3 font-semibold '>Password Generator</h1>

          <div className='flex shadow rounded-lg overflow-hidden'>
            <input
              type="text"
              value={password}
              className='outline-none w-full py-1 px-3 bg-white text-shadow-taupe-600'
              placeholder='Password'
              readOnly
              ref={passwordRef}
            />
            <button onClick={(e) => { copyPasswordToClipboard(e), passwordCopiedClass(e) }} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 shrink-0'>
              copy
            </button>
          </div>
          <div className='flex my-5 gap-2'>
            <input
              type="range"
              name="" id=""
              value={length}
              min={6}
              max={100}
              className='cursor-pointer'
              onChange={(e) => setLength(e.target.value)} />
            <label htmlFor="length">Length : {length}</label>
            <div>
              <input
                type="checkbox"
                defaultChecked={numberAllowed}
                onChange={() => { setNumberAllowed((prev) => !prev) }}
                name="" id="" />
              <label htmlFor="checkbox">Number</label>
            </div>
            <div>
              <input
                type="checkbox"
                defaultChecked={charAllowed}
                onChange={() => { setCharAllowed((prev) => !prev) }}
                name="" id="" />
              <label htmlFor="charInput">Characters</label>
            </div>
          </div>
        </div>
      </div>

      <div className='w-full flex justify-center'>
        <button onClick={generatePassword} className='text-white bg-blue-600 font-semibold px-10 my-10 py-3 hover:bg-blue-800'>Generate Password</button>
      </div>

      <div className='w-full flex justify-center'>
        <h1 className={` ${ishidden ? 'hidden' : ''} text-white bg-red-500 font-semibold rounded-b-3xl rounded-tr-3xl px-10 my-10 py-3`}>Password Copied!!</h1>
        <h1 className={`${ishidden20 ? 'hidden' : ''} text-white bg-red-500 font-semibold rounded-b-3xl rounded-tr-3xl px-10 my-10 py-3`}>Password Copied till 20 characters</h1>
      </div>
    </div>
  )
}

export default App