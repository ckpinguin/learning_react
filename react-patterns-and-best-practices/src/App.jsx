import Accordion from "./components/Accordion/Accordion"
import SearchableList from "./components/SearchableList/SearchableList"
import savannaImg from "./assets/african-savanna.jpg"
import amazonImg from "./assets/amazon-river.jpg"
import caribbeanImg from "./assets/caribbean-beach.jpg"
import desertImg from "./assets/desert-dunes.jpg"
import forestImg from "./assets/forest-waterfall.jpg"
import Place from "./components/Place"

const PLACES = [
  {
    id: "african-savanna",
    image: savannaImg,
    title: "African Savanna",
    description: "Experience the beauty of nature.",
  },
  {
    id: "amazon-river",
    image: amazonImg,
    title: "Amazon River",
    description: "Get to know the largest river in the world.",
  },
  {
    id: "caribbean-beach",
    image: caribbeanImg,
    title: "Caribbean Beach",
    description: "Enjoy the sun and the beach.",
  },
  {
    id: "desert-dunes",
    image: desertImg,
    title: "Desert Dunes",
    description: "Discover the desert life.",
  },
  {
    id: "forest-waterfall",
    image: forestImg,
    title: "Forest Waterfall",
    description: "Listen to the sound of the water.",
  },
]

function App() {
  return (
    <main>
      <section>
        <SearchableList items={PLACES}>
          {(item) => <Place item={item} />}
        </SearchableList>
        <SearchableList items={["item 1", "item 2", "item 3"]}>
          {(item) => <p>{item}</p>}
        </SearchableList>
      </section>
      <section>
        <h2>Why work with us?</h2>
        <Accordion className="accordion">
          <Accordion.Item id="delivering" className="accordion-item">
            <Accordion.Title className="accordion-item-title">
              We deliver on time
            </Accordion.Title>
            <Accordion.Content className="accordion-item-content">
              <article>
                <p>
                  We deliver on time. We are a team of dedicated professionals
                  who are committed to delivering your project on time.
                </p>
                <p>We pay on delay.</p>
              </article>
            </Accordion.Content>
          </Accordion.Item>
          <Accordion.Item id="experience" className="accordion-item">
            <Accordion.Title className="accordion-item-title">
              We are experienced
            </Accordion.Title>
            <Accordion.Content className="accordion-item-content">
              <article>
                <p>
                  We deliver on time. We are a team of dedicated professionals
                  who are committed to delivering your project on time.
                </p>
                <p>We are in the business for more than 20 years.</p>
              </article>
            </Accordion.Content>
          </Accordion.Item>
        </Accordion>
      </section>
    </main>
  )
}

export default App
