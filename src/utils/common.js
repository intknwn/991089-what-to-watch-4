import moment from 'moment';

export const formatRuntime = (runtime) => moment({minute: runtime}).format(`h[H] m[M]`, {trim: `all`});
