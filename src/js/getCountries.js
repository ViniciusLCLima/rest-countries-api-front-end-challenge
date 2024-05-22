const getStreamData = async (stream) => {
    console.log('requested countries')
    const reader = stream.getReader()
    const chunks = []
    async function getData(){
        const {done, value} = await reader.read()
        if (done){
            return
        }
        chunks.push(value)
        return getData()
        }
    await getData()
    return chunks
}

const getCountries = async () => {
    try{
        const response = await fetch("https://restcountries.com/v3.1/all")
    } catch(err) {
        throw err
    }
    console.log("passed")
    console.log(response)
    const responseData = await getStreamData(response.body)
    const decoder = new TextDecoder()
    let decodedResponse = "";
    for (const chunk of responseData){
        decodedResponse+=decoder.decode(chunk)
    }
    return JSON.parse(decodedResponse);
}

export default getCountries;