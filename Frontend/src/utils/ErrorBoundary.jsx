import React from "react"

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render shows the fallback UI
    return { hasError: true }
  }

  componentDidCatch(error, errorInfo) {
    // Log the error to the console or send it to an error reporting service
    console.error("Error caught in ErrorBoundary:", error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      // Fallback UI when an error occurs
      return (
        <div className="flex items-center justify-center h-screen">
          <h1 className="text-2xl font-bold text-red-500">
            Something went wrong. Please try again later.
          </h1>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
