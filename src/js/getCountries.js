const getCountries = async () => {
    const response = await fetch("https://restcountries.com/v3.1/all")
    const responseData = await getStreamData(response.body)
    const decoder = new TextDecoder()
    let decodedResponse = "";
    for (const chunk of responseData){
        decodedResponse+=decoder.decode(chunk)
    }
    return JSON.parse(decodedResponse);
}


const getStreamData = async (stream) => {
    const reader = stream.getReader()
    const chunks = []
    console.log(chunks)
    async function getData(){
        const {done, value} = await reader.read()
        if (done){
            return
        }
        chunks.push(value)
        console.log("hello")
        return getData()
        }
    await getData()
    console.log(JSON.stringify(chunks))
    return chunks
}

export default getCountries;