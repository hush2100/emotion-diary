import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import MyButton from "./MyButton";
import DiaryItem from "./DiaryItem";

const sortOptionList = [
  {value:'latest', sortname: '최신순'},
  {value:'oldest', sortname: '오래된순'},
]
const filterOptionList = [
  {value:'all', sortname: '전부 다'},
  {value:'good', sortname: '좋은 감정'},
  {value:'bad', sortname: '나쁜 감정'},
]
const ControlMenu = ({value, onChange, optionList}) => {
  return <select className="ControlMenu" value={value} onChange={(e) => onChange(e.target.value)}>
    {optionList.map((it, idx) => <option key={idx} value={it.value}>{it.sortname}</option>)}
  </select>
}
const DiaryList = ({diaryList}) => {
  const navigate = useNavigate();
  const [sortType, setSortType] = useState('latest');
  const [filter, setFilter] = useState('all');

  const getProcessedDiaryList = () => {
    const filterCallBack = (item) => {
      if(filter === 'good'){
        return parseInt(item.emotion) <= 3;
      }else{
        return parseInt(item.emotion) > 3;
      }
    }
    const compare = (a, b) => {
      if(sortType === 'latest'){
        return parseInt(b.date) - parseInt(a.date);
      }else{
        return parseInt(a.date) - parseInt(b.date);
      }
    }

    const copyList = JSON.parse(JSON.stringify(diaryList));
    const filterList = filter === 'all' ? copyList : copyList.filter((it) => filterCallBack(it));
    const sortedList = filterList.sort(compare);

    return sortedList;
  }
  return (
    <div className="DiaryList">
      <div className="menu_wrapper">
        <div className="left_col">
          <ControlMenu 
            value={sortType} 
            onChange={setSortType} 
            optionList={sortOptionList}
          /> 
          <ControlMenu 
            value={filter} 
            onChange={setFilter} 
            optionList={filterOptionList}
          />
        </div>
        <div className="right_col">
          <MyButton type={'positive'} text={'새 일기 쓰러가기'} onClick={() => navigate('/new')} />
        </div>
      </div>

      {getProcessedDiaryList().map((it) => (
        <DiaryItem key={it.id} {...it} />
      ))}
      
    </div>
  )
}
DiaryList.defultProps= {
  diaryList:[],
}
export default DiaryList;