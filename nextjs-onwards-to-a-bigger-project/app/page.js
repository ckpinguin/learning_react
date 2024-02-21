import MeetupList from "@/app/meetups/MeetupList"

const DUMMY_MEETUPS = [
  {
    id: "m1",
    title: "A First Meetup",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/f/f7/Z%C3%BCrich_view_Quaibr%C3%BCcke_20200702.jpg",
    address: "Some address 5, 12345 Some City",
    description: "This is a first meetup!"
  },
  {
    id: "m2",
    title: "A Second Meetup",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/f/f7/Tokyo_Marunouchi01s3872.jpg",
    address: "Some address 10, 12345 Some City",
    description: "This is a second meetup!"
  },
  {
    id: "m3",
    title: "A Third Meetup",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/f/f7/Tokyo_Marunouchi01s3872.jpg",
    address: "Some address 15, 12345 Some City",
    description: "This is a third meetup!"
  }
]

export default function Home() {
  return <MeetupList meetups={DUMMY_MEETUPS} />
}

// Server side rendering (SSR)
// NOTE: This does not work for app routing!
/* export async function getServerSideProps(context) {
  const req = context.req
  const res = context.res
  // fetch data from an API
  return {
    props: {
      meetups: DUMMY_MEETUPS
    }
  }
} */

// Static site generation (SSG)
// NOTE: This does not work for app routing!
// Make page static for production, because useEffect() AFTER the page has been
// rendered is not good for SEO (no daa in first rendering!)
// With getStaticProps, we load data before rendering the page the first time
// Nothing of this code will be included in the client side bundle (only used in
// the build process)
// Normally this is preferred ofer SSR, because it is faster in most cases
/* export async function getStaticProps() {
  // fetch data from an API
  return {
    props: {
      meetups: DUMMY_MEETUPS
    },
    revalidate: 10
  }
}
 */
// Use this in conjunction with getStaticPaths() to pre-generate pages for
// all kind of dynamic routes
// This is useful if you have a lot of dynamic routes and you want to pre-generate
// all of them
/* export async function getStaticPaths() {
  return {
    fallback: false,
    paths: [
      {
        params: {
          meetupId: "m1"
        }
      },
      {
        params: {
          meetupId: "m2"
        }
      }
    ]
  }
} */
