import { init } from '@amplitude/analytics-browser';

// Option 1, initialize with API_KEY only


const trackerInit = () => init(process.env.NEXT_PUBLIC_REACT_APP_AMPLITUDE_API_KEY as string);

export default trackerInit;