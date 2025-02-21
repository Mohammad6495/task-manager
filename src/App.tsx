import Providers from "./provider"
import AppRouter from "./router/routes"
import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
  return (
    <>
      <Providers>
        <AppRouter />
      </Providers>
    </>
  )
}

export default App
