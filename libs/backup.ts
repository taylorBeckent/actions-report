import axios, {
    AxiosInstance,
    AxiosRequestConfig,
    InternalAxiosRequestConfig,
    AxiosResponse,
    AxiosError,
} from "axios";
import {useRouter} from "next/router";

interface ApiResponse<T = any> {
    code: number,
    data: T,
    message: string,
};

class Http {
    private instance: AxiosInstance;
    private token: string | null = null;

    constructor() {
        this.instance = axios.create({
            baseURL: process.env.NEXT_PUBLIC_API_URL,
            timeout: 10000,
            headers: {'Content-Type': 'application/json'}
        });

        //.初始化拦截器
        this.initInterceptors();
    }

    private initInterceptors() {
        //.请求拦截器： 携带TOKEN
        this.instance.interceptors.request.use(
            (config: InternalAxiosRequestConfig) => {
                //.从localStorage或cookies获取token
                const token = localStorage.getItem('token') || this.token;
                if (token && config.headers) {
                    config.headers.Authorization = `Bearer ${token}`;
                }
                return config;
            },
            (error: AxiosError) => {
                return Promise.reject(error);
            }
        )

        //.响应拦截器： 统一处理错误
        this.instance.interceptors.response.use(
            (response: AxiosResponse<ApiResponse>) => {
                const {code, data, message} = response.data;
                if (code !== 200) {
                    //.业务逻辑错误， 如参数错误
                    return Promise.reject(new Error(message || '请求失败'));
                }
                return data;//.直接返回核心数据
            },
            (error: AxiosError) => {
                if (error.response) {
                    const {status} = error.response;
                    switch (status) {
                        case 401:
                            //.权限错误， Token过期或失效
                            break;
                        case 403:
                            //.无权限访问
                            alert('无权限访问');
                            break;
                        case 404:
                            alert('请求地址错误');
                            break;
                        case 500:
                            alert('服务器错误');
                            break;
                        default:
                            alert('请求失败');
                            break;
                    }
                } else if (error.request) {
                    alert('网络连接失败');
                }
                return Promise.reject(error);
            }
        );
    }

    // Token 失效处理
    private handleUnauthorized() {
        localStorage.removeItem('token');
        useRouter().push('/Login');
        // window.location.href = '/Login'
    }

    //. 更新 Token (登陆后调用)
    public setToken(token: string) {
        this.token = token;
        localStorage.setItem('token', token);
    }

    // 封装方法请求
    public request<T = any>(config: AxiosRequestConfig): Promise<T> {
        return this.instance.request(config);
    }

    public get<T = any>(url: string, config?: AxiosRequestConfig): Promise<T> {
        return this.instance.get(url, config);
    }

    public post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
        console.log(url, data);
        return this.instance.post(url, data, config);
    }

    // 其他方法 (put, delete 等类似)
}

export const myAxios = new Http();
