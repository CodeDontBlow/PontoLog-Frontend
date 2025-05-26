import api from "../api/api";

const buildQueryParams = ({ endpoint, region, uf, product, sh, finalYear, periodoUnico }) => {
    const params = new URLSearchParams()

    // Só adiciona region se NÃO for balanco
    if (region && endpoint !== 'balanco') params.append('region', region);

    // Só adiciona uf se NÃO for fat
    if (uf && endpoint !== 'fat') params.append('uf', uf);
    if (product) params.append('productName', product);
    if (sh) params.append('sh', `no_${sh}_por`);
    if (periodoUnico) params.append('endYear', finalYear);

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

const fetchData = async ({ endpoint = null, initYear, tradeType, region, uf, product, sh, finalYear, periodoUnico, signal }) => {
    try {
        const params = buildQueryParams({ endpoint, region, uf, product, sh, finalYear, periodoUnico });

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

        const response = await api.get(url, { signal });
        const responseData = response.data;
        const data = responseData.data;
        return data;
    } catch (error) {
        if (error.name === 'CanceledError' || error.code === 'ERR_CANCELED') {
            console.warn('Operação cancelada por troca de paramêtros...')
            return;
        }
        console.error(`Erro fetching ${endpoint}:`, error.response?.data || error.message);
    }
}

export { fetchData, getProductByLetter };