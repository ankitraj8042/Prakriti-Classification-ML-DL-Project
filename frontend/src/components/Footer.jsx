import { Heart, Leaf, Github, Mail } from 'lucide-react'

function Footer() {
  return (
    <footer className="bg-sage-800 text-white py-12 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Leaf className="w-6 h-6 text-sage-300" />
              <span className="font-display text-xl font-semibold">Prakriti Analysis</span>
            </div>
            <p className="text-sage-300 text-sm leading-relaxed">
              Bridging ancient Ayurvedic wisdom with modern AI technology to help you 
              understand your unique body constitution and make informed dietary choices.
            </p>
          </div>

          {/* About Prakriti */}
          <div>
            <h3 className="font-semibold mb-4 text-sage-100">About Prakriti</h3>
            <p className="text-sage-300 text-sm leading-relaxed">
              Prakriti in Ayurveda refers to one's unique psycho-physiological constitution 
              determined by the balance of Vata, Pitta, and Kapha doshas. Understanding your 
              Prakriti helps in personalizing diet and lifestyle for optimal health.
            </p>
          </div>

          {/* Technology */}
          <div>
            <h3 className="font-semibold mb-4 text-sage-100">Technology</h3>
            <p className="text-sage-300 text-sm leading-relaxed">
              Powered by ResNet50 deep learning model trained on tongue images. 
              The model achieves 88% accuracy in classifying Prakriti types based on 
              tongue characteristics following traditional Ayurvedic diagnosis principles.
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-sage-700 mt-8 pt-8 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-sage-400 text-sm flex items-center">
            Made with <Heart className="w-4 h-4 mx-1 text-red-400" /> for Ayurvedic wellness
          </p>
          <p className="text-sage-400 text-sm mt-4 sm:mt-0">
            © 2025 Prakriti Analysis. ML Project.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
