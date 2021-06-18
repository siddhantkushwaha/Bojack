import axios from "axios";

import {index_address} from "../../config.json";

export default async function handler(req, res) {
    try {
        const params = new URLSearchParams()
        for (const key of Object.keys(req.query)) {
            if (key === 'field')
                for (const i of req.query[key])
                    params.append(key, i)
            else
                params.append(key, req.query[key])
        }

        const data = await axios.get(
            `${index_address}/search`,
            {params: params}
        )
        res.status(200).json(data.data)
    } catch (error) {
        console.error(error)
        return res.status(error.status || 500).end(error.message)
    }
}
