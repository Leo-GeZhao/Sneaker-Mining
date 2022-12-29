import React, {useState, useEffect} from 'react'
import Axios from 'axios'




const Search = () => {

  const [sneaker, setSneaker] = useState(null)



  useEffect(()=> {
    Axios.get("/sneaker").then(
      prod => setSneaker(prod.data)
    ).then(prod => console.log(prod))
    
  },[])

  

    
  return (
    <div>
        <form action="">
            <div className='d-flex mt-5 ms-5'>  
                <label htmlFor="" className='mx-2'>Search your sneaker: </label>
                <input type="text" className='form-control w-50'/>
                <button className='btn btn-primary ms-2'>Submit</button>
            </div>
        </form>
    </div>
  )
}

export default Search