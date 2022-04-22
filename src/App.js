import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react'
import FurnitureItem from './FurnitureItem';
import ConfirmInsertNewItemPopup from './ConfirmInsertNewItemPopup';

function App() {
  const [confirmTvStandOpen, setConfirmTvStandOpen] = useState(false);
  const [tvActive, setTvActive] = useState(false);

  const [confirmCabnetOpen, setConfirmCabnetOpen] = useState(false);
  const [cabnetActive, setCabnetActive] = useState(false);
  const [cabnetYAdjust, setCabnetYAdjust] = useState(175+175+75+75);

  const [bed1Pos, setBed1Pos] = useState({ x: 225, y: 0});
  const [bed2Pos, setBed2Pos] = useState({ x: 225, y: 100});
  const [desk1Pos, setDesk1Pos] = useState({ x: 550, y: -350});
  const [desk2Pos, setDesk2Pos] = useState({ x: 0, y: -50});
  const [tvStandPos, setTvStandPos] = useState({ x: 0, y: -500});
  const [cabnetPos, setCabnetPos] = useState({ x: 0, y: -500});

  let furnitureInRoom = [
    {
      id: 1,
      active: true,
      name: "Bed 1",
      width: 325,
      height: 175,
      position: bed1Pos,
      yAdjust: 0,
      fitsThingsUnder: true,
      backgroundStyle: 'vertical-stripes',
    },
    {
      id: 2,
      active: true,
      name: "Bed 2",
      width: 325,
      height: 175,
      position: bed2Pos,
      yAdjust: 175,
      fitsThingsUnder: true,
      backgroundStyle: 'vertical-stripes',
    },
    {
      id: 3,
      active: true,
      name: "Desk 1",
      width: 150,
      height: 75,
      position: desk1Pos,
      yAdjust: 175+175,
      fitsThingsUnder: false,
      backgroundStyle: 'furniture',
    },
    {
      id: 4,
      active: true,
      name: "Desk 2",
      width: 150,
      height: 75,
      position: desk2Pos,
      yAdjust: 175+175+75,
      fitsThingsUnder: false,
      backgroundStyle: 'furniture',
    },
    {
      id: 5,
      active: tvActive,
      name: "Amazon TV Stand 324-01",
      width: 200,
      height: 75,
      position: tvStandPos,
      yAdjust: 175+175+75+75,
      fitsThingsUnder: false,
      backgroundStyle: 'furniture',
    },
    {
      id: 6,
      active: cabnetActive,
      name: "Target Cabnet 567-08",
      width: 100,
      height: 100,
      position: cabnetPos,
      yAdjust: cabnetYAdjust,
      fitsThingsUnder: false,
      backgroundStyle: 'furniture',
    },
  ];

  let getItem = (id) => {
    const compareId = (element) => element.id === id;
    let itemIndexFurnitureList = furnitureInRoom.findIndex(compareId);
    return furnitureInRoom[itemIndexFurnitureList];
  };

  useEffect(() => {
    if(getItem(5).active){
      setCabnetYAdjust(175+175+75+75+75);
    }else{
      setCabnetYAdjust(175+175+75+75);
    }
  });

  let getActiveItems = (id) => {
    let finalList = [];
    furnitureInRoom.forEach((item) => {
      if(item.id != id && item.active){
        finalList.push(item);
      }
    });
    return finalList
  };

  return (<>
    <div className='page_container'>
      <div className='furniture_drawer'>
        <h1>Furniture Drawer</h1>
        <div className='furniture_drawer_inner_container'>
          <div className="furniture_item_container" onClick={() => {
            setConfirmTvStandOpen(true);
          }}>
            <div className="tv_stand_img"></div>
            <p>Amazon TV Stand 324-01</p>
          </div>
          <div className="furniture_item_container" onClick={() => {
            setConfirmCabnetOpen(true);
          }}>
            <div className="cabnet_img"></div>
            <p>Target Cabnet 567-08</p>
          </div>
        </div>
      </div>
      <div className='room_box'>
        <FurnitureItem
          item={getItem(1)}
          position={bed1Pos}
          setPosition={setBed1Pos}
          otherItems={getActiveItems(1)}
        />
        <FurnitureItem
          item={getItem(2)}
          position={bed2Pos}
          setPosition={setBed2Pos}
          otherItems={getActiveItems(2)}
        />
        <FurnitureItem
          item={getItem(3)}
          position={desk1Pos}
          setPosition={setDesk1Pos}
          otherItems={getActiveItems(3)}
        />
        <FurnitureItem
          item={getItem(4)}
          position={desk2Pos}
          setPosition={setDesk2Pos}
          otherItems={getActiveItems(4)}
        />
        {getItem(5).active && <FurnitureItem
          item={getItem(5)}
          position={tvStandPos}
          setPosition={setTvStandPos}
          otherItems={getActiveItems(5)}
          deleteFunc={()=>{
            setTvActive(false);
          }}
        />}
        {getItem(6).active && <FurnitureItem
          item={getItem(6)}
          position={cabnetPos}
          setPosition={setCabnetPos}
          otherItems={getActiveItems(6)}
          deleteFunc={()=>{
            setCabnetActive(false);
          }}
        />}
      </div>
    </div>
    {confirmTvStandOpen && <ConfirmInsertNewItemPopup
      item={getItem(5)}
      closeFunction={() => {setConfirmTvStandOpen(false);}}
      addItemToRoom={() => {setTvActive(true);}}
    />}
    {confirmCabnetOpen && <ConfirmInsertNewItemPopup
      item={getItem(6)}
      closeFunction={() => {setConfirmCabnetOpen(false);}}
      addItemToRoom={() => {setCabnetActive(true);}}
    />}
    </>);
}

export default App;