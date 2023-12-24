import { useEffect, useRef, useState } from 'react';
import './App.css';
import { useCallback } from 'react';

function App() {
  
  const [text , setText] = useState('copy')

  const [length , setlength] = useState('8') ;
  
  const [number ,setnumber] = useState(false);

  const [character, setcharacter] = useState (false) ;
   
  const [password , setpassword] = useState ('') ;

  // use ref hooks

  const passwordref = useRef (null)
   
  const passwordGenrator = useCallback(() =>{
      let pass = ''
      let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

      if(number) str += '0123456789';
      if(character) str += '!@£$%^&*-_+{}[]`¬';

      for(let i=1 ; i<=length ; i++){
        let char = Math.floor(Math.random() * str.length +1)

        pass += str.charAt(char)
      }
      setpassword(pass)
      
  } , [length , number , character,setpassword])
   
  const copyclipboard = useCallback(()=>{
    passwordref.current?.select()
    window.navigator.clipboard.writeText(password);
    
    setTimeout(() => {
      passwordref.current?.select()
      setText('copied')
    }, 100);

  }, [password,setText]) 

   useEffect(()=>{
    passwordGenrator()
   },[length,number,character,passwordGenrator])
   
  return (
    <div className='h-screen w-screen bg-black pt-10'>
      <div className="App bg-gray-800 text-center rounded-xl w-[600px] m-auto text-white">
        <h1 className=' text-4xl m-0 py-5'>
          Password genrater
        </h1>
        <div className='flex justify-center my-3'>
            <input 
             type='text'
             placeholder='password'
             value={password}
             readOnly
             ref={passwordref}
             className='rounded-s-md px-3 w-[450px] text-black outline-none'/>
            <button 
            title='Click to Copy'
              onClick={copyclipboard}
            className='flex justify-center py-2 px-4 bg-blue-500 rounded-e-md'
            >{text}</button>
        </div>
        <div className='py-5 ps-10 flex justify-start'>
            <div className='flex justify-center items-center'>
                <input 
                type='range' 
                min={8}
                max={30}
                value={length}
                className='cursor-pointer'
                onChange={(e)=>{setlength(e.target.value)}}
                
                />
                <p className='text-xl mx-2 text-orange-300'>Length : {length}</p>
            </div>
            <div className='flex justify-center items-center mx-8'>
                <input
                 type='checkbox'
                 className='w-4 h-4 '
                 defaultChecked={number}
                 onChange={()=>{setnumber( (prev) => !prev)}}


                 />
                <p className='text-xl mx-1 text-orange-300'>Number</p>
            </div>
            <div className='flex justify-center items-center'>
                <input type='checkbox'
                 className='h-4 w-4 '
                 defaultChecked={character}
                 onChange={()=>{setcharacter( (prev) => !prev)}}
                 />
                <p className='text-xl mx-1 text-orange-300'>Characters</p>
            </div>
        </div>
      </div>
    </div>
  );
}

export default App;
