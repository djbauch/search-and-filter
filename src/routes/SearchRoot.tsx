import { useEffect } from 'react'
import { Outlet, NavLink, useLoaderData, Form, redirect, useNavigation, useSubmit } from 'react-router-dom'

export async function action() {

}
export async function loader({ request }: { request: { url: string } }) {
  const url = new URL(request.url)
  const q = url.searchParams.get('q')
  // TODO: search and return results
  return { result: [{id: '1', summary: 'These are the droids you are looking for' }], q: '' }
}

type SearchResult = {
  id: string
  summary: string
}

const Root = () => {
  const { searchResults, q } = useLoaderData() as { searchResults: Array<Partial<SearchResult>>, q: string }
  const navigation = useNavigation()
  const submit = useSubmit()

  // Is there an active search?
  const searching = navigation.location && new URLSearchParams(navigation.location.search).has('q')

  useEffect(() => {
    (document.getElementById('q') as HTMLInputElement).value = q
  }, [q])

  return (
    <>
      <div id="sidebar">
        <h1>Data Sources</h1>
        <div>
          <Form id="search-form" role="search">
            <input
              id="q"
              className={searching ? "loading" : ''}
              aria-label="Search contacts"
              placeholder="Search"
              type="search"
              name="q"
              defaultValue={q}
              onChange={(event) => {
                const isFirstSearch = q == null
                submit(event.currentTarget.form, { replace: !isFirstSearch })
              }
              }
            />
            <div
              id="search-spinner"
              aria-hidden
              hidden={!searching}
            />
            <div
              className="sr-only"
              aria-live="polite"
            ></div>
          </Form>
        </div>
        <nav>
          {searchResults && searchResults.length ? (
            <ul>
              {searchResults.map((result, i) => (
                <li key={result.id}>
                  <NavLink to={`Results/${result.id}`}>
                    {result.summary}
                  </NavLink>
                </li>
              ))}
            </ul>)
            : (
              <p>
                <i>No results</i>
              </p>
            )
          }
        </nav>
      </div>
    </>
  )
}
export default Root