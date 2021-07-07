// 编辑器自定义事件
const events = {
    redirect(url) {
        if (url) {
            window.location.href = url
        }
    },
    alert(msg) {
        if (msg) {
            console.log(msg)
        }
    },
    uiAction() {
        console.log('触发了交互事件')
    },
}

const mixins = {
    methods: events,
}

const eventList = [
    // key == events[key]
    {
        key: 'uiAction',
        label: '交互事件',
        event: events.uiAction,
        param: '',
    },
    {
        key: 'redirect',
        label: '跳转事件',
        event: events.redirect,
        param: '',
    },
    {
        key: 'alert',
        label: '弹窗事件',
        event: events.alert,
        param: '',
    },
]

export {
    mixins,
    events,
    eventList,
}