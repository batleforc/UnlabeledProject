import { configureStore} from '@reduxjs/toolkit'
import Token from './Token'
import ShowModal from './showModal'
import Bot from './Bot'

export default configureStore({
  reducer: {
    Token,
    Bot,
    ShowModal
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  devTools:true
})