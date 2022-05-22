import { track } from '@amplitude/analytics-browser';
import { NavigateToEventProperties, PlayEventProperties, SearchEventProperties, ShareEventProperties } from './events';

export const trackSearch = (searchEventProperties: SearchEventProperties) => {
    track('Search', searchEventProperties);
}

export const trackPlay = (playVozoEventProperties: PlayEventProperties) => {
    track('Play', playVozoEventProperties);
}

export const trackShare = (shareEventProperties: ShareEventProperties) => {
    track('Share', shareEventProperties);
}

export const trackShareError = () => {
    track('ShareError');
}

export const trackNavigateTo = (navigateToEventProperties: NavigateToEventProperties) => {
    track('NavigateTo', navigateToEventProperties);
}