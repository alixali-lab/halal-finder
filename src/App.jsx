import React, { useEffect, useState } from 'react'

const IconSearch = ({className}) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35"/><circle cx="11" cy="11" r="6" strokeWidth="1.5" /></svg>
)
const IconPlus = ({className}) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M12 5v14M5 12h14" /></svg>
)
const IconCoffee = ({className}) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M18 8h1a3 3 0 010 6h-1"/><path strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M3 8h12v6a4 4 0 01-4 4H7a4 4 0 01-4-4V8z"/></svg>
)

export default function App(){
  const [city, setCity] = useState('')
  const [places, setPlaces] = useState({})
  const [results, setResults] = useState([])
  const [newPlace, setNewPlace] = useState({name:'', type:'', address:''})

  // load from localStorage
  useEffect(()=> {
    try {
      const raw = localStorage.getItem('halalPlaces')
      if(raw) setPlaces(JSON.parse(raw))
    } catch(e){}
  }, [])

  // save to localStorage
  useEffect(()=> {
    try{ localStorage.setItem('halalPlaces', JSON.stringify(places)) }catch(e){}
  }, [places])

  const handleSearch = ()=> {
    const key = city.trim().toLowerCase()
    setResults(places[key] || [])
  }

  const handleAdd = ()=> {
    if(!city || !newPlace.name || !newPlace.type || !newPlace.address) return
    const key = city.trim().toLowerCase()
    const next = {...places, [key]: [...(places[key]||[]), newPlace]}
    setPlaces(next)
    setResults(next[key])
    setNewPlace({name:'', type:'', address:''})
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-start bg-white p-6">
      <div className="w-full max-w-xl mt-12 text-center">
        <h1 className="text-4xl font-bold text-green-700 mb-6">Halal Finder</h1>
        <div className="flex items-center gap-2">
          <input
            aria-label="city"
            placeholder="Enter a city (e.g., New York)"
            value={city}
            onChange={e=>setCity(e.target.value)}
            className="flex-1 p-4 rounded-3xl text-lg border-2 border-green-200 focus:outline-none focus:ring-2 focus:ring-green-400"
          />
          <button onClick={handleSearch} className="p-4 rounded-3xl bg-green-600 hover:bg-green-700 text-white">
            <IconSearch className="w-5 h-5" />
          </button>
        </div>
      </div>

      {city && (
        <div className="mt-8 w-full max-w-xl bg-green-50 p-4 rounded-2xl shadow">
          <h2 className="text-lg font-semibold text-green-700 mb-3">Add a Halal Place in {city}</h2>
          <div className="grid gap-2">
            <input placeholder="Name" value={newPlace.name} onChange={e=>setNewPlace({...newPlace, name:e.target.value})} className="p-3 rounded-xl border border-green-200" />
            <input placeholder="Type (Restaurant, Shop...)" value={newPlace.type} onChange={e=>setNewPlace({...newPlace, type:e.target.value})} className="p-3 rounded-xl border border-green-200" />
            <input placeholder="Address" value={newPlace.address} onChange={e=>setNewPlace({...newPlace, address:e.target.value})} className="p-3 rounded-xl border border-green-200" />
            <div className="flex justify-end">
              <button onClick={handleAdd} className="mt-2 rounded-2xl p-3 bg-green-600 hover:bg-green-700 text-white inline-flex items-center gap-2">
                <IconPlus className="w-4 h-4" /> Add Place
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="w-full max-w-xl mt-8 grid gap-4">
        {results.length > 0 ? results.map((p, idx)=>(
          <div key={idx} className="border rounded-2xl p-4 shadow-sm">
            <h3 className="text-xl font-semibold text-green-700">{p.name}</h3>
            <p className="text-green-600">{p.type}</p>
            <a className="text-green-500 underline text-sm" target="_blank" rel="noopener noreferrer"
               href={"https://www.google.com/maps/search/?api=1&query="+encodeURIComponent(p.address)}>
              {p.address}
            </a>
          </div>
        )) : (city ? <p className="text-green-600">No halal places found in {city}.</p> : null)}
      </div>

      <div className="mt-12 text-center">
        <a href="https://buymeacoffee.com/alixaliapps" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-green-700 font-semibold underline">
          <IconCoffee className="w-5 h-5" /> Buy me a coffee
        </a>
      </div>
    </div>
  )
}
