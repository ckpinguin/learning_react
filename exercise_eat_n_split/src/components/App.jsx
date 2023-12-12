import "./App.css"
import { useState } from "react"
import FriendsList from "./FriendsList"
import FormAddFriend from "./FormAddFriend"
import Button from "./Button"
import FormSplitBill from "./FormSplitBill"

const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0
  }
]

function App() {
  const [showAddFriendForm, setShowAddFriendForm] = useState(false)
  const [friends, setFriends] = useState(initialFriends)
  const [selectedFriend, setSelectedFriend] = useState(null)

  function handleSelectFriend(friend) {
    setSelectedFriend(cur => (cur?.id === friend.id ? null : friend))
    setShowAddFriendForm(false)
  }

  function handleSplitBill(value) {
    setFriends(friends =>
      friends.map(friend =>
        friend.id === selectedFriend.id
          ? { ...friend, balance: friend.balance + value }
          : friend
      )
    )
    setSelectedFriend(null)
  }

  function handleAddFriend(newFriend) {
    setFriends(friends => [...friends, newFriend])
    setShowAddFriendForm(false)
  }

  function handleShowAddFriendForm() {
    setShowAddFriendForm(show => !show)
  }

  return (
    <div className="app">
      <div className="sidebar">
        <FriendsList
          friends={friends}
          onSelect={handleSelectFriend}
          selectedFriend={selectedFriend}
        />
        {showAddFriendForm && <FormAddFriend onAddFriend={handleAddFriend} />}
        <Button onClick={handleShowAddFriendForm}>
          {showAddFriendForm ? "Close" : "Add friend"}
        </Button>
      </div>
      {selectedFriend && (
        <FormSplitBill
          key={selectedFriend.id}
          selectedFriend={selectedFriend}
          onSplitBill={handleSplitBill}
        />
      )}
    </div>
  )
}

export default App
