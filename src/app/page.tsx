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
    <main>
      <h1>Test Kit Search</h1>
      <input type="text" onChange={onSearchValueChange}/>
      <button onChange={e => {}}>Search</button>
      <ul>
        {suggestions.map((suggestion) => (
          <li key={suggestion}>{suggestion}</li>
        ))}
      </ul>
    </main>
  )
}
