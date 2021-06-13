import axios from "axios";

export default async function handler(req, res) {
    try {

        const params = new URLSearchParams()
        for (const k of Object.keys(req.query)) {
            if (typeof k === 'object')
                for (const i of req.query[k])
                    params.append(k, i)
            else
                params.append(k, req.query[k])
        }

        const data = await axios.get(
            'http://sid.centralindia.cloudapp.azure.com:8080/search',
            {params: params}
        )
        res.status(200).json(data.data)
    } catch (error) {
        console.error(error)
        return res.status(error.status || 500).end(error.message)
    }
}