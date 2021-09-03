import {useState} from "react";



const ErrorBoundary = (props) => {
  
  const [errorMessage, setErrorMessage] = useState(null);


  window.onerror = function (message, url, line, col, error) {
    setErrorMessage(error.stack)    
  };
  

  const refreshPage = () => {
    window.location.reload()
  }


  if (errorMessage) {
    // You can render any custom fallback UI
    return (
        <div >
           <div variant="outlined" severity="error">
            <h3>Something went wrong</h3>
            <hr/>
            <br/>
            <div>{errorMessage}</div>
            <br/>
            <hr/>
            <br/>
            <button onClick={refreshPage} variant="contained" color="secondary">
              Refresh
            </button>
          </div>
          
        </div>
    );
  }

  return props.children; 
}

export default ErrorBoundary;
