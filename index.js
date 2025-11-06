const navButtons = document.querySelectorAll(".nav-btn")

function scrollToSection(sectionId){
    const section = document.getElementById(sectionId)
    if (section){
        section.scrollIntoView({
            behavior:"smooth",
            block:"start"
        })
    }
}

navButtons.forEach(button => {
    button.addEventListener("click", function(e){
        e.preventDefault();
        const sectionId = this.getAttribute("data-section");
        scrollToSection(sectionId)
    });
});

window.addEventListener("scroll",function(){
    let current = "";
    const sections = this.document.querySelectorAll("section");

    sections.forEach(section => {
        const sectionTop = section.offsetTop
        const sectionHeight = section.clientHeight
        if(pageYOffset >= (sectionTop - 100)){
            current = section.getAttribute("id")
        }
    })

    navButtons.forEach(button => {
        button.computedStyleMap.backgroundColor = ""
        if(button.getAttribute("data-section") === current){
            button.style.backgroundColor ="#555"
        }
    })
})