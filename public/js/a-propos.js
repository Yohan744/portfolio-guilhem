/*----------------------------------------Import user info-------------------------------------------*/

const aProposImageWrapper = document.querySelector("#a-propos-right-wrapper")
const aProposParagraph = document.querySelector("#a-propos-paragraph-wrapper")

const requestUser = async () => {
    const locationApi = "https://portfolio-guilhem.herokuapp.com/"
    //const locationApi = "http://localhost:3000/"

    const response = await axios.get(`${locationApi}getUser`)

    try {
        console.log(response.data)
        const datas = response.data
        aProposParagraph.innerHTML += `<p id="a-propos-paragraph">${datas.bio}</p>`
        aProposImageWrapper.innerHTML = `<img src="${datas.avatar_url}" alt="image" class="a-propos-image">`
    } catch (err) {
        console.log(err)
    }
}


requestUser()