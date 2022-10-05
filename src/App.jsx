import axios from 'axios'
import { useEffect, useState } from 'react'
import './App.css'
import CardResident from './components/CardResident'
import Error from './components/Error'
import FilterList from './components/FilterList'
import PrintLocation from './components/PrintLocation'
import getRandomNumber from './utils/getRandomNumber'
function App() {
  //guarda location
  const [location, setLocation] = useState()
  //guarda info del input y hace la peticion al hacer submit.
  const [searchInput, setSearchInput] = useState("")
  //sugerencias de la api
  const [suggestedList, setSuggestedList] = useState()
  //indicar si hay errores o no.
  const [hasError, setHasError] = useState(false)
  
  useEffect(() => {
    let random=getRandomNumber()
    if(searchInput){
      random=searchInput
    }
    const URL=`https://rickandmortyapi.com/api/location/${random}`
    
    axios.get(URL)
      .then(res=>{
        setHasError(false)
        setLocation(res.data)
      })
      .catch(err=>setHasError(true))
  }, [searchInput])
  const handleSubmit=event=>{
    event.preventDefault()
    setSearchInput(event.target.idLocation.value)

  }
  const handleChange= event =>{
    if(event.target.value===""){
      setSuggestedList()
    }
    else{
      const URL=`https://rickandmortyapi.com/api/location?name=${event.target.value}`
      axios.get(URL)
      .then(res=>setSuggestedList(res.data.results))
      .catch(err=>console.log(err))
    }
    
  }
  return (
    <div className="App">
      <h1>Rick And Morty</h1>
      <form onSubmit={handleSubmit}>
        <input 
        id="idLocation"
        placeholder='Enter another number from 1 to 126'
        onChange={handleChange} />
        <button>Search</button>
        <FilterList
        suggestedList={suggestedList}
        setSearchInput={setSearchInput}
        
        />
      </form>
      {
        hasError?<Error/> : 

      <>
      <PrintLocation location={location}/>
      <div className='card-container'>
        {
        location?.residents.map(url=>(
          <CardResident 
          key={url}
          url={url}
          />
        ))
        
        }
      </div>
      </>
      }
    </div>
  )
}

export default App
