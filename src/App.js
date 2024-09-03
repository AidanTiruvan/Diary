import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [entry, setEntry] = useState("");
  const [entries, setEntries] = useState([]);

  const [entryData, setEntryData] = useState([]);

  function handleFormSubmit(ev) {
    ev.preventDefault();
    const url = ("http://localhost:3001/api"+"/submit")
    console.log("Form submitted to:", url);

    fetch(url, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
        ,'Accept': 'application/json'
      },
      body: JSON.stringify({ title, date, entry})
    })
    .then(response => {
      response.json().then(json => {
        console.log('result', json);

        setEntries([...entries, json]);
        setTitle("");
        setDate("");
        setEntry("");
      });
    });
    
    fetch("http://localhost:3001/api/diaries", {
      method: 'GET',
      headers: {
        'Content-type': 'application/json'
      }, 
    }) .then(response => {
      response.json().then(json => {
        console.log('result', json);

        setEntryData(json.data)
    })});

    


  }
  useEffect(() =>{
    fetch("http://localhost:3001/api/diaries", {
      method: 'GET',
      headers: {
        'Content-type': 'application/json'
      }, 
    }) .then(response => {
      response.json().then(json => {
        console.log('result', json);

        setEntryData(json.data)
    })});
  })

  return (
    <div className="App">
      <header className="App-header">
        <h1>Digital Diary</h1>
      </header>
      <div className="App-content">
        <DiaryForm
          title={title}
          date={date}
          entry={entry}
          onTitleChange={(e) => setTitle(e.target.value)}
          onDateChange={(e) => setDate(e.target.value)}
          onEntryChange={(e) => setEntry(e.target.value)}
          onSubmit={handleFormSubmit}
        />
        <EntriesDisplay entries={entryData} />
      </div>
    </div>
  );
}

function DiaryForm({ title, date, entry, onTitleChange, onDateChange, onEntryChange, onSubmit }) {
  return (
    <form className="diary-form" onSubmit={onSubmit}> 
      <div className="form-group">
        <label htmlFor="title">Title:</label>
        <input type="text" id="title" name="title" value={title} onChange={onTitleChange} required />
      </div>
      <div className="form-group">
        <label htmlFor="date">Date:</label>
        <input type="date" id="date" name="date" value={date} onChange={onDateChange} required />
      </div>
      <div className="form-group">
        <label htmlFor="entry">Diary Entry:</label>
        <textarea id="entry" name="entry" value={entry} onChange={onEntryChange} required></textarea>
      </div>
      <button type="submit">Submit</button>
    </form>
  );
}

function EntriesDisplay({ entries }) {
  return (
    <div className="entries-display">
      <h2>Your Entries</h2>
      {entries.length === 0 ? (
        <p>No entries yet.</p>
      ) : (
        entries.map((entry, index) => (
          <div key={index} className="entry">
            <h3>{entry.title}</h3>
            <p><strong>Date:</strong> {entry.date}</p>
            <p>{entry.entry}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default App;
