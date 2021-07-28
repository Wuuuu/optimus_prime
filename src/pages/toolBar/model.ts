import type { Effect, Reducer } from 'umi';
import { message } from 'antd';
import type { ToolBarEditState, componentDataProps } from './data.d';
// import { fakeSubmitForm } from './service';
import produce from 'immer';
import _findIndex from 'lodash/findIndex';

export interface ModelType {
  namespace: string;
  state: ToolBarEditState;
  effects: {
    updateComponetData: Effect;
    setClickComponentStatus: Effect;
    setCurComponent: Effect;
    updateData: Effect;
  };
  reducers: {
    save: Reducer<ToolBarEditState>;
  };
}

const initState = {
  componentData: [],
  curComponent: null,
  curComponentIndex: null,
  isClickComponent: false,
};

const Model: ModelType = {
  namespace: 'toolBarEditData',

  state: initState,

  effects: {
    *updateComponetData({ payload }, { put, select }) {
      const componentData: componentDataProps[] = yield select(
        (state: { toolBarEditData: { componentData: componentDataProps[] } }) =>
          state.toolBarEditData.componentData,
      );
      const newList = [payload || [], ...componentData];
      yield put({
        type: 'save',
        payload: {
          componentData: newList,
        },
      });
      message.success('添加成功~');
    },

    *setClickComponentStatus({ payload }, { put }) {
      yield put({
        type: 'save',
        payload: {
          isClickComponent: payload,
        },
      });
    },

    *setCurComponent({ payload }, { put }) {
      yield put({
        type: 'save',
        payload: {
          curComponent: payload,
        },
      });
    },

    *updateData({ payload }, { put, select }) {
      const { componentData, curComponent } = yield select(
        (state: { toolBarEditData: { componentData: componentDataProps[] } }) =>
          state.toolBarEditData,
      );
      const newList = componentData.map((item: componentDataProps) => {
        const newItem = { ...item };
        if (item.uuid === curComponent.uuid) {
          return { ...newItem, style: payload };
        }
        return newItem;
      });
      console.log(newList);

      yield put({
        type: 'save',
        payload: {
          curComponent: { ...curComponent, style: payload },
          componentData: newList,
        },
      });
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
