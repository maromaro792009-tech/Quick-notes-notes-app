const addBtn = document.querySelector(".add")
const settings = document.querySelector(".settings")
const write = document.querySelector(".write")
const btn = document.querySelector(".btn")
const titleInput = document.querySelector(".title-input")
const contentInput = document.querySelector(".content-input")
const noteArea = document.querySelector(".note-area")
const deleteArea = document.querySelector(".delete-area")
const fontBox = document.querySelector(".font-box")
const write2 = document.querySelector(".write2")
let notes = JSON.parse(localStorage.getItem("notes")) || []
let fontValue = localStorage.getItem("fontData") || 2


let inpt = [titleInput, contentInput]
if (fontValue) {
    fontBox.dataset.id = fontValue
}


inpt.forEach(part => {
    part.classList.remove("font1", "font2", "font3", "font4", "font5", "font6")
    part.classList.add(`font${fontBox.dataset.id}`)
})

notes.forEach(note => {
    noteUI(note)
})

const settingsBar = document.querySelector(".settings-bar")
addBtn.addEventListener("click", () => {
    write.classList.toggle("appear")
    settingsBar.classList.remove("open")
    write2.classList.remove("show2")
})

settings.addEventListener("click", () => {
    settingsBar.classList.toggle("open")
    write.classList.remove("appear")
})
const switchbtn = document.querySelector(".switch")
const switchbtn2 = document.querySelector(".switch2")
if (localStorage.getItem("dark") === "val1") {
    switchbtn.classList.add("active")
    document.body.classList.add("dark")
}
if (localStorage.getItem("select") === "val2") {
    switchbtn2.classList.add("active2")
    document.body.classList.add("select")
}

settingsBar.addEventListener("click", (e) => {
    if (e.target.closest(".switch")) {
        e.target.closest(".switch").classList.toggle("active")
        document.body.classList.toggle("dark")
        if (document.body.classList.contains("dark")) {
            localStorage.setItem("dark", "val1")
        } else {
            localStorage.removeItem("dark")
        }
    }
    if (e.target.closest(".switch2")) {
         e.target.closest(".switch2").classList.toggle("active2")
         document.body.classList.toggle("select")
         if (document.body.classList.contains("select")) {
            localStorage.setItem("select", "val2")
        } else {
            localStorage.removeItem("select")
        }
    }
})
document.body.addEventListener("click", (e) => {
    if (!e.target.closest(".settings-bar") && !e.target.closest(".settings")) {
        settingsBar.classList.remove("open")
    }
})

const search = document.querySelector(".search-filter")
const search2 = document.querySelector(".search-filter2")

function togglePin(id) {
  let index = notes.findIndex((n) => n.id === id)
  if (index === -1) return

  notes[index].pinned = !notes[index].pinned
  const item = notes.splice(index, 1)[0]

  if (item.pinned) {
    const lastPinned = notes.reduce((acc, n, i) => (n.pinned ? i : acc), -1)
    notes.splice(lastPinned + 1, 0, item)
  } else {
    notes.push(item)
  }
}

function noteUI(newNote) {
    const note = document.createElement("div")
    const title = document.createElement("div")
    const content = document.createElement("div")
    const editArea = document.createElement("div")
    const deleteArea = document.createElement("div")
    const pin = document.createElement("div")
    const dateArea = document.createElement("div")
    dateArea.classList.add("date")
    note.classList.add("note")
    title.classList.add("title")
    content.classList.add("content")
    editArea.classList.add("edit-area")
    deleteArea.classList.add("delete-area")
    title.textContent = newNote.title
    content.textContent = newNote.content
    title.classList.add(`font${newNote.font}`)
    content.classList.add(`font${newNote.font}`)
    editArea.innerHTML = '<svg class="edit" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free v7.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path d="M505 122.9L517.1 135C526.5 144.4 526.5 159.6 517.1 168.9L488 198.1L441.9 152L471 122.9C480.4 113.5 495.6 113.5 504.9 122.9zM273.8 320.2L408 185.9L454.1 232L319.8 366.2C316.9 369.1 313.3 371.2 309.4 372.3L250.9 389L267.6 330.5C268.7 326.6 270.8 323 273.7 320.1zM437.1 89L239.8 286.2C231.1 294.9 224.8 305.6 221.5 317.3L192.9 417.3C190.5 425.7 192.8 434.7 199 440.9C205.2 447.1 214.2 449.4 222.6 447L322.6 418.4C334.4 415 345.1 408.7 353.7 400.1L551 202.9C579.1 174.8 579.1 129.2 551 101.1L538.9 89C510.8 60.9 465.2 60.9 437.1 89zM152 128C103.4 128 64 167.4 64 216L64 488C64 536.6 103.4 576 152 576L424 576C472.6 576 512 536.6 512 488L512 376C512 362.7 501.3 352 488 352C474.7 352 464 362.7 464 376L464 488C464 510.1 446.1 528 424 528L152 528C129.9 528 112 510.1 112 488L112 216C112 193.9 129.9 176 152 176L264 176C277.3 176 288 165.3 288 152C288 138.7 277.3 128 264 128L152 128z"/></svg>'
    deleteArea.innerHTML = '<svg class="remove" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free v7.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path d="M262.2 48C248.9 48 236.9 56.3 232.2 68.8L216 112L120 112C106.7 112 96 122.7 96 136C96 149.3 106.7 160 120 160L520 160C533.3 160 544 149.3 544 136C544 122.7 533.3 112 520 112L424 112L407.8 68.8C403.1 56.3 391.2 48 377.8 48L262.2 48zM128 208L128 512C128 547.3 156.7 576 192 576L448 576C483.3 576 512 547.3 512 512L512 208L464 208L464 512C464 520.8 456.8 528 448 528L192 528C183.2 528 176 520.8 176 512L176 208L128 208zM288 280C288 266.7 277.3 256 264 256C250.7 256 240 266.7 240 280L240 456C240 469.3 250.7 480 264 480C277.3 480 288 469.3 288 456L288 280zM400 280C400 266.7 389.3 256 376 256C362.7 256 352 266.7 352 280L352 456C352 469.3 362.7 480 376 480C389.3 480 400 469.3 400 456L400 280z"/></svg>'
    note.addEventListener("dblclick", () => {
        note.classList.toggle("zoom")
    })
    
    note.dataset.id = newNote.id
    note.dataset.date = newNote.date
    dateArea.textContent = note.dataset.date
    if (newNote.selected) {
        pin.innerHTML = '<svg class="pin-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free v7.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path d="M160 96C160 78.3 174.3 64 192 64L448 64C465.7 64 480 78.3 480 96C480 113.7 465.7 128 448 128L418.5 128L428.8 262.1C465.9 283.3 494.6 318.5 507 361.8L510.8 375.2C513.6 384.9 511.6 395.2 505.6 403.3C499.6 411.4 490 416 480 416L160 416C150 416 140.5 411.3 134.5 403.3C128.5 395.3 126.5 384.9 129.3 375.2L133 361.8C145.4 318.5 174 283.3 211.2 262.1L221.5 128L192 128C174.3 128 160 113.7 160 96zM288 464L352 464L352 576C352 593.7 337.7 608 320 608C302.3 608 288 593.7 288 576L288 464z"/></svg>'
        pin.classList.add("pin")
    }
    note.append(title, content, editArea, deleteArea, pin, dateArea)
    noteArea.append(note)
}


fontBox.addEventListener("click", (e) => {
    if (e.target.closest('[data-type="1"]')) {
        fontBox.dataset.id = 1
        inpt.forEach(part => {
        part.classList.remove("font1", "font2", "font3", "font4", "font5", "font6")
        part.classList.add(`font${fontBox.dataset.id}`)
        })
        localStorage.setItem("fontData", fontBox.dataset.id)
    } if (e.target.closest('[data-type="2"]')) {
        fontBox.dataset.id = 2
        inpt.forEach(part => {
        part.classList.remove("font1", "font2", "font3", "font4", "font5", "font6")
        part.classList.add(`font${fontBox.dataset.id}`)
        })
        localStorage.setItem("fontData", fontBox.dataset.id)
    } if (e.target.closest('[data-type="3"]')) {
        fontBox.dataset.id = 3
        inpt.forEach(part => {
        part.classList.remove("font1", "font2", "font3", "font4", "font5", "font6")
        part.classList.add(`font${fontBox.dataset.id}`)
        })
        localStorage.setItem("fontData", fontBox.dataset.id)
    } if (e.target.closest('[data-type="4"]')) {
        fontBox.dataset.id = 4
        inpt.forEach(part => {
        part.classList.remove("font1", "font2", "font3", "font4", "font5", "font6")
        part.classList.add(`font${fontBox.dataset.id}`)
        })
        localStorage.setItem("fontData", fontBox.dataset.id)
    } if (e.target.closest('[data-type="5"]')) {
        fontBox.dataset.id = 5
        inpt.forEach(part => {
        part.classList.remove("font1", "font2", "font3", "font4", "font5", "font6")
        part.classList.add(`font${fontBox.dataset.id}`)
        })
        localStorage.setItem("fontData", fontBox.dataset.id)
    } if (e.target.closest('[data-type="6"]')) {
        fontBox.dataset.id = 6
        inpt.forEach(part => {
        part.classList.remove("font1", "font2", "font3", "font4", "font5", "font6")
        part.classList.add(`font${fontBox.dataset.id}`)
        })
        localStorage.setItem("fontData", fontBox.dataset.id)
    }
})

let searches = [search, search2]
searches.forEach(searching => {
searching.addEventListener("input", () => {
    const match = notes.filter(value => value.title.toLowerCase().includes(search.value.toLowerCase() || search2.value.toLowerCase()))
    noteArea.innerHTML = ""
    match.forEach(data => {
        noteUI(data)
    })
 })
})
let hold


function dateCreated() {
    let date = new Date()
    let t = {
        year: date.getFullYear(),
        month: date.getMonth(),
        day: date.getDate(),
        hour: date.getHours(),
        minute: date.getMinutes()
    }
    let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    let daytime
    t.hour <= 11 ? daytime="AM" : daytime="PM"
    if (t.hour >= 13) {
        t.hour -= 12
    } else if (t.hour == 0) {
        t.hour = 12
    }
    if (t.minute <= 9) {
        t.minute = `0${t.minute}`
    }
    let time = `${months[t.month]} ${t.day}, ${t.year} ${t.hour}:${t.minute} ${daytime}`
    return `${time}`
}

function pinning(noteHold) {
    hold = setTimeout(() => {
        noteArea.innerHTML = ""
        const id = Number(noteHold.dataset.id)
        const index = notes.findIndex(note => note.id === id)
        notes[index].selected = !notes[index].selected
        togglePin(id)
        notes.forEach(note => {
        noteUI(note)
    })
    localStorage.setItem("notes", JSON.stringify(notes))
     }, 1500)
}

noteArea.addEventListener("mousedown", (e) => {
    let edit = e.target.closest(".edit")
    let removeBtn = e.target.closest(".remove")
    let noteHold = e.target.closest(".note")
    if (edit) {
    let closeNote = edit.closest(".note")
    const noteTitle = closeNote.querySelector(".title")
    const noteContent = closeNote.querySelector(".content")
    const id = Number(closeNote.dataset.id)
    const index = notes.findIndex(note => note.id === id)
    let editing = noteTitle.contentEditable === "true"
        if (!editing) {
            noteTitle.contentEditable = true
            noteContent.contentEditable = true
        } else {
            notes[index].lastedit = true
            noteTitle.contentEditable = false
            noteContent.contentEditable = false
            notes[index].title = noteTitle.textContent
            notes[index].content = noteContent.textContent
            localStorage.setItem("notes", JSON.stringify(notes))
        }
    } if (removeBtn) {
        let closeNote = removeBtn.closest(".note")
        const id = Number(closeNote.dataset.id)
        const index = notes.findIndex(note => note.id === id)
        notes.splice(index, 1)
        localStorage.setItem("notes", JSON.stringify(notes))
        closeNote.remove()
    } if (noteHold && !noteHold.classList.contains("zoom")) {
        pinning(noteHold)
    }
})

noteArea.addEventListener("touchstart", (e) => {
    let noteHold = e.target.closest(".note")
    if (noteHold && !noteHold.classList.contains("zoom")) {
        pinning(noteHold)
    }
})

noteArea.addEventListener("touchend", () => {
    clearTimeout(hold)
    hold = null
})
noteArea.addEventListener("touchcancel", () => {
    clearTimeout(hold)
    hold = null
})
noteArea.addEventListener("mouseup", () => {
    clearTimeout(hold)
    hold = null
})
noteArea.addEventListener("mouseleave", () => {
    clearTimeout(hold)
    hold = null
})

btn.addEventListener("click", () => {
    if (titleInput.value.trim() === "" || contentInput.value.trim() === "") return
    let newNote = {
        title: titleInput.value,
        content: contentInput.value,
        id: Date.now(),
        pinned: false,
        selected: false,
        date: dateCreated(),
        font: fontBox.dataset.id
    }
    write.classList.remove("appear")
    titleInput.value = ""
    contentInput.value = ""
    notes.push(newNote)
    noteUI(newNote)
    localStorage.setItem("notes", JSON.stringify(notes))
})
const notif = document.querySelector(".notif")
 if (noteArea.children.length == 0) {
        notif.classList.add("exist")
}
const observer = new MutationObserver(() => {
    if (noteArea.children.length == 0) {
        notif.classList.add("exist")
    } else {
        notif.classList.remove("exist")
    }
})
observer.observe(noteArea, {
    subtree: true,
    childList: true
})
const fontBtn = document.querySelector(".font-btn")
const fontArea = document.querySelector(".font-area")
fontBtn.addEventListener("click", () => {
    write2.classList.toggle("show2")
})
function relocate() {
    if (window.innerWidth <= 1000) {
        write2.append(fontArea)
    } else {
        write.append(fontArea)
        write2.classList.remove("show2")
    }
}
window.addEventListener("resize", relocate)
relocate()
