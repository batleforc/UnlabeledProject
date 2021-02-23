import { configureStore} from '@reduxjs/toolkit'
import Token from './Token'

export default configureStore({
  reducer: {
    Token
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  devTools:true
})