import { Form, useNavigate, useNavigation, useActionData, redirect, json } from 'react-router-dom';

import classes from './EventForm.module.css';

const EventForm = ({ method, event }) => {
  const navigate = useNavigate()
  const navigation = useNavigation()
  const data = useActionData()

  const isSubmitting = navigation.state === 'submitting'

  function cancelHandler() {
    navigate('..')
  }

  return (
    // Form automatically triggers the action associated with the current
    // active route (see App.js)
    <Form method={method} className={classes.form}>
      {data && data.errors && <ul>
        {Object.values(data.errors).map(err => <li key={err}>{err}</li>)}
      </ul>}
      <p>
        <label htmlFor="title">Title</label>
        <input id="title" type="text" name="title" required
          defaultValue={event ? event.title : ''}
        />
      </p>
      <p>
        <label htmlFor="image">Image</label>
        <input id="image" type="url" name="image" required
          defaultValue={event ? event.image : ''}
        />
      </p>
      <p>
        <label htmlFor="date">Date</label>
        <input id="date" type="date" name="date" required
          defaultValue={event ? event.date : ''}
        />
      </p>
      <p>
        <label htmlFor="description">Description</label>
        <textarea id="description" name="description" rows="5" required
          defaultValue={event ? event.description : ''} />
      </p>
      <div className={classes.actions}>
        <button type="button" onClick={cancelHandler} disabled={isSubmitting}>
          Cancel
        </button>
        <button disabled={isSubmitting}>{isSubmitting ? 'Submitting...' : 'Save'}</button>
      </div>
    </Form>
  );
}

export default EventForm

// A flexible action to handle PUT/PATCH/POST requests
export const action = async ({ request, params }) => {
  const formData = await request.formData()
  const method = request.method

  const eventData = {
    title: formData.get('title'),
    image: formData.get('image'),
    date: formData.get('date'),
    description: formData.get('description')
  }

  let url = 'http://localhost:8080/events/'

  if (method === 'PATCH') {
    const id = params.id
    url = url + id
  }

  const response = await fetch(url, {
    method: method,
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(eventData)
  })

  // Check for validation errors
  if (response.status === 422) {
    return response
  }

  if (!response.ok) {
    throw json({ message: 'Could not save event.' }, { status: 500 })
  }

  return redirect('/events')
}
