let baseScale = 1
let userScale = 1

window.onload = function () {
    const today = new Date()
    const dd = String(today.getDate()).padStart(2, "0")
    const mm = String(today.getMonth() + 1).padStart(2, "0")
    const yyyy = today.getFullYear()

    const formatted = `TIN TỨC: ${dd}/${mm}/${yyyy}`
    document.getElementById("dateInput").value = formatted
    document.getElementById("dateText").innerText = formatted
}

document.getElementById("dateInput").addEventListener("input", function () {
    document.getElementById("dateText").innerText = this.value.toUpperCase()
})

function setLogo(n){
    document.getElementById("logo").src = `assets/logo${n}.png`
}

function renderTitle(){
    const input = document.getElementById("titleInput")
    const output = document.getElementById("titleOutput")

    output.innerHTML = input.innerHTML

    output.querySelectorAll("o\\:p").forEach(el => el.remove())

    output.querySelectorAll("*").forEach(el => {
        const style = window.getComputedStyle(el)

        if(style.backgroundColor !== "rgba(0, 0, 0, 0)" &&
           style.backgroundColor !== "transparent"){
            el.style.color = "yellow"
            el.style.backgroundColor = "transparent"
        }

        el.style.fontFamily = "'UTM Avo Bold'"
    })

    splitLines(output)
    scaleTitle(output)
}

function splitLines(container){
    const html = container.innerHTML
    const lines = html.split(/<br\s*\/?>/i)

    container.innerHTML = ""

    lines.forEach(line => {
        const clean = line
            .replace(/&nbsp;/g,"")
            .replace(/<p[^>]*>/gi,"")
            .replace(/<\/p>/gi,"")
            .trim()

        if(clean !== ""){
            const div = document.createElement("div")
            div.innerHTML = clean
            container.appendChild(div)
        }
    })
}

function scaleTitle(container){
    const maxWidth = 1080 - 160
    let longestWidth = 0

    container.querySelectorAll("div").forEach(div => {
        const width = div.scrollWidth
        if(width > longestWidth){
            longestWidth = width
        }
    })

    if(longestWidth === 0) return

    baseScale = maxWidth / longestWidth
    applyFinalScale()
}

function applyFinalScale(){
    const container = document.getElementById("titleOutput")
    const finalScale = baseScale * userScale
    container.style.transform = `scale(${finalScale})`
}

document.getElementById("titleZoom").addEventListener("input", function(){
    userScale = parseFloat(this.value) || 1
    applyFinalScale()
})

document.getElementById("lineHeightControl").addEventListener("input", function(){
    const container = document.getElementById("titleOutput")
    container.style.lineHeight = this.value
})

function exportPNG(){
    const frame = document.getElementById("frame")

    html2canvas(frame,{
        scale:2,
        backgroundColor:null,
        useCORS:true
    }).then(canvas=>{
        const link = document.createElement("a")
        link.download = `tin-nhanh-${Date.now()}.png`
        link.href = canvas.toDataURL("image/png")
        link.click()
    })
}
