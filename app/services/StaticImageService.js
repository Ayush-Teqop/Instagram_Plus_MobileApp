import { ApiConstants } from "../constants";

import { ApiContants } from '../contants';

const getFlagIcon = (
    code = 'IN',
) => `${ApiConstants.COUNTRY_FLAG.BASE_URL}/png/${code}`;

export default { getFlagIcon };
