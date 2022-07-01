export type App = {
    id: string,

    name: string,
    author: string,
    url: string,
    iconUrl: string,
    categoryId: string,
    description: string,

    benchmarks: {
        overall: number,
        performance: number,
        privacy: number,
        bestPractice: number
    }

    // DEPRECATED
    appStoreLink?: string,
    playStoreLink?: string
}