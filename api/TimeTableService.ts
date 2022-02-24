import axios, {AxiosResponse} from "axios";

export default class TimeTableService {
    static async fetchTimeTable(date: string): Promise<AxiosResponse> {
        return axios.get(`https://api.ptpit.ru/timetable/groups/122/${date}`)
            .then((response) => {
                return response
            }).catch((error) => {
                return error.response
            })
    }
}