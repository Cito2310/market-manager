export interface IRespState {
    status: "error" | "await" | "done" | "none"
    errorMsg: string
}