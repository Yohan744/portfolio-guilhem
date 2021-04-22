/*----------------------------------------------Cursor-------------------------------------------*/

const cursor = document.querySelector("#cursor")

const cursorFunction = (function () {

    const editCursor = e => {
        const { clientX: x, clientY: y } = e
        cursor.style.left = x + "px"
        cursor.style.top = y + "px"
    }

    window.addEventListener('mousemove', editCursor)
})

cursorFunction()

/*----------------------------------------------Menu---------------------------------------------*/

const menuBtn = document.querySelector('#menu-btn')
const menuBtnActive = document.querySelector("#menu-btn-active")

const menu = document.querySelector("#menu")
const menuFunction = (function () {

    const cursorMenu = document.querySelector("#cursorMenu")
    cursorMenu.style.display = "block"

    const animateIt = function (e) {
        const navSpan = this.querySelector('.navSpan')
        const { offsetX: x, offsetY: y } = e,
            {offsetWidth: width } = this,

            move = 25,
            xMove = x / width * (move * 2) - move,
            yMove = y / width * (move * 2) - move

        navSpan.style.transform = `translate(${xMove}px, ${yMove}px)`

        if (e.type === 'mouseleave') navSpan.style.transform = ''
    }

    const editCursorMenu = e => {
        const { clientX: x, clientY: y } = e
        cursorMenu.style.left = x + "px"
        cursorMenu.style.top = y + "px"
    }

    navLink.forEach(b => b.addEventListener('mousemove', animateIt))
    navLink.forEach(b => b.addEventListener('mouseleave', animateIt))
    window.addEventListener('mousemove', editCursorMenu)

})
let menuOpen = false

const navLink = document.querySelectorAll(".navLink")

menuBtn.onclick = () => {

    const tlMenuList = new TimelineLite()

    if (menuOpen === false) {
        menuBtn.classList.add('open')
        menuBtnActive.classList.add('active')
        menu.classList.add('activeList')
        menuOpen = true
        cursor.style.display = "none"
        menuFunction()
        tlMenuList.fromTo(menu, 0.1, { display: "none"}, { display: "block"})
        tlMenuList.fromTo(navLink, 1, { opacity: 0}, { opacity: 1, stagger: 0.3, ease: "cubic-bezier(0.84, 0, 0.08, 0.99)"})
    } else {
        tlMenuList.reverse()
        menuBtn.classList.remove('open')
        menuBtnActive.classList.remove('active')
        menu.classList.remove('activeList')
        menu.style.display = "none"
        menuOpen = false
        cursor.style.display = "block"
    }
}