"use client"

export default function Error({ error }) {
  return (
    <main className="error">
      <h1>There was an error loading the meals!</h1>
      <p>Please try again later. Cause: {error.message}</p>
    </main>
  )
}
