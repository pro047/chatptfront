import { Instance } from '@/shared';
import { ChartSchemaType } from '../types';

export const saveChart = async (data: ChartSchemaType): Promise<number> => {
  const result = await Instance.post('/patient/chart', data);
  console.log('[savechart result] :', result);
  return result.data.id;
};
