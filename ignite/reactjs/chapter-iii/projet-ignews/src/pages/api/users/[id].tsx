import { NextApiRequest, NextApiResponse } from 'next';

export default (request: NextApiRequest, response: NextApiResponse) => {

    const {id} = request.query;

    const users = [
        { id: 1, name: "Diego"},
        { id: 2, name: "Dani"},
        { id: 3, name: "Maykão"},
    ];

    return response.json(users);
}

//landing page
//exemplo pegando route param