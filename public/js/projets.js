/*-------------------------------------------Projets------------------------------------------*/


const navigationWrapper = document.querySelector("#projets-navigation-wrapper")
const fullPage = document.querySelector("#fullpage")

let projectNumber = 8

for (let i = 0; i < projectNumber; i++) {

    // Navigation

    const navigation = document.createElement("div")
    navigation.classList.add("navigation")
    navigation.setAttribute("id", `navigation${i}`)
    navigationWrapper.append(navigation)

    // Section FullPage

    const section = document.createElement("section")
    section.classList.add(`section`)
    section.setAttribute("id", `section${i}`)
    const sectionLeftWrapper = document.createElement("div")
    sectionLeftWrapper.classList.add("project-left-wrapper")
    const sectionRightWrapper = document.createElement("div")
    sectionRightWrapper.classList.add("project-right-wrapper")
    const projectTitleWrapper = document.createElement("div")
    projectTitleWrapper.classList.add("project-title-wrapper")
    const projectSubtitleWrapper = document.createElement("div")
    projectSubtitleWrapper.classList.add("project-subtitle-wrapper")
    const projectParagraphWrapper = document.createElement("div")
    projectParagraphWrapper.classList.add("project-paragraph-wrapper")

    fullPage.append(section)
    section.append(sectionLeftWrapper, sectionRightWrapper)
    sectionLeftWrapper.append(projectTitleWrapper, projectSubtitleWrapper, projectParagraphWrapper)


    const requestProjects = async () => {
        const locationApi = "https://portfolio-guilhem.herokuapp.com/"
        //const locationApi = "http://localhost:3000/"

        const response = await axios.get(`${locationApi}getProjectGuilhem`)

        try {
            const datas = response.data
            datas.forEach(data => {
                let verifProject = data.description.indexOf(`Project${i}`)
                if (verifProject !== -1) {
                    navigation.innerHTML = `<img src="${data.images.normal}" alt="project" class="navigation-image ${i+1}">`
                    sectionRightWrapper.innerHTML = `<img src="${data.images.hidpi}" alt="project" class="project-image">`
                    projectTitleWrapper.innerHTML = `<h1 class="project-title">${data.title}</h1>`
                    projectSubtitleWrapper.innerHTML = `<h1 class="project-subtitle">${data.tags}</h1>`
                    projectParagraphWrapper.innerHTML = `<h4 class="project-paragraph">${data.description}</h4>`

                    if (data.title.length > 13) {
                        projectTitleWrapper.style.lineHeight = "8vh"
                        projectSubtitleWrapper.style.top = "2vh"
                    }

                }

            })
        } catch (err) {
            console.log(err)
        }
    }
    requestProjects()
}

/*-------------------------------------------Full Page------------------------------------------*/

new fullpage("#fullpage", {
    autoScrolling: true,
    scrollingSpeed: 700,
    onLeave: (origin, destination, direction) => {
        //const section = destination.item
        //console.log(destination.item)
        //const text = section.querySelector('.presentationS1')
        //const image = section.querySelector('.imgPresentationS1')
        //const tl = new TimelineMax({delay: 0.75})
        //tl.fromTo(text, 0.75, {y: '50', opacity: 0}, {y: 0, opacity: 1})
        //tl.fromTo(image, 0.75, {y: '-50', opacity: 0}, {y: 0, opacity: 1})
    }
})

const changeSection = function () {

    for (let i = 0; i < projectNumber; i++) {
        const sectionTarget = document.getElementById(`section${i}`)
        const navigationTarget = document.getElementById(`navigation${i}`)


        // Change section on scroll
        if (sectionTarget.classList.contains("active")) {
            navigationTarget.classList.add("active")
        } else {
            navigationTarget.classList.remove("active")
        }

        // Change section on click
        navigationTarget.onclick = function (e){
            fullpage_api.moveTo(e.target.className[17])
        }
    }
}

setInterval(changeSection, 500)

