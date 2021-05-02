/*----------------------------------------Import projects info-------------------------------------------*/

const aProposImageWrapper = document.querySelector("#a-propos-right-wrapper")
const aProposParagraph = document.querySelector("#a-propos-paragraph-wrapper")

const requestProjects = async () => {
    const locationApi = "https://portfolio-guilhem.herokuapp.com/"
    //const locationApi = "http://localhost:3000/"

    const response = await axios.get(`${locationApi}getProjectGuilhem`)

    try {
        const datas = response.data

        datas.forEach(data => {

            let verifUserImage = data.title.indexOf("Profil")
            if (verifUserImage !== -1) {
                aProposImageWrapper.innerHTML = `<img src="${data.images.hidpi}" alt="image" class="a-propos-image">`
                aProposParagraph.innerHTML = `<div id="a-propos-paragraph">${data.description}</div>`
            }
        })
    } catch (err) {
        console.log(err)
    }
}

requestProjects()