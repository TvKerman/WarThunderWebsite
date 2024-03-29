import axios from "axios";
import {forEach} from "react-bootstrap/ElementChildren";
import {config} from "localforage";


export default class BackService {
    static async getAll(limit = 10, page = 1) {
        const response = await axios.get('dada', {
            params: {
                _limit: limit,
                _page: page
            }
        })
        return response;
    }

    static async getCategory() {
        const response = await axios.get('http://localhost:5283/Categories/GetCategories')
        return response
    }

    static async login(login, password) {
        const article = {email:login, password:password}
        const response = await axios.post('http://localhost:5283/api/Auth/login',article)
        return response;
    }

    static async createProduct(data) {
        const article = {header: {"Authorization" : `Bearer ${data.token}`},
        description: data.description, categoryIdnb: data.category, price: data.price,
            image: data.image, nationId: data.nation, name: data.title}
        const response = await axios.post(`http://localhost:5283/api/Product/CreateProduct`, article)
        return response
    }

    static async getAccountInfo(token) {
        //const article = {header: {"Authorization" : `Bearer ${data}`}}
        axios.interceptors.request.use(
            config => {
                config.headers.Authorization = `Bearer ${token}`
                return config;
            },
            error => {
                return Promise.reject(error)
            }
        )
        console.log(token)
        const response = await axios.get(`http://localhost:5283/Account/GetAccountInfo`)
        return response
    }

    //TODO фильтры
    static async getTechnique(limit, page) {
        const response = await axios.
        get(`http://localhost:5283/api/Product/GetTechnique?Limit=${limit}&Page=${page}`)
        return response
    }

    static async getUserHistory(token){
        axios.interceptors.request.use(
            config => {
                config.headers.Authorization = `Bearer ${token}`
                return config;
            },
            error => {
                return Promise.reject(error)
            }
        )
        const response = await axios.get(`http://127.0.0.1:5283/api/History/GetUserHistory`)
        return response
    }

    static async getProductsJSON(token) {
        axios.interceptors.request.use(
            config => {
                config.headers.Authorization = `Bearer ${token}`
                return config;
            },
            error => {
                return Promise.reject(error)
            }
        )
        const response = await axios.get(`http://127.0.0.1:5283/Files/GetJSONProducts`)
        return response
    }
    static async getProductsCSV(token) {
        axios.interceptors.request.use(
            config => {
                config.headers.Authorization = `Bearer ${token}`
                return config;
            },
            error => {
                return Promise.reject(error)
            }
        )
        const response = await axios.get(`http://127.0.0.1:5283/Files/GetCSVProducts`)
        return response
    }

    static async getPremiumAccounts(limit, page) {
        const response = await axios.
        get(`http://localhost:5283/api/Product/GetPremiumAccounts?Limit=${limit}&Page=${page}`)
        return response
    }

    static async getPremiumCurrency(limit, page) {
        const response = await axios.
        get(`http://localhost:5283/api/Product/GetPremiumCurrency?Limit=${limit}&Page=${page}`)
        return response
    }

    static async register(login, username, password) {
        const article = {email:login, name:username, password:password}
        const response = await axios.post(`http://localhost:5283/api/Auth/register`,article)
        return response;
    }

    static async purchase(productId, card, token) {
        axios.interceptors.request.use(
            config => {
                config.headers.Authorization = `Bearer ${token}`
                return config;
            },
            error => {
                return Promise.reject(error)
            })
        const article = {productId:productId, cardNum:card.number,
           cardDate:card.month + '/' + card.year, cvc:card.cvc};

        console.log(article)
        console.log(token)
        const response =
            await axios.
            post(`http://127.0.0.1:5283/api/Order/Purchase?productId=${productId}
            &cardNum=${card.number}&cardDate=${card.month}%2F${card.year}&cvc=${card.cvc}`)
        return response;
    }


    static async getProduct(id) {
        const response = await  axios.get(`http://localhost:5283/api/Product/GetProduct?id=${id}`)
        return response;
    }


    static async GetTechnicByFilter(limit, page, categories, nations) {
        let stringCategories = '';
        categories.forEach((element) => {if (element.value){
            stringCategories += "&CategoriesId=" + element.id
        }})
        let stringNations = '';
         nations.forEach((element) => {if (element.value){
            stringNations += "&NationsId=" + element.id
        }})
        const response = await axios.
        get(`http://localhost:5283/api/Product/GetTechnique?Limit=${limit}&Page=${page}${stringCategories}${stringNations}`)

        return response;
    }
}