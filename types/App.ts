export type App = {
    id: string,

    name: string,
    author: string,
    url: string,
    iconUrl: string,
    categoryId: string,
    description: string,


    // DEPRECATED
    appStoreLink?: string,
    playStoreLink?: string
}