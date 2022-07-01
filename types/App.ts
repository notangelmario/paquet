export type App = {
    id: string,

    name: string,
    author: string,
    url: string,
    iconUrl: string,
    categoryId: string,
    description: string,

    benchmarks: {
        performance: number,
        
    }

    // DEPRECATED
    appStoreLink?: string,
    playStoreLink?: string
}