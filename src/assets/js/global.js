import {
	notification
} from 'ant-design-vue' //引入
notification.config({ //写配置//一些参你也可以配置到动态的，看个人需要
	placement: 'topRight',
	top: '50px',
	duration: 3,
});

function toast(tit, type = 'info', cont = '') {
	//默认info类型通知，可传success/error/warning/warn/open/close/destroy
	notification[type]({
		message: tit,
		description: cont,
	});
}



export default {
	toast,
}
