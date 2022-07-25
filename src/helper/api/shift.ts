import { getAxiosInstance } from ".";

export const getShifts = async (startDate: string, endDate: string) => {
  const api = getAxiosInstance();
  const { data } = await api.get(
    `/shifts?startDate=${startDate}&endDate=${endDate}&order[date]=DESC&order[startTime]=ASC`
  );
  return data;
};

export const getShiftById = async (id: string) => {
  const api = getAxiosInstance();
  const { data } = await api.get(`/shifts/${id}`);
  return data;
};

export const createShifts = async (payload: any) => {
  const api = getAxiosInstance();
  const { data } = await api.post("/shifts", payload);
  return data;
};

export const updateShiftById = async (id: string, payload: any) => {
  const api = getAxiosInstance();
  const { data } = await api.patch(`/shifts/${id}`, payload);
  return data;
};

export const deleteShiftById = async (id: string) => {
  const api = getAxiosInstance();
  const { data } = await api.delete(`/shifts/${id}`);
  return data;
};

export const publish = async (startDate: string, endDate: string) => {
  const api = getAxiosInstance();
  const { data } = await api.post(`/publish-week`, {startDate, endDate});
  return data;
}; 

export const checkPublish = async (startDate: string, endDate: string) => {
  const api = getAxiosInstance();
  const { data } = await api.post(`/publish-week/check-publish`, {startDate, endDate});
  return data;
};

