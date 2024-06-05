import Accordion from "./components/Accordion"
import AccordionItem from "./components/AccordionItem"

function App() {
  return (
    <main>
      <section>
        <h2>Why work with us?</h2>
        <Accordion>
          <AccordionItem title="We deliver on time">
            <article>
              <p>
                We deliver on time. We are a team of dedicated professionals who
                are committed to delivering your project on time.
              </p>
              <p>We pay on delay.</p>
            </article>
          </AccordionItem>
          <AccordionItem title="We are experienced">
            <article>
              <p>
                We deliver on time. We are a team of dedicated professionals who
                are committed to delivering your project on time.
              </p>
              <p>We are in the business for more than 20 years.</p>
            </article>
          </AccordionItem>
        </Accordion>
      </section>
    </main>
  )
}

export default App
