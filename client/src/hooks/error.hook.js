import { useCallback, useState } from "react"

export const useError = () => {
    const [error, setError] = useState('')
    const errorMessage = useCallback( (message) => {
        setError(message)
        setTimeout(() => setError(''), 3000)
    }, [])

    return {error, errorMessage}
}
