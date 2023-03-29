import CoComFilterCard from './CoComFilterCard'
import { useLoaderData } from 'react-router-dom'

export async function loader({ params }) {
  const reps = +params.reps
  return {reps}
}
export const DoubleCoComs = () => {
  let { reps } = useLoaderData() as {reps: number}
  return (
    <>
      <CoComFilterCard />
      <CoComFilterCard />
      {reps > 2 ? <CoComFilterCard /> : <div/>}
    </>
  )
}
