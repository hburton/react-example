'use client';
import React, { useState, useEffect } from 'react';
  import { Kit } from '@/services/kit-data'

// page.tsx is the main page of the application. For the purposes of this demo we don't really need a second page.
export default function Home() {
  const [searchValue, setSearchValue] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [kit, setKit] = useState<Kit | null>(null);

  async function onSearchValueChange(e: React.ChangeEvent<HTMLInputElement>) {
    const newValue = e.target.value;
    setSearchValue(newValue);
    await updateSuggestions(newValue);
  }

  async function updateSuggestions(searchValue: string) {
    if (searchValue.length == 0) {
      setSuggestions([]);
      return;
    }

    let suggestions = await fetchSuggestions(searchValue);
    await setSuggestions(suggestions);
  }

  async function searchKit() {
    let kit = await fetchKit(searchValue);
    console.log(kit);
    await setKit(kit);
  }

  // TODO: Extract separate components. 
  return (
    <main className="p-4">
      <h1 className="text-2xl font-bold mb-4">Test Kit Search</h1>
      
      {/* Container, 50% each side horizonally displayed */}
      <div className='flex'> 
        {/* Kit Search Component. */}
        <div className="flex-1 p-2"> 
          <div className="mb-4 flex">
            <br />
            <input
              type="text"
              value={searchValue}
              onChange={onSearchValueChange}
              className="border p-2 rounded shadow-sm flex-grow mr-2"
              placeholder="Enter Label ID..."
            />
            <button
              onClick={searchKit}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            >
              Search
            </button>
          </div>
          <ul className="mt-2 border border-gray-300 rounded shadow-sm">
            {suggestions.map((suggestion) => (
              <li 
                onClick={e => { setSearchValue(suggestion) }}
                key={suggestion} 
                className="border-b last:border-b-0 p-2 hover:bg-gray-100"
              >
                {suggestion}
              </li>
            ))}
          </ul>
        </div>      
        {/* Kit Info Component */}
        <div className='flex-1 p-2'> 
          <h2 className="text-xl font-bold">Kit Tracking Info:</h2>
          <p>Label ID: {kit?.labelId}</p>
          <p>Tracking #: {kit?.shippingTrackingCode}</p>
        </div>
      </div>
    </main>
  )
}

// API Calls
// TODO: Move api calls to a client service.
async function fetchSuggestions(searchValue: string): Promise<string[]> {
  const response = await fetch('/api/autocomplete', {
    method: 'POST',
    body: JSON.stringify({
      searchValue,
    }),
  })
  var resBody = await response.json();
  console.log(resBody.suggestedLabelIds);
  return resBody.suggestedLabelIds;
}

async function fetchKit(labelId: string): Promise<Kit | null> {
  console.log(`/api/kits/${labelId}`)
  const response = await fetch(`/api/kits/${labelId}`, {
    method: 'GET'
  })
  var resBody = await response.json();
  return resBody;
}