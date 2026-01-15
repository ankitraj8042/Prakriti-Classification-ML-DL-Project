import { Leaf } from 'lucide-react'

function Header() {
  return (
    <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3">
            <div className="bg-sage-100 p-2 rounded-xl">
              <Leaf className="w-6 h-6 text-sage-600" />
            </div>
            <div>
              <h1 className="font-display text-xl font-semibold text-sage-800">
                Prakriti Analysis
              </h1>
              <p className="text-xs text-sage-500 -mt-0.5">
                Ayurvedic Diet Recommendations
              </p>
            </div>
          </div>
          
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#" className="text-sm font-medium text-sage-600 hover:text-sage-800 transition-colors">
              About Ayurveda
            </a>
            <a href="#" className="text-sm font-medium text-sage-600 hover:text-sage-800 transition-colors">
              How It Works
            </a>
            <a href="#" className="text-sm font-medium text-sage-600 hover:text-sage-800 transition-colors">
              Contact
            </a>
          </nav>
        </div>
      </div>
    </header>
  )
}

export default Header
