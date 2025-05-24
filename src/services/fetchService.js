import api from "../api/api";

const buildQueryParams = ({ region, estado, product, sh, finalYear, periodoUnico }) => {
    const params = new URLSearchParams()

    if (region) params.append('region', region);
    if (estado) params.append('uf', estado);
    if (product) params.append('productName', product);
    if (sh) params.append('sh', `no_${sh}_por`);
    if (!periodoUnico && finalYear) params.append('endYear', finalYear);

    return params.toString();
}

const getProductByLetter = async (searchTerm, setter, sh) => {
    if (!searchTerm || searchTerm.lenght === 0) {
        return []
    }

    const formattedTerm = searchTerm.charAt(0).toUpperCase() + searchTerm.slice(1).toLowerCase();
    try {
        const response = await api.get(`/product/no_${sh}_por/${formattedTerm}`);

        const responseData = response.data;
        const data = responseData.data;

        setter(data);
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}


const fetchData = async ({ endpoint = null, initYear, tradeType, region, estado, product, sh, finalYear, periodoUnico }) => {
    try {
        const params = buildQueryParams({ region, estado, product, sh, finalYear, periodoUnico })

        // const url = endpoint === "balanco"
        //     ? `/${endpoint}/${initYear}?${params}`
        //     : `/${tradeType}/${endpoint}/${initYear}?${params}`

        let url;

        switch (endpoint) {
            case 'balanco':
                url = `/balanco/${initYear}?${params}`;
                break;
            case 'product':
                url = `/${tradeType}/product/no_${sh}_por/${initYear}?${params}`;
                break;
            case 'fat':
                url = `/${tradeType}/fat/${initYear}?${params}`;
                break;
            default:
                url = `/${tradeType}/${initYear}?${params}`;
                break;
        }

        const response = await api.get(url)
        const responseData = response.data
        const data = responseData.data
        // if (setter) setter(data);
        // if (region) console.log(url)
        // console.log('url', url)
        // console.log('data', data)

        return data
    } catch (error) {
        console.error(`Erro fetching ${endpoint}:`, error.response?.data || error.message)
    }
}

export { fetchData, getProductByLetter };