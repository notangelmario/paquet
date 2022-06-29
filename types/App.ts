export type App = {
    id: string,

    name: string,
    url: string,
    iconUrl: string,
    categoryId: string,
    description: string,

    // !DEPRECATED: In caz de aplicatie nativa
    appStoreLink?: string,
    playStoreLink?: string
}