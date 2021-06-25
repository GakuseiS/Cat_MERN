import React from 'react'

function noob() {

}

const ErrorContext = React.createContext({
    error: '',
    errorMessage: noob
})

export default ErrorContext