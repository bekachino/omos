import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosApi from "../axiosApi";
import { isAxiosError } from "axios";

// получает список товаров. использует пагинацию
export const getTroubles = createAsyncThunk("data/getTroubles", async (data, {
  rejectWithValue
}) => {
  try {
    const response = await axiosApi(``);
    return response.data;
  } catch (e) {
    if (isAxiosError(e) && e.response && e.response.status === 400) {
      return rejectWithValue(e.response.data);
    }
    throw e;
  }
});

export const getGood = createAsyncThunk("data/getGood", async (id, { rejectWithValue }) => {
  try {
    const response = await axiosApi(`goods/${id}`);
    return response.data?.[0];
  } catch (e) {
    if (isAxiosError(e) && e.response && e.response.status === 404) {
      return rejectWithValue('Товар не найден');
    }
    throw e;
  }
});

// запрос на создание товара
export const createGood = createAsyncThunk('data/createGood', async (data, { rejectWithValue }) => {
  try {
    const createItemForm = {
      product_manufacture_id: data?.product_manufacture_id,
      product_model_id: data?.product_model_id,
      cost: Number(data?.cost),
    };
    const createGoodForm = new FormData();
    
    const reqToModel = await axiosApi.post(`${data.product_type}/`, createItemForm);
    const resFromModel = await reqToModel.data;
    
    createGoodForm.append('nazvanie_id', resFromModel?.id);
    createGoodForm.append('barcode', data?.barcode);
    createGoodForm.append('good_status_id', data?.good_status_id);
    createGoodForm.append('product_type', data?.product_type);
    if (data?.photo_path) {
      createGoodForm.append('photo_path', data.photo_path);
    }
    
    const reqToGoods = await axiosApi.post(`goods/`, createGoodForm);
    return await reqToGoods.data;
  } catch (e) {
    if (isAxiosError(e) && e.response && e.response.status === 422) {
      return rejectWithValue('Ошибка при создании товара');
    } else if (isAxiosError(e) && e.response && e.response.status === 401) {
      return rejectWithValue('Неправильные учётные данные, авторизуйтесь снова');
    } else if (isAxiosError(e) && e.response && e.response.status === 403) {
      return rejectWithValue('У вас нет прав на создание товара');
    }
    throw e;
  }
});

// запрос на редактирование товара
export const updateGood = createAsyncThunk('data/updateGood', async (data, { rejectWithValue }) => {
  try {
    const editGoodForm = new FormData();
    
    if (data.product_type_has_changed) {
      const createItemForm = {
        product_manufacture_id: data?.product_manufacture_id,
        product_model_id: data?.product_model_id,
        cost: Number(data?.cost),
      };
      const reqToModel = await axiosApi.post(`${data.product_type}/`, createItemForm);
      const resFromModel = await reqToModel.data;
      
      editGoodForm.append('nazvanie_id', resFromModel?.id);
    } else if (!data.product_type_has_changed && !data.good_data_has_changed) {
      const updateItemForm = {
        product_manufacture_id: data?.product_manufacture_id,
        product_model_id: data?.product_model_id,
        cost: Number(data?.cost),
      };
      const reqToModel = await axiosApi.put(`${data.product_type}/${data?.id}`, updateItemForm);
      const resFromModel = await reqToModel.data;
      
      editGoodForm.append('nazvanie_id', resFromModel?.id);
    } else if (!data.product_type_has_changed && !data.good_data_has_changed) {
      editGoodForm.append('nazvanie_id', data?.nazvanie_id);
    }
    editGoodForm.append('barcode', data?.barcode);
    editGoodForm.append('cost', data?.cost);
    editGoodForm.append('good_status_id', data?.good_status_id);
    editGoodForm.append('product_type', data?.product_type);
    if (data?.photo_path) {
      editGoodForm.append('photo_path', data.photo_path);
    }
    
    const reqToGoods = await axiosApi.put(`goods/${data?.id}`, editGoodForm);
    return await reqToGoods.data;
  } catch (e) {
    if (isAxiosError(e) && e.response && e.response.status === 422) {
      return rejectWithValue('Ошибка при редактировании товара');
    } else if (isAxiosError(e) && e.response && e.response.status === 401) {
      return rejectWithValue('Неправильные учётные данные, авторизуйтесь снова');
    } else if (isAxiosError(e) && e.response && e.response.status === 403) {
      return rejectWithValue('У вас нет прав на редактирование товара');
    }
    throw e;
  }
});

// получение списка производителей товаров по типу товара
export const getManufactures = createAsyncThunk('data/getManufactures', async (product_type) => {
  try {
    const req = await axiosApi(`${product_type}_manufactures/`);
    return await req.data;
  } catch (e) {
    throw e;
  }
});

// получение списка моделей товаров по типу товара
export const getModels = createAsyncThunk('data/getModels', async (product_type) => {
  try {
    const req = await axiosApi(`${product_type}_models/`);
    return await req.data;
  } catch (e) {
    throw e;
  }
});

// создание производителя товара по типу товара
export const createManufacture = createAsyncThunk('data/createManufacture', async (data, { rejectWithValue }) => {
  try {
    const req = await axiosApi.post(`${data?.product_type}_manufactures/`, { name: data?.name });
    return await req.data;
  } catch (e) {
    if (isAxiosError(e) && e.response && e.response.status === 401) {
      return rejectWithValue('Неправильные учётные данные, авторизуйтесь снова');
    } else if (isAxiosError(e) && e.response && e.response.status === 403) {
      return rejectWithValue('Нет разрешения на создание производителя товара');
    }
    throw e;
  }
});

// создание модели товара по типу товара
export const createModel = createAsyncThunk('data/createModel', async (data, { rejectWithValue }) => {
  try {
    const req = await axiosApi.post(`${data?.product_type}_models/`, { name: data?.name });
    return await req.data;
  } catch (e) {
    if (isAxiosError(e) && e.response && e.response.status === 401) {
      return rejectWithValue('Неправильные учётные данные, авторизуйтесь снова');
    } else if (isAxiosError(e) && e.response && e.response.status === 403) {
      return rejectWithValue('У вас нет разрешения на создание модели товара');
    }
    throw e;
  }
});

// удаление товара
export const deleteGood = createAsyncThunk('data/deleteGood', async (id) => {
  try {
    const reqToGoods = await axiosApi.delete(`goods/${id}`);
    return await reqToGoods.data;
  } catch (e) {
    throw e;
  }
});
