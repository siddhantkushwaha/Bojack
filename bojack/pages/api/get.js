import axios from "axios";
import {index_address} from "../../config.json";

export default async function handler(req, res) {
    try {
        const data = await axios.get(
            `${index_address}/get`,
            {params: req.query}
        )
        res.status(200).json(data.data)
    } catch (error) {
        console.error(error)
        return res.status(error.status || 500).end(error.message)
    }
}
