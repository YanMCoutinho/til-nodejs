const ul = document.querySelector("ul")
const input = document.querySelector("input")
const form = document.querySelector('form')

async function load() {
    const res = await fetch("http://localhost:3000/")
        .then((data) => data.json())
    res.urls.map(url => addElement(url))
}

async function removeData(url, name, el) {
    const urlWithoutSlash = url.slice(0, -1)
    const res = await fetch(`http://localhost:3000/?name=${name}&url=${urlWithoutSlash}&del=1`)
        .then((data) => data.json())

    if(res.message) {
        if (String(res.message) === "ok") {
            removeElement(el)
        } else {
            alert('Ocorreu algum erro')
        }
    }
}

async function addData({ name, url }) {
    const res = await fetch(`http://localhost:3000/?name=${name}&url=${url}`)
        .then((data) => data.json())
    
    if(res.message) {
        if (String(res.message) === "ok") {
            addElement({ name, url })
        } else {
            alert('Ocorreu algum erro')
        }
    }
}

load()

function addElement({ name, url }) {
    const li = document.createElement('li')
    const a = document.createElement("a")
    const trash = document.createElement("span")

    a.href = url
    a.innerHTML = name
    a.target = "_blank"

    trash.innerHTML = "x"
    trash.onclick = () => removeData(a.href, a.innerHTML, trash)

    li.append(a)
    li.append(trash)
    ul.append(li)
}

function removeElement(el) {
    if (confirm('Tem certeza que deseja deletar?'))
        el.parentNode.remove()
}

form.addEventListener("submit", (event) => {
    event.preventDefault();

    let { value } = input

    if (!value) 
        return alert('Preencha o campo')

    const [name, url] = value.split(",")

    if (!url) 
        return alert('formate o texto da maneira correta')

    if (!/^http/.test(url)) 
        return alert("Digite a url da maneira correta")

    addData({ name, url })

    input.value = ""
})