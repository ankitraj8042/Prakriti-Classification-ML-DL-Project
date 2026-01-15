import { useState, useRef, useCallback } from 'react'
import { Upload, Image, X, AlertCircle, Camera } from 'lucide-react'
import axios from 'axios'

function ImageUpload({ onPrediction, isLoading, setIsLoading, error, setError }) {
  const [selectedImage, setSelectedImage] = useState(null)
  const [previewUrl, setPreviewUrl] = useState(null)
  const [isDragging, setIsDragging] = useState(false)
  const fileInputRef = useRef(null)

  const handleFileSelect = (file) => {
    if (file && file.type.startsWith('image/')) {
      setSelectedImage(file)
      setPreviewUrl(URL.createObjectURL(file))
      setError(null)
    } else {
      setError('Please select a valid image file')
    }
  }

  const handleDragOver = useCallback((e) => {
    e.preventDefault()
    setIsDragging(true)
  }, [])

  const handleDragLeave = useCallback((e) => {
    e.preventDefault()
    setIsDragging(false)
  }, [])

  const handleDrop = useCallback((e) => {
    e.preventDefault()
    setIsDragging(false)
    const file = e.dataTransfer.files[0]
    handleFileSelect(file)
  }, [])

  const handleInputChange = (e) => {
    const file = e.target.files[0]
    handleFileSelect(file)
  }

  const clearImage = () => {
    setSelectedImage(null)
    setPreviewUrl(null)
    setError(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const handleSubmit = async () => {
    if (!selectedImage) {
      setError('Please select an image first')
      return
    }

    setIsLoading(true)
    setError(null)

    const formData = new FormData()
    formData.append('image', selectedImage)

    try {
      const response = await axios.post('/api/predict', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })

      if (response.data.success) {
        onPrediction({
          ...response.data,
          imageUrl: previewUrl
        })
      } else {
        setError(response.data.error || 'Prediction failed')
      }
    } catch (err) {
      console.error('Prediction error:', err)
      setError(
        err.response?.data?.error || 
        'Failed to analyze image. Please make sure the server is running.'
      )
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto animate-slide-up">
        <div className="bg-white rounded-3xl shadow-xl p-8 border border-sage-100">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-sage-100 rounded-2xl mb-4">
              <Camera className="w-8 h-8 text-sage-600" />
            </div>
            <h2 className="font-display text-2xl font-semibold text-sage-800 mb-2">
              Upload Tongue Image
            </h2>
            <p className="text-sage-600">
              Take a clear photo of your tongue for accurate analysis
            </p>
          </div>

          {/* Upload Area */}
          <div
            className={`upload-area relative border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all
              ${isDragging ? 'dragover border-sage-500' : 'border-sage-200 hover:border-sage-400'}
              ${previewUrl ? 'bg-sage-50' : ''}`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => !previewUrl && fileInputRef.current?.click()}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleInputChange}
              className="hidden"
            />

            {previewUrl ? (
              <div className="relative">
                <img
                  src={previewUrl}
                  alt="Selected tongue"
                  className="max-h-64 mx-auto rounded-xl shadow-md"
                />
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    clearImage()
                  }}
                  className="absolute -top-3 -right-3 bg-white rounded-full p-2 shadow-lg hover:bg-red-50 transition-colors"
                >
                  <X className="w-5 h-5 text-red-500" />
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-sage-100 rounded-full">
                  <Upload className="w-8 h-8 text-sage-500" />
                </div>
                <div>
                  <p className="text-sage-700 font-medium">
                    Drag & drop your image here
                  </p>
                  <p className="text-sage-500 text-sm mt-1">
                    or click to browse from your device
                  </p>
                </div>
                <div className="flex items-center justify-center space-x-4 text-xs text-sage-400">
                  <span>PNG</span>
                  <span>•</span>
                  <span>JPG</span>
                  <span>•</span>
                  <span>BMP</span>
                  <span>•</span>
                  <span>Max 10MB</span>
                </div>
              </div>
            )}
          </div>

          {/* Error Message */}
          {error && (
            <div className="mt-4 flex items-center space-x-2 text-red-600 bg-red-50 px-4 py-3 rounded-xl">
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
              <p className="text-sm">{error}</p>
            </div>
          )}

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            disabled={!selectedImage || isLoading}
            className={`w-full mt-6 py-4 px-6 rounded-xl font-semibold text-white transition-all
              ${!selectedImage || isLoading 
                ? 'bg-sage-300 cursor-not-allowed' 
                : 'bg-sage-600 hover:bg-sage-700 hover:shadow-lg hover:-translate-y-0.5'
              }`}
          >
            {isLoading ? (
              <span className="flex items-center justify-center space-x-3">
                <div className="spinner w-5 h-5"></div>
                <span>Analyzing your image...</span>
              </span>
            ) : (
              <span className="flex items-center justify-center space-x-2">
                <Image className="w-5 h-5" />
                <span>Analyze Prakriti</span>
              </span>
            )}
          </button>

          {/* Tips */}
          <div className="mt-8 pt-6 border-t border-sage-100">
            <h3 className="text-sm font-semibold text-sage-700 mb-3">
              📸 Tips for best results:
            </h3>
            <ul className="text-sm text-sage-600 space-y-2">
              <li className="flex items-start space-x-2">
                <span className="text-sage-400">•</span>
                <span>Stick out your tongue naturally and comfortably</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-sage-400">•</span>
                <span>Ensure good lighting, preferably natural light</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-sage-400">•</span>
                <span>Keep the camera steady and close enough for detail</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-sage-400">•</span>
                <span>Avoid taking photos right after eating or drinking</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ImageUpload
