import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

var Api = process.env.REACT_APP_SERVER + "/api/";
interface Token {
  id: number;
  label: string;
  token: string;
}
interface TokenState {
  AllToken: [Token] | [];
  ActiveTokenId: number | null;
  Pending: Boolean;
}

export const TokenGetter = createAsyncThunk(
  "token/get",
  async (value, { dispatch }) => {
    return axios.get(Api + "token").then((value) => {
      return value.data;
    });
  },
  {
    condition: (force: boolean | void, { getState }): boolean => {
      var test = getState();
      if ((test as any).Token.AllToken.length !== 0) return false;
      return true;
    },
  }
);
export const TokenCreate = createAsyncThunk(
  "token/post",
  async ({ label, token }: any, { dispatch }) => {
    return axios
      .post(Api + "token", {
        label: label,
        token: token,
      })
      .then((res) => {
        return res.data;
      });
  },
  {
    condition: (force: boolean | void, { getState }): boolean => {
      var { Token }: any = getState();
      if ((Token as TokenState).Pending === true) {
        return false;
      }
      return true;
    },
  }
);
export const TokenDelete = createAsyncThunk(
  "token/Delete",
  async (id: any, { dispatch }) => {
    return axios.delete(`${Api}token/${id}`).then((res) => {
      return res.data;
    });
  },
  {
    condition: (force: boolean | void, { getState }): boolean => {
      var { Token }: any = getState();
      if ((Token as TokenState).Pending === true) {
        return false;
      }
      return true;
    },
  }
);

export const TokenActivate = createAsyncThunk(
  "token/Activate",
  async (id: any, { dispatch }) => {
    return axios
      .post(`${Api}bot/start`, {
        id: id,
      })
      .then((res) => {
        dispatch(TokenGetter());
        return res.data;
      });
  },
  {
    condition: (force: boolean | void, { getState }): boolean => {
      var { Token }: any = getState();
      if ((Token as TokenState).Pending === true) {
        return false;
      }
      return true;
    },
  }
);
export const TokenDeactivate = createAsyncThunk(
  "token/Deactivate",
  async (id: any, { dispatch }) => {
    return axios.post(`${Api}bot/stop`).then((res) => {
      dispatch(TokenGetter());
      return res.data;
    });
  },
  {
    condition: (force: boolean | void, { getState }): boolean => {
      var { Token }: any = getState();
      if ((Token as TokenState).Pending === true) {
        return false;
      }
      return true;
    },
  }
);

const initialState = {
  AllToken: [],
  ActiveTokenId: null,
  Pending: false,
} as TokenState;

const TokenSlicer = createSlice({
  name: "Token",
  initialState,
  reducers: {
    setActiveTokenId: (state, action: PayloadAction<number>) => {
      state.ActiveTokenId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(TokenGetter.rejected, (state) => {
        state.Pending = false;
      })
      .addCase(TokenGetter.pending, (state) => {
        state.Pending = true;
      })
      .addCase(TokenGetter.fulfilled, (state, action) => {
        state.Pending = false;
        state.AllToken = action.payload;
      })
      .addCase(TokenCreate.pending, (state) => {
        state.Pending = true;
      })
      .addCase(TokenCreate.rejected, (state) => {
        state.Pending = false;
      })
      .addCase(TokenCreate.fulfilled, (state, Action) => {
        state.Pending = false;
        state.AllToken= Action.payload
      })
      .addCase(TokenDelete.fulfilled, (state, {payload}) => {
        state.AllToken= payload
      })
      .addCase(TokenActivate.pending, (state) => {
        state.Pending = true;
      })
      .addCase(TokenActivate.rejected, (state) => {
        state.Pending = false;
      })
      .addCase(TokenActivate.fulfilled, (state, Action) => {
        state.Pending = false;
        console.log(Action.payload);
      })
      .addCase(TokenDeactivate.pending, (state) => {
        state.Pending = true;
      })
      .addCase(TokenDeactivate.rejected, (state) => {
        state.Pending = false;
      })
      .addCase(TokenDeactivate.fulfilled, (state, Action) => {
        state.Pending = false;
        console.log(Action.payload);
      });
  },
});

export const { setActiveTokenId } = TokenSlicer.actions;
export default TokenSlicer.reducer;
