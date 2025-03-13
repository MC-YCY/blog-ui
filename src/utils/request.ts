import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig
} from 'axios';
import useUserStore from '@/stores/userStore'; // 根据实际路径调整
import { toast as Toast } from "sonner";

// 定义基础响应结构（根据后端实际结构调整）
export interface BaseResponse<T = any> {
  code: number; // 后端返回的 code 字段
  data: T; // 实际数据
  message?: string; // 可选的消息字段
}

// 扩展 axios 配置类型
interface RequestConfig extends AxiosRequestConfig {
  /** 是否显示错误提示（默认 true） */
  showError?: boolean;
}

// 创建 axios 实例
const service: AxiosInstance = axios.create({
  // baseURL: import.meta.env.VITE_APP_BASE_API,
  timeout: 10000,
  headers: { 'Content-Type': 'application/json;charset=utf-8' }
});

// 请求拦截器
service.interceptors.request.use(
  (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    const { tokens } = useUserStore.getState();
    if (tokens?.accessToken) {
      config.headers.Authorization = `Bearer ${tokens.accessToken}`;
    }
    return config;
  },
  (error: any) => {
    return Promise.reject(error);
  }
);

// 响应拦截器
service.interceptors.response.use(
  <T = any>(response: AxiosResponse<BaseResponse<T>>) => {
    const res = response.data;

    // 根据后端返回的 code 判断请求是否成功
    if (res.code !== 200) { // 假设 code === 200 表示成功
      const showError = (response.config as RequestConfig).showError ?? true;
      if (showError) {
        const message = res.message || '操作失败';
        Toast("Api tip", {
          description: message,
          action: {
            label: "Undo",
            onClick: () => console.log("Undo"),
          },
        });
      }
      return Promise.reject(new Error(res.message || 'Error'));
    }

    // 返回实际数据
    return res.data as T;
  },
  (error: any) => {
    const showError = error.config?.showError ?? true;
    if (error.response) {
      switch (error.response.status) {
        case 401:
          if (showError) {
            Toast("Api tip", {
              description: error.response.data?.message || '登录已过期，请重新登录',
              action: {
                label: "Undo",
                onClick: () => {
                //
                },
              },
            });
          }
          useUserStore.getState().logout();
          break;
        case 403:
          if (showError) {
            Toast("Api tip", {
              description: error.response.data?.message || '拒绝访问',
              action: {
                label: "Undo",
                onClick: () => {
                  console.log('Undo');
                },
              },
            });
          }
          break;
        case 404:
          if (showError) {
            Toast("Api tip", {
              description: error.response.data?.message || '请求资源不存在',
              action: {
                label: "Undo",
                onClick: () => {
                  console.log('Undo');
                },
              },
            });
          }
          break;
        default:
          if (showError) {
            Toast("Api tip", {
              description: error.response.data?.message || '请求失败',
              action: {
                label: "Undo",
                onClick: () => {
                  console.log('Undo');
                },
              },
            });
          }
      }
    } else {
      if (showError) {
        Toast("Api tip", {
          description: '请求超时或服务器异常，请检查网络',
          action: {
            label: "Undo",
            onClick: () => {
              console.log('Undo');
            },
          },
        });
      }
    }

    return Promise.reject(error);
  }
);

/**
 * 通用请求方法
 * @param config 请求配置
 * @returns 响应数据
 */
export function request<T = any>(config: RequestConfig): Promise<T> {
  return service(config);
}

/**
 * GET 请求
 * @param url 请求地址
 * @param params 查询参数
 * @param config 其他配置
 * @returns 响应数据
 */
export function Get<T = any>(
  url: string,
  params?: Record<string, any>,
  config?: RequestConfig
): Promise<T> {
  return service.get(url, { params, ...config });
}

/**
 * POST 请求
 * @param url 请求地址
 * @param data 请求体数据
 * @param config 其他配置
 * @returns 响应数据
 */
export function Post<T = any>(
  url: string,
  data?: Record<string, any>,
  config?: RequestConfig
): Promise<T> {
  return service.post(url, data, config);
}

/**
 * PUT 请求
 * @param url 请求地址
 * @param data 请求体数据
 * @param config 其他配置
 * @returns 响应数据
 */
export function Put<T = any>(
  url: string,
  data?: Record<string, any>,
  config?: RequestConfig
): Promise<T> {
  return service.put(url, data, config);
}

/**
 * DELETE 请求
 * @param url 请求地址
 * @param params 查询参数
 * @param config 其他配置
 * @returns 响应数据
 */
export function Del<T = any>(
  url: string,
  params?: Record<string, any>,
  config?: RequestConfig
): Promise<T> {
  return service.delete(url, { params, ...config });
}