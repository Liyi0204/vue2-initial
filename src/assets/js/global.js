import {
	notification
} from 'ant-design-vue' 


//弹窗配置
notification.config({ 
	placement: 'topRight',
	top: '50px',
	duration: 3,
});

function toast(tit, type = 'info', cont = '') {
	notification[type]({
		message: tit,
		description: cont,
	});
}



export default {
	toast,
}
