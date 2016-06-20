import * as client from './client';
import * as server from './server';

const services = typeof window !== 'undefined' ? { ...client } : { ...server };
export default { ...services };

