import api from '@/plugins/axios' 
import {Satellites} from '@/utils/types/services'
import { buildQueryParams } from '@/utils/globalMethods';

export const getSatellites = (filters: Record<string, any> = {}) => {
  const query = buildQueryParams(filters);
  return new Promise<Satellites[]>((resolve, reject) => {
    api.get(`/satellites${query.length ? `?${query}` : ''}`)
      .then(({data}) => {
        resolve(data.data); 
      })
      .catch((error) => {
        reject(error);
      });
  });
};
