
import * as antIcons from '@ant-design/icons-vue'
import {
	Avatar,
	Button,
	Dropdown,
	Form,
	Layout,
	Menu,
	TimePicker,
	DatePicker,
	Input,
	Checkbox,
	Select,
	Radio,
	Upload,
	Spin,
	Row,
	Col,
	Modal,
	Table,
	Popconfirm,
	Popover,
	Tooltip,
	Breadcrumb,
	Tabs,
	Divider,
	ConfigProvider,
	Result,
	Card,
	TreeSelect
} from "ant-design-vue";


const components = [
	Avatar,
	Button,
	Dropdown,
	Form,
	Layout,
	Menu,
	TimePicker,
	DatePicker,
	Input,
	Checkbox,
	Select,
	Radio,
	Upload,
	Spin,
	Row,
	Col,
	Modal,
	Table,
	Popconfirm,
	Popover,
	Tooltip,
	Breadcrumb,
	Tabs,
	Divider,
	ConfigProvider,
	Result,
	Card,
	TreeSelect
];

export default function setupAtnd(app: any) {
	components.forEach((component) => {
		app.use(component);
	});
	// 将antDesign图标库的所有图标，每个都注册成组件
	
	Object.keys(antIcons).forEach(key => {
		app.component(key, antIcons[key])
	})
}
