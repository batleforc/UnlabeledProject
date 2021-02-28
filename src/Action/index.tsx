import { configureStore} from '@reduxjs/toolkit'
import Token from './Token'
import ShowModal from './showModal'
import Bot from './Bot'
import Event from './Event'

export default configureStore({
  reducer: {
    Token,
    Bot,
    ShowModal,
    Event
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  devTools:true
})