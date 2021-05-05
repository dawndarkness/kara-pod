import React, { useState, useRef } from "react"
import { Form, Card, Button, Alert } from "react-bootstrap"
import { useAuth } from "../contexts/AuthContext"
import { Link, useHistory } from "react-router-dom"
import SongList from "./SongList"

export default function Dashboard() {
  const [error, setError] = useState("")
  const { currentUser, logout } = useAuth()
  const history = useHistory()
  const newSongRef = useRef()
  const [loading, setLoading] = useState(false)

  async function handleLogout() {
    setError("")

    try {
      await logout()
      history.push("/login")
    } catch {
      setError("Failed to log out")
    }
  }

  async function handleSubmit(e) {
    e.preventDefault()

    try {
      setError("")
      setLoading(true)
      //await addSong(newSongRef.current.value)
    } catch {
      setError("Failed to add song")
    }

    setLoading(false)
  }

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Profile</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <strong>Email:</strong> {currentUser.email}
          <Link to="/update-profile" className="btn btn-primary w-100 mt-3">
            Update Profile
          </Link>
          <Link to="/update-songList" className="btn btn-primary w-100 mt-3">
            Update Song List
          </Link>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        <Button variant="link" onClick={handleLogout}>
          Log Out
        </Button>
      </div>
      <Card>
          <Card.Body>
              <h2 className="text-center mb-4">Song List</h2>
              <div>
                  <SongList/>
              </div>
          </Card.Body>
      </Card>
    </>
  )
}