import React, { useRef, useState } from "react"
import { Form, Button, Card, Alert } from "react-bootstrap"
import { useAuth } from "../contexts/AuthContext"
import { Link, useHistory } from "react-router-dom"
import { db } from "../firebase"

export default function UpdateSongList() {
  const songTitleRef = useRef()
  const artistRef = useRef()
  //const { currentUser, updatePassword, updateEmail } = useAuth()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const history = useHistory()
  const [checkedJoySound, setCheckedJoySound] = useState("false")
  const [checkedDam, setCheckedDam] = useState("false")

  async function handleSubmit(e) {
    e.preventDefault()

    const promises = []
    setLoading(true)
    setError("")

    await db.collection('songs').doc(songTitleRef.current.value).set({
      Artist: artistRef.current.value,
      Title: songTitleRef.current.value,
      Joysound: checkedJoySound,
      Dam: checkedDam
    })

    Promise.all(promises)
      .then(() => {
        history.push("/")
      })
      .catch(() => {
        setError("Failed to update account")
      })
      .finally(() => {
        setLoading(false)
      })
  }

  return (
    <>
      <Card>
          <Card.Body>
              <h2 className="text-center mb-4">Update Song List</h2>
              <Form onSubmit={handleSubmit}>
                <h4>Add Song</h4>
                <Form.Group id="song-title">
                    <Form.Label>Song Title</Form.Label>
                    <Form.Control type="" ref={songTitleRef} required />
                </Form.Group>
                <Form.Group id="artist">
                    <Form.Label>Artist</Form.Label>
                    <Form.Control type="" ref={artistRef} required />
                </Form.Group>
                <Form.Group>
                <Form.Check type="checkbox" label="Joy Sound" checked={checkedJoySound} value="true" onChange={e => setCheckedJoySound(e.currentTarget.checked)} />
                <Form.Check type="checkbox" label="DAM" checked={checkedDam} value="true" onChange={e => setCheckedDam(e.currentTarget.checked)} />
                </Form.Group>
                <Button disabled={loading} className="w-100" type="submit">
                Submit
                </Button>
            </Form>
          </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        <Link to="/">Cancel</Link>
      </div>
    </>
  )
}

