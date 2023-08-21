'use client';
import React, { useState, useEffect } from 'react'

export default function Home() {
  const [searchValue, setSearchValue] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);

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

  async function fetchSuggestions(searchValue: string): Promise<string[]> {
    const response = await fetch('/api/autocomplete', {
      method: 'POST',
      body: JSON.stringify({
        searchValue,
      }),
    })
    var resBody = await response.json();
    console.log(resBody.suggestions);
    return resBody.suggestions;
  }

  return (
    <main className="p-4">
      <h1 className="text-2xl font-bold mb-4">Test Kit Search</h1>
      <div className="mb-4 flex">
        <br />
        <input
          type="text"
          onChange={onSearchValueChange}
          className="border p-2 rounded shadow-sm flex-grow mr-2"
          placeholder="Enter Label ID..."
        />
        <button
          onClick={e => { }}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-200 focus:ring-opacity-50"
        >
          Search
        </button>
      </div>
      <ul className="mt-2 border border-gray-300 rounded shadow-sm">
        {suggestions.map((suggestion) => (
          <li key={suggestion} className="border-b last:border-b-0 p-2 hover:bg-gray-100">
            {suggestion}
          </li>
        ))}
      </ul>
    </main>
  )

}
