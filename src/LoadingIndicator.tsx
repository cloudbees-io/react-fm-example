export const LoadingIndicator = () => {
  const showMessage = true; // This can be set based on your application's state

  return (
   { showMessage ? <div className="position-absolute top-50 start-50 translate-middle">
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div> : null }
  )
}
