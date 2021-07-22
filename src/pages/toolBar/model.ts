import type { Effect, Reducer } from 'umi';
import { message } from 'antd';
import type { ToolBarEditState, componentDataProps } from './data.d';
// import { fakeSubmitForm } from './service';

export interface ModelType {
  namespace: string;
  state: ToolBarEditState;
  effects: {
    updateComponetData: Effect;
  };
  reducers: {
    save: Reducer<ToolBarEditState>;
  };
}

const initState = {
  componentData: [],
};

const Model: ModelType = {
  namespace: 'toolBarEditData',

  state: initState,

  effects: {
    *updateComponetData({ payload }, { put, select }) {
      const componentData: componentDataProps[] = yield select(
        (state: { toolBarEditData: { componentData: componentDataProps[] } }) => state.toolBarEditData.componentData,
        );
        const newList = [payload || [], ...componentData]
      yield put({
        type: 'save',
        payload: {
          componentData: newList,
        },
      });
      message.success('添加成功~');
    },
  },

  reducers: {
    save(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
  },
};

export default Model;
