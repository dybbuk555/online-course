


export type Action = {
    type:string
}

export type ActionWithPayload<P> = {
    payload: P
} & Action

