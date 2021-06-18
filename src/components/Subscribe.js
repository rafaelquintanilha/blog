import React, { useState } from 'react'
import css from './Subscribe.module.css'
import fetch from 'isomorphic-fetch'

function Subscribe() {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)

  const onSubmit = async event => {
    event.preventDefault()
    if (!email || loading) return
    setLoading(true)
    setError('')
    setSuccess('')
    try {
      const response = await fetch('/.netlify/functions/subscribe', {
        method: 'POST',
        body: JSON.stringify({
          email,
          path: window.location.href,
        }),
      })
      if (response.status >= 200 && response.status < 400) {
        await response.json()
        setSuccess('You are now subscribed 🎉')
      } else {
        const text = await response.text()
        let json
        try {
          json = JSON.parse(text)
        } catch (e) {
          throw new Error(`${response.status} - ${text}`)
        }
        if (json.title === 'Member Exists') {
          setSuccess('You are already subscribed!')
        } else throw new Error(`${response.status} - ${json.detail}`)
      }
    } catch (e) {
      setError(e.message)
    }
    setLoading(false)
  }

  return (
    <div className={css.container}>
      <div className={css.main_header}>
        <div className={css.icon}>📩</div>
        <h1>Stay tuned!</h1>
      </div>
      <h2>
        Subscribe to get the latest articles directly into your inbox.
        <br />
        You will <u>never</u> receive any spam.
      </h2>
      <form onSubmit={onSubmit} className={css.input_container}>
        <input
          type="email"
          className="input"
          placeholder="Your Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          aria-label="Fill your email to subscribe"
        />
        <button disabled={loading} type="submit">
          {loading ? 'Subscribing...' : 'Subscribe'}
        </button>
      </form>
      {error && (
        <div className={css['error']}>
          Oops, there was an error: <strong>{error}</strong>
        </div>
      )}
      {success && <div className={css['success']}>{success}</div>}
    </div>
  )
}

export default Subscribe
