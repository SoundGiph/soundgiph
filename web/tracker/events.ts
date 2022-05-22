export interface SearchEventProperties {
    query: string;
    filter: string;
}

export interface PlayVozoEventProperties {
    id: string;
    title: string;
    description: string
}

export interface ShareEventProperties {
    id: string;
    title: string;
    description: string
}

export interface NavigateToEventProperties {
    page: string;
}