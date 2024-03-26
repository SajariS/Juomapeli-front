
const apiUrl = import.meta.env.VITE_PUBLIC_API_URL;
const userName = import.meta.env.VITE_PUBLIC_USERNAME;
const password = import.meta.env.VITE_PUBLIC_USERNAME;

const TokenFetch = {

    //Hakee kutsuttaessa palvelimelta JWT tokenin
    //Toimii asynkronisoituna, eli käsittely sama kuin esim. rest kutsussa ilman fetchiä
    //Eli esim. TokenFetch.fetchToken().then(data => käsittele data)
    //Sisältää "virheen käsittelyn" eli sisällytä komponentin kutsussa .catch käsittely 
    fetchToken: () => {
        return new Promise((resolve, reject) => {
            fetch(apiUrl + "/authenticate", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({username: userName, password: password})
            })
            .then(response => {
                if(response.ok) {
                    return response.json();
                }
                else {
                    throw new Error("Error in authentication fetch: " + response.statusText)
                }
            })
            .then(data => resolve(data))
            .catch(err => reject(err))
        })
    }

}

export default TokenFetch;