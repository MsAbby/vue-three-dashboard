import { Button, TimePicker } from 'ant-design-vue'

const components = [Button, TimePicker]

export default function setupAtnd(app: any) {
    components.forEach((component) => {
        app.use(component)
    })
}