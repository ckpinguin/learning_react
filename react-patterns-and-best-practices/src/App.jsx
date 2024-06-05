import Accordion from "./components/Accordion"

function App() {
  return (
    <main>
      <section>
        <h2>Why work with us?</h2>
        <Accordion>
          <Accordion.Item
            id="delivering"
            className="accordion-item"
            title="We deliver on time">
            <article>
              <p>
                We deliver on time. We are a team of dedicated professionals who
                are committed to delivering your project on time.
              </p>
              <p>We pay on delay.</p>
            </article>
          </Accordion.Item>
          <Accordion.Item
            id="experience"
            className="accordion-item"
            title="We are experienced">
            <article>
              <p>
                We deliver on time. We are a team of dedicated professionals who
                are committed to delivering your project on time.
              </p>
              <p>We are in the business for more than 20 years.</p>
            </article>
          </Accordion.Item>
        </Accordion>
      </section>
    </main>
  )
}

export default App
