import { track } from '@amplitude/analytics-browser';
import { NavigateToEventProperties, PlayVozoEventProperties, SearchEventProperties, ShareEventProperties } from './events';




export const trackSearch = (searchEventProperties: SearchEventProperties) => {
    track('Search', searchEventProperties);
}

export const trackPlayVozo = (playVozoEventProperties: PlayVozoEventProperties) => {
    track('PlayVozo', playVozoEventProperties);
}

export const trackShare = (shareEventProperties: ShareEventProperties) => {
    track('Share', shareEventProperties);
}

export const trackNavigateTo = (navigateToEventProperties: NavigateToEventProperties) => {
    track('NavigateTo', navigateToEventProperties);
}