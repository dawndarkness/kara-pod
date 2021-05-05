import React, { useRef, useState } from "react"
import { Form, Button, Card, Alert } from "react-bootstrap"
import { useAuth } from "../contexts/AuthContext"
import { Link, useHistory } from "react-router-dom"

export default function UpdateSongList() {
  const newSongRef = useRef()
  //const { currentUser, updatePassword, updateEmail } = useAuth()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const history = useHistory()

  function handleSubmit(e) {
    e.preventDefault()
    
    // if (passwordRef.current.value !== passwordConfirmRef.current.value) {
    //   return setError("Passwords do not match")
    // }

    const promises = []
    setLoading(true)
    setError("")

    // if (emailRef.current.value !== currentUser.email) {
    //   promises.push(updateEmail(emailRef.current.value))
    // }
    // if (passwordRef.current.value) {
    //   promises.push(updatePassword(passwordRef.current.value))
    // }

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
                <Form.Group id="email">
                    <Form.Label class="font-weight-bold">Add Song</Form.Label>
                    <Form.Control type="" ref={newSongRef} />
                </Form.Group>
                <Form.Group>
                <Form.Check type="checkbox" label="Joy Sound"/>
                <Form.Check type="checkbox" label="DAM"/>
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

