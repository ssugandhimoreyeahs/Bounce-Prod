// const initialState = {
// 	login: new Object(),
// };

// function rootReducer(state = initialState, action) {
// 	console.log('data : ', action);
// 	switch (action.type) {
// 		case 'LOGIN': {
// 			console.log('LOGIN : ', action.payload[0], action.payload[1]);
// 			state.login[action.payload[0]] = action.payload[1];
// 			return {
// 				login: state.login,
// 				profile: state.profile,
// 				personalinfo: state.personalinfo,
// 				communicationinfo: state.communicationinfo,
// 				qualificationinfo: state.qualificationinfo,
// 				listplan: state.listplan,
// 				projectinfo: state.projectinfo
// 			};
// 			break;
// 		}

// 		default:
// 			return state;
// 	}
// }
// export default rootReducer;
