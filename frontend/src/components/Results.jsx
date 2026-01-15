import { 
  ArrowLeft, 
  Check, 
  X, 
  Leaf, 
  Sun, 
  Droplets, 
  Wind,
  UtensilsCrossed,
  Clock,
  Sparkles,
  AlertTriangle
} from 'lucide-react'

function Results({ result, onReset }) {
  const { prediction, prakriti_info, diet_recommendation, imageUrl } = result

  const prakritiColors = {
    Vata: {
      bg: 'bg-blue-50',
      border: 'border-blue-200',
      text: 'text-blue-700',
      accent: 'bg-blue-500',
      light: 'bg-blue-100',
      icon: Wind
    },
    Pitta: {
      bg: 'bg-orange-50',
      border: 'border-orange-200', 
      text: 'text-orange-700',
      accent: 'bg-orange-500',
      light: 'bg-orange-100',
      icon: Sun
    },
    Kapha: {
      bg: 'bg-green-50',
      border: 'border-green-200',
      text: 'text-green-700',
      accent: 'bg-green-500',
      light: 'bg-green-100',
      icon: Droplets
    }
  }

  const colors = prakritiColors[prediction.prakriti]
  const Icon = colors.icon

  return (
    <section className="py-8 px-4 sm:px-6 lg:px-8 animate-fade-in">
      <div className="max-w-5xl mx-auto">
        {/* Back Button */}
        <button
          onClick={onReset}
          className="flex items-center space-x-2 text-sage-600 hover:text-sage-800 mb-6 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="font-medium">Analyze another image</span>
        </button>

        {/* Main Result Card */}
        <div className={`${colors.bg} rounded-3xl p-8 mb-8 border ${colors.border}`}>
          <div className="flex flex-col lg:flex-row items-center gap-8">
            {/* Uploaded Image */}
            <div className="flex-shrink-0">
              <img
                src={imageUrl}
                alt="Analyzed tongue"
                className="w-48 h-48 object-cover rounded-2xl shadow-lg border-4 border-white"
              />
            </div>

            {/* Prediction Result */}
            <div className="flex-grow text-center lg:text-left">
              <div className="flex items-center justify-center lg:justify-start space-x-3 mb-4">
                <div className={`${colors.light} p-3 rounded-xl`}>
                  <Icon className={`w-8 h-8 ${colors.text}`} />
                </div>
                <div>
                  <p className="text-sm text-sage-500 font-medium">Your Prakriti Type</p>
                  <h2 className="font-display text-4xl font-bold text-sage-900">
                    {prediction.prakriti}
                  </h2>
                </div>
              </div>

              {/* Confidence */}
              <div className="mb-4">
                <div className="flex items-center justify-center lg:justify-start space-x-2 mb-2">
                  <Sparkles className="w-4 h-4 text-sage-500" />
                  <span className="text-sm text-sage-600">Confidence Score</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="flex-grow bg-white rounded-full h-3 shadow-inner">
                    <div 
                      className={`${colors.accent} h-3 rounded-full progress-bar transition-all`}
                      style={{ width: `${prediction.confidence}%` }}
                    ></div>
                  </div>
                  <span className={`font-bold ${colors.text}`}>
                    {prediction.confidence.toFixed(1)}%
                  </span>
                </div>
              </div>

              {/* Probability Distribution */}
              <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
                {Object.entries(prediction.probabilities).map(([type, prob]) => (
                  <div 
                    key={type}
                    className={`px-4 py-2 rounded-lg ${
                      type === prediction.prakriti 
                        ? `${colors.accent} text-white` 
                        : 'bg-white text-sage-700'
                    }`}
                  >
                    <span className="font-medium">{type}:</span> {prob.toFixed(1)}%
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="mt-6 pt-6 border-t border-white/50">
            <p className="text-sage-700 leading-relaxed">
              {prakriti_info.description}
            </p>
          </div>
        </div>

        {/* Characteristics */}
        <div className="bg-white rounded-3xl p-8 mb-8 shadow-lg border border-sage-100">
          <h3 className="font-display text-2xl font-semibold text-sage-800 mb-6 flex items-center">
            <Leaf className="w-6 h-6 mr-3 text-sage-500" />
            {prediction.prakriti} Characteristics
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            {prakriti_info.characteristics.map((char, index) => (
              <div 
                key={index}
                className="flex items-start space-x-3 p-4 bg-sage-50 rounded-xl"
              >
                <div className="w-6 h-6 bg-sage-200 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check className="w-4 h-4 text-sage-700" />
                </div>
                <span className="text-sage-700">{char}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Diet Recommendations */}
        <div className="bg-white rounded-3xl p-8 mb-8 shadow-lg border border-sage-100">
          <h3 className="font-display text-2xl font-semibold text-sage-800 mb-4 flex items-center">
            <UtensilsCrossed className="w-6 h-6 mr-3 text-sage-500" />
            Personalized Diet Recommendations
          </h3>
          
          <div className={`${colors.bg} rounded-xl p-4 mb-6`}>
            <p className={`${colors.text} font-medium`}>
              {diet_recommendation.guidelines}
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            {/* Foods to Favor */}
            <div className="bg-green-50 rounded-2xl p-6 border border-green-100">
              <h4 className="font-semibold text-green-800 mb-4 flex items-center">
                <Check className="w-5 h-5 mr-2" />
                Foods to Favor
              </h4>
              <ul className="space-y-3">
                {diet_recommendation.foods_to_favor.map((food, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-green-700">{food}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Foods to Avoid */}
            <div className="bg-red-50 rounded-2xl p-6 border border-red-100">
              <h4 className="font-semibold text-red-800 mb-4 flex items-center">
                <X className="w-5 h-5 mr-2" />
                Foods to Avoid
              </h4>
              <ul className="space-y-3">
                {diet_recommendation.foods_to_avoid.map((food, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-red-700">{food}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Daily Meal Plan */}
        <div className="bg-white rounded-3xl p-8 mb-8 shadow-lg border border-sage-100">
          <h3 className="font-display text-2xl font-semibold text-sage-800 mb-6 flex items-center">
            <Clock className="w-6 h-6 mr-3 text-sage-500" />
            Suggested Daily Meal Plan
          </h3>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {Object.entries(diet_recommendation.meal_plan).map(([meal, details]) => {
              const mealLabels = {
                breakfast: '🌅 Breakfast',
                mid_morning: '🍵 Mid-Morning',
                lunch: '☀️ Lunch',
                evening_snack: '🌤️ Evening Snack',
                dinner: '🌙 Dinner'
              }
              
              return (
                <div 
                  key={meal}
                  className={`${colors.bg} rounded-xl p-5 border ${colors.border} hover:shadow-md transition-shadow`}
                >
                  <div className="flex justify-between items-start mb-3">
                    <h4 className="font-semibold text-sage-800">
                      {mealLabels[meal] || meal}
                    </h4>
                    <span className={`text-xs font-medium ${colors.text} ${colors.light} px-2 py-1 rounded-full`}>
                      {details.calories} kcal
                    </span>
                  </div>
                  <p className="text-sage-600 text-sm leading-relaxed">
                    {details.food}
                  </p>
                </div>
              )
            })}
          </div>

          {/* Total Calories */}
          <div className="mt-6 pt-6 border-t border-sage-100 text-center">
            <p className="text-sage-600">
              Total Daily Calories: 
              <span className="font-bold text-sage-800 ml-2">
                {Object.values(diet_recommendation.meal_plan).reduce((sum, m) => sum + m.calories, 0)} kcal
              </span>
            </p>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="bg-amber-50 rounded-2xl p-6 border border-amber-200 flex items-start space-x-4">
          <AlertTriangle className="w-6 h-6 text-amber-600 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="font-semibold text-amber-800 mb-1">Disclaimer</h4>
            <p className="text-amber-700 text-sm leading-relaxed">
              This analysis is based on AI interpretation and should be used for informational purposes only. 
              For personalized health advice, please consult a qualified Ayurvedic practitioner or healthcare professional.
            </p>
          </div>
        </div>

        {/* Analyze Again Button */}
        <div className="text-center mt-8">
          <button
            onClick={onReset}
            className="inline-flex items-center space-x-2 px-8 py-4 bg-sage-600 hover:bg-sage-700 text-white rounded-xl font-semibold transition-all hover:shadow-lg hover:-translate-y-0.5"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Analyze Another Image</span>
          </button>
        </div>
      </div>
    </section>
  )
}

export default Results
