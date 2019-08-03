const stateDefault = {
  scrollHeight: 100 // 被卷曲的高
}

// 应用数据
export default function appData(state = stateDefault, action) {
  state.scrollHeight = action.scrollHeight || state.scrollHeight;
  return state
}