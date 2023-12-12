import { MongoClient } from "mongodb"

// /api/new-meetup (executed on the server)
MONGODB_URI =
  "mongodb+srv://techpinguin:j1tWklwHkadozflD@cluster0.whvgmpk.mongodb.net/?retryWrites=true&w=majority&appName=AtlasApp"
// const client = new MongoClient(process.env.MONGODB_URI)

async function handler(req, res) {
  if (req.method === "POST") {
    const data = req.body
    //console.log(data)
    const { title, image, address, description } = data

    MongoClient.connect(MONGODB_URI, (err, client) => {
      if (err) {
        console.log(err)
        return res
          .status(500)
          .json({ message: "Connecting to the database failed!" })
      }
      const db = client.db()
      db.collection("meetups").insertOne(data)
      client.close()
      res.status(201).json({ message: "Meetup inserted!" })
    })
  }
}

export default handler
