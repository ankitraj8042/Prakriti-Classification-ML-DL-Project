import { Sparkles, Heart, Salad } from 'lucide-react'

function Hero() {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 animated-gradient">
      <div className="max-w-4xl mx-auto text-center animate-fade-in">
        <div className="inline-flex items-center px-4 py-2 bg-white/60 backdrop-blur-sm rounded-full shadow-sm mb-6">
          <Sparkles className="w-4 h-4 text-sage-500 mr-2" />
          <span className="text-sm font-medium text-sage-700">
            AI-Powered Ayurvedic Analysis
          </span>
        </div>
        
        <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-sage-900 mb-6 leading-tight">
          Discover Your
          <span className="block text-sage-600">Prakriti</span>
        </h1>
        
        <p className="text-lg sm:text-xl text-sage-700 max-w-2xl mx-auto mb-10 leading-relaxed">
          Upload a tongue image to analyze your Ayurvedic body constitution and receive 
          personalized diet recommendations based on ancient wisdom.
        </p>
        
        <div className="flex flex-wrap justify-center gap-6 text-sm">
          <div className="flex items-center space-x-2 bg-white/70 px-4 py-2 rounded-lg shadow-sm">
            <div className="w-3 h-3 rounded-full bg-blue-400"></div>
            <span className="text-sage-700 font-medium">Vata</span>
            <span className="text-sage-500">Air & Space</span>
          </div>
          <div className="flex items-center space-x-2 bg-white/70 px-4 py-2 rounded-lg shadow-sm">
            <div className="w-3 h-3 rounded-full bg-orange-400"></div>
            <span className="text-sage-700 font-medium">Pitta</span>
            <span className="text-sage-500">Fire & Water</span>
          </div>
          <div className="flex items-center space-x-2 bg-white/70 px-4 py-2 rounded-lg shadow-sm">
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <span className="text-sage-700 font-medium">Kapha</span>
            <span className="text-sage-500">Earth & Water</span>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
