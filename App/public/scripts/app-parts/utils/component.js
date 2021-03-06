export default class {
    constructor(){
        this.el
    }
    create(element){
        const elParts = element
            .split('')
            .map(ltr=>{
                if(ltr === '#' || ltr === '.'){
                    return `,${ltr}`
                }
                return ltr
            })
            .join('')
            .split(',')
        if(elParts[0].includes('.')||elParts[0].includes('#')){
            alert('You cant define an id or class in front of an element')
        }else{
            this.el = document.createElement(elParts[0])
            elParts.shift()
        }
        elParts.forEach(tag =>{
            if(tag.includes('#')){
                this.el.id = tag.replace('#', '')
            }else if(tag.includes('.')){
                this.el.classList.add(tag.replace('.', ''))
            }
        })
        return this
    }
    txt(value){
        this.el.textContent = value
        return this
    }
    appendChilds(element, nodes){
        nodes.forEach(node=>{
            element.appendChild(node)
        })
    }
    insertRawHTMLText(element, texts){
        texts.forEach(txt=>{
            element.insertAdjacentHTML('beforeend', txt)
        })
    }
    attr(type, value){
        this.el.setAttribute(type, value)
        return this
    }
    removeChilds(parent){
        while (parent.firstChild) {
            parent.firstChild.remove()
        }
    }
}