import { useState } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import ImageUpload from './components/ImageUpload'
import Results from './components/Results'
import Footer from './components/Footer'

function App() {
  const [result, setResult] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const handlePrediction = (predictionResult) => {
    setResult(predictionResult)
  }

  const handleReset = () => {
    setResult(null)
    setError(null)
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        {!result ? (
          <>
            <Hero />
            <ImageUpload 
              onPrediction={handlePrediction}
              isLoading={isLoading}
              setIsLoading={setIsLoading}
              error={error}
              setError={setError}
            />
          </>
        ) : (
          <Results result={result} onReset={handleReset} />
        )}
      </main>

      <Footer />
    </div>
  )
}

export default App
