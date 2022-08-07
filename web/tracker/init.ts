import { init } from "@amplitude/analytics-browser";

const trackerInit = () => init(process.env.NEXT_PUBLIC_REACT_APP_AMPLITUDE_API_KEY as string);

export default trackerInit;
