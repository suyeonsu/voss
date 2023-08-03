import { privateApi } from ".";


export const getMessageRooms = async () => {
    const res = await privateApi.get(`/messenger`)
    .catch(err => {
        console.log("getMessageRooms catch: ", err)
    })
    if (res) {
        console.log("getMessageRooms then: ", res.data)
        return res.data
    }
    return false
};

export const createMessageRooms = async ( id: number ) => {
    const res = await privateApi.get(`/messsenger`)
    .catch(err => {
        console.log("createMessageRooms catch: ", err)
    })
    if (res) {
        console.log("createMessageRooms then: ", res.data)
        return(res.data)
    }
    return false
};


export const getMessages = async ( id: number ) => {
    const res = await privateApi.get(`/messenger/${id}`)
    .catch(err => {
        console.log("getMessages catch: ", err)
    })
    if (res) {
        console.log("getMessages then: ", res.data)
        return(res.data)
    }
    return false
};


export const getUsers = async (nickname: string, page: number, limit: number) => {
    const res = await privateApi.get(`/messsenger/find?nickname=${nickname}&page=${page}&limit=${limit}`)
    .catch(err => {
        console.log("getUsers catch: ", err)
    })
    if (res) {
        console.log("getUsers then: ", res.data)
        return(res.data)
    }
    return false
};