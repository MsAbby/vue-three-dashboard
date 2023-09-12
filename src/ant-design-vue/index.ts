import { Layout, Menu, Button, TimePicker, Form, Input, Checkbox } from "ant-design-vue";

const components = [Layout, Menu, Button, TimePicker, Form, Input, Checkbox];

export default function setupAtnd(app: any) {
	components.forEach((component) => {
		app.use(component);
	});
}
