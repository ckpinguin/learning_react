import Link from "next/link"

export default function MealsPage() {
  return (
    <main>
      <h1>Meals Page</h1>
      <p>
        <Link href="/meals/abc">Meals Details</Link>
      </p>
      <p>
        <Link href="/meals/share">Share Meals</Link>
      </p>
      <p>
        <Link href="/community">Community Page</Link>
      </p>
    </main>
  )
}
