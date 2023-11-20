import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import React, { useReducer, useRef } from 'react';

import Home from './pages/Home';
import Edit from './pages/Edit';
import Diary from './pages/Diary';
import New from './pages/New';



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

const dummyData = [
  {
    id:1, 
    emotion: 1,
    content:'첫번째 일기',
    date : 1700440823309,
  },
  {
    id:2, 
    emotion: 2,
    content:'두번째 일기',
    date : 1700440823310,
  },
  {
    id:3, 
    emotion: 3,
    content:'세번째 일기',
    date : 1700440823312,
  },
  {
    id:4, 
    emotion: 4,
    content:'네번째 일기',
    date : 1700440823314,
  },
]

function App() {
  const [data, dispatch] = useReducer(reducer, dummyData);
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
          
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/edit/:id" element={<Edit />} />
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
