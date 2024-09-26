
import { axiosInstance } from "./instance"
import { ApiRoutes } from "./constanst"
import { Ingridient } from "@prisma/client"

export const getAll = async (): Promise<Ingridient[]> => {
    return (await axiosInstance.get<Ingridient[]>(ApiRoutes.INGREDIENTS)).data
}