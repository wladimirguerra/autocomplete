/**
 * Query brasilian state by name.
 * This is a mock that simulates a api query. It fetches all states
 * and filter in place.
 * @param query string A query string to find a brasilian state by name
 */
export const queryBrazilianState = (query) => {


    return new Promise((resolve, reject) => {
        if (!query || typeof query !== "string") resolve([]);

        // A timeout to be possible to see loading signalling if the
        // connection is too fast. :)
        setTimeout(
            () => {
                const xmlHttp = new XMLHttpRequest();
                xmlHttp.responseType = "json";
                xmlHttp.onload = function() {
                    if (xmlHttp.readyState === 4 && xmlHttp.status === 200) {
                        const filteredStates = xmlHttp.response.estados.filter(state => state.nome.toLowerCase().includes(query?.toLowerCase() ?? ""));
                        resolve(filteredStates);
                    } else {
                        reject(xmlHttp.status);
                    }
                };
                xmlHttp.onerror = function() {
                    reject(xmlHttp.status);
                };

                xmlHttp.open(
                    "GET",
                    "https://gist.githubusercontent.com/wladimirguerra/5f9c7156d33402c10eb57236d0070aa4/raw/36fc21d9e2fc45c078e0e0e07cce3c81965db8f9/estados-cidades.json",
                    true,
                );
                xmlHttp.send(null);
            },
            500,
        );

    });

};
