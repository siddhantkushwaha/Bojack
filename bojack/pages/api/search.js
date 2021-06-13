import axios from "axios";

export default async function handler(req, res) {
    try {
        console.log(req.query)
        const data = await axios.get(
            'http://sid.centralindia.cloudapp.azure.com:8080/search',
            {params: req.query}
        )
        res.status(200).json(data.data)
    } catch (error) {
        console.error(error)
        return res.status(error.status || 500).end(error.message)
    }
}