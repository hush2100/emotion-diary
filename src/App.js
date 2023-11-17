import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import React, { useReducer, useRef } from 'react';

import Home from './pages/Home';
import Edit from './pages/Edit';
import Diary from './pages/Diary';
import New from './pages/New';


// import MyButton from './components/MyButton';
// import MyHeader from './components/MyHeader';
const reducer = (state, action) => {
  let newState = [];
  switch(action.type) {
    case 'INIT' : {
      return action.data;
    }
    case 'CREATE' : {
      const newItem = {
        ...action.data
      }
      newState = [newItem, ...state];
      break;
    }
    case 'REMOVE' : {
      newState = state.filter((it) => it.id !== action.targetId);
      break;
    }
    case 'EDIT' : {
      newState = state.map((it) => it.id === action.data.id ? {...action.data} : it)
      break;
    }
    default : 
      return state;
  }
  return newState;
}
export const DiaryStateContext = React.createContext();
export const DiaryDispatchContext = React.createContext();

function App() {
  const [data, dispatch] = useReducer(reducer, []);
  const dataId = useRef(0);
  //CREATE
  const onCreate = (date, content, emotion) => {
    dispatch({type: "CREATE", data: {
      id: dataId.current,
      date: new Date(date).getTime(),
      content,
      emotion,
    }});
    dataId.current += 1;
  }
  //REMOVE
  const onRemove = (targetId) => {
    dispatch({type: "REMOVE", targetId});
  }
  //EDIT
  const onEdit = (targetId, date, content, emotion) => {
    dispatch({type: "EDIT", data: {
      id: targetId,
      date: new Date(date).getTime(),
      content,
      emotion,
    }})
  }
  return (
   <DiaryStateContext.Provider value={data}>
    <DiaryDispatchContext.Provider value={{onCreate, onRemove, onEdit}}>
     <BrowserRouter>
      <div className="App">
        <h2>App</h2>
      
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/edit" element={<Edit />} />
          <Route path="/new" element={<New />} />
          <Route path="/diary/:id" element={<Diary />} />
        </Routes>
      </div>
    </BrowserRouter>
    </DiaryDispatchContext.Provider>
   </DiaryStateContext.Provider>
  );
}

export default App;
