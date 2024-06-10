import { useState } from "react"

export default function App() {

  const [Item, SetItem] = useState([]);
  function HandleAddItem(newItem) {
    SetItem([...Item, newItem]);
  }
  function HandleDeleteItem(id) {
    SetItem(Items => Items.filter(item => item.id !== id ? item : null));
  }
  function HandleToggleItem(id) {
    SetItem(Items => Items.map(item => item.id === id ? { id, content: item.content, checked: !item.checked } : item));
  }
  return <div className="TodoApp">
    <Header ItemsPropFromCP={Item} FHandleAddItem={(newItem) => HandleAddItem(newItem)} />
    <Container ItemsPropFromCP={Item}
      FHandleDeleteItemById={(id) => HandleDeleteItem(id)}
      FHandleToggleItemById={(id) => HandleToggleItem(id)}
    />
  </div>
}

function Header({ FHandleAddItem }) {

  return <div className="Header">
    <h1 style={{ fontSize: "50px" }}>Todo-App</h1>
    <Form FHandleAddItem={FHandleAddItem} />
  </div >
}
function Form({ FHandleAddItem }) {
  const [content, SetContent] = useState("");
  function HandleSubmit() {
    const newItem = { id: Date.now(), content: content, checked: false };
    FHandleAddItem(newItem);
    if (content !== "") return;
    console.log(newItem);
    SetContent("");
  }
  return <div className="form">
    <input type="text" placeholder="something..." value={content} onChange={(e) => { SetContent(e.target.value); }} />
    <button type="submit" onClick={() => HandleSubmit()}>Add</button>
  </div>
}
function Container({ ItemsPropFromCP, FHandleDeleteItemById, FHandleToggleItemById }) {
  return <div>
    <ul className="ListItem">
      {ItemsPropFromCP.map(item => <Items PropDataItem={item} key={ItemsPropFromCP.id} FDelete={FHandleDeleteItemById} FToggle={FHandleToggleItemById} />)}
    </ul>
  </div>
}
function Items({ PropDataItem, FDelete, FToggle }) {
  return <>
    <li className="Items" >
      <input type="checkbox" value={PropDataItem.checked} onChange={() => FToggle(PropDataItem.id)} />
      <span style={PropDataItem.checked ? { textDecorationLine: "line-through", color: "green" } : { color: "red" }}>{PropDataItem.content}</span>
      <span onClick={() => FDelete(PropDataItem.id)} style={{ cursor: "pointer" }}>❌</span>
    </li>
  </>
}