import { track } from '@amplitude/analytics-browser';
import { NavigateToEventProperties, PlayEventProperties, SearchEventProperties, ShareEventProperties } from './events';

export const trackSearch = (searchEventProperties: SearchEventProperties) => {
    track('Search', searchEventProperties);
}

export const trackPlay = (playEventProperties: PlayEventProperties) => {
    track('Play', playEventProperties);
}

export const trackShare = (shareEventProperties: ShareEventProperties) => {
    track('Share', shareEventProperties);
}

export const trackShareError = (shareEventProperties: ShareEventProperties) => {
    track('ShareError', shareEventProperties);
}

export const trackNavigateTo = (navigateToEventProperties: NavigateToEventProperties) => {
    track('NavigateTo', navigateToEventProperties);
}