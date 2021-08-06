import componentList from '@/custom-component/component-list'
import { deepCopy } from '@/utils/utils'
import generateID from '@/utils/generateID'
import Store from '../store'

export default function psdFormatteToJson(psdJson) {
    // console.log(psdJson)
    console.log(componentList)
    if (psdJson.document) {
        setCanvas(psdJson.document)
    }
    psdJson.children.forEach(item => {
        // console.log(item)
        if (item.type === 'layer') {
            console.log(item)
            pushComponent(item, 'div')
        }
    })
}

function pushComponent(psdNode, elementName) {
    const _component = componentList.filter(item => item.formatte === elementName)
    const component = deepCopy(_component[0])
    component.style.top = psdNode.top
    component.style.left = psdNode.left
    component.style.width = psdNode.width
    component.style.height = psdNode.height
    component.style.opacity = psdNode.opacity
    if (psdNode.text) {
        component.propValue = psdNode.text.value
    }
    component.id = generateID()
    Store.commit('addComponent', { component })
}

function setCanvas(document) {
    Store.commit('setCanvasStyle', {
        ...Store.state.canvasStyleData,
        width: document.width,
        height: document.height,
    })
}